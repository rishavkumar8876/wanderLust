const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const { cloudinary, upload } = require("../cloudConfig");

router
.route("/")
.get(wrapAsync(listingController.index))
.post( 
    isLoggedIn, 
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
);

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.get("/search", async (req, res) => {
    let { location } = req.query;

    let allListings;

    if (!location || location.trim() === "") {
        allListings = await Listing.find({});
    } else {
        allListings = await Listing.find({
            location: { $regex: location, $options: "i" }
        });
    }

    res.render("listings/index.ejs", { allListings });
});


router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
