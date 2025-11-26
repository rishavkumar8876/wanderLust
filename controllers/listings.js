const Listing=require("../models/listing.js")
const { cloudinary} = require("../cloudConfig");
const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient=mbxGeocoding({accessToken:mapToken});

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs")
};

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author",
        },
    })
    .populate("owner");
    if(!listing)
    {
        req.flash("error","Listings you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, mapToken });

};

module.exports.createListing = async (req, res, next) => {

    let response=await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
    })
    .send();


    const result = await cloudinary.uploader.upload(req.file.path);

    
    const newListing = new Listing({
        ...req.body.listing,
        image: {
            filename: result.public_id,
            url: result.secure_url,
        }
    });

    
    newListing.owner = req.user._id;
    newListing.geometry=response.body.features[0].geometry;

    
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing)
    {
        req.flash("error","Listings you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");

    res.render("listings/edit.ejs",{listing,originalImageUrl})
};


module.exports.updateListing = async (req, res) => {

    let { id } = req.params;

   
    const listing = await Listing.findById(id);

   
    let imageData;
    if (req.file) {

        
        if (listing.image && listing.image.filename) {
            await cloudinary.uploader.destroy(listing.image.filename);
        }

        
        const result = await cloudinary.uploader.upload(req.file.path);
        imageData = {
            filename: result.public_id,
            url: result.secure_url
        };
    }

    
    const updatedData = { ...req.body.listing };

    
    if (imageData) {
        updatedData.image = imageData;
    }

    await Listing.findByIdAndUpdate(id, updatedData);

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    if (deletedListing.image && deletedListing.image.filename) {
        await cloudinary.uploader.destroy(deletedListing.image.filename);
    }
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};