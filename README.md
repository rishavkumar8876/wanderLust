🚀 Live Demo

Experience the live version of the application here:

👉 https://wanderlust-rifk.onrender.com/listings

Click the link to explore all listings, test features, and interact with the deployed project.

🏡 WanderLust – Full-Stack Rental Listing Web Application

WanderLust is a full-stack web application inspired by Airbnb, built using Node.js, Express, MongoDB, and EJS templating.
It allows users to create, browse, update, and manage rental property listings with full CRUD operations, secure authentication, image management, and cloud storage integration.
This project demonstrates real-world backend skills, MVC architecture, REST APIs, and clean UI rendering with dynamic server-side templates.

🚀 Features

📝 Listings Management

Create new property listings

Edit, update, and delete listings

Add descriptions, prices, location, and images

Show listing details with dynamic pages

👤 User Authentication

User signup & login using Passport.js

Encrypted passwords using bcrypt

Flash messages & session-based login system

☁️ Image Uploads

Image uploads using Multer

Cloud storage using Cloudinary

Secure URL generation for images

🌐 Dynamic UI

Fully rendered using EJS templates

Reusable components & layouts

Clean UI built with Bootstrap / custom CSS

🛠 Backend Functionality

Follows MVC architecture

RESTful routes

Middleware protection (auth guard)

Error handling + custom error pages

🗄️ Database

MongoDB Atlas cloud database

Mongoose ODM

Schema validation using JOI


📂 Folder Structure

📦 WanderLust
 ┣ 📁 controllers
 ┣ 📁 models
 ┣ 📁 routes
 ┣ 📁 views
 ┃ ┣ 📁 listings
 ┃ ┣ 📁 users
 ┣ 📁 public
 ┣ 📁 utils
 ┣ app.js
 ┣ cloudConfig.js
 ┣ schema.js
 ┣ middleware.js
 ┣ package.json
 ┗ README.md

 ⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/rishavkumar8876/wanderLust
cd wanderLust

2️⃣ Install dependencies
npm install

3️⃣ Create .env file

Add your environment variables:

MONGO_URI=your-mongodb-atlas-url
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_KEY=your-cloud-key
CLOUDINARY_SECRET=your-cloud-secret
SESSION_SECRET=your-session-secret

4️⃣ Start the server
node app.js


Server will start on:

http://localhost:3030


🧪 Available Routes
Listings
Method	Route	Description
GET	/listings	View all listings
GET	/listings/new	Create listing page
POST	/listings	Create listing
GET	/listings/:id	View listing details
PUT	/listings/:id	Update listing
DELETE	/listings/:id	Delete listing
Users
Method	Route	Description
GET	/signup	Signup page
POST	/signup	Register user
GET	/login	Login page
POST	/login	User login
GET	/logout	Logout user

🔒 Authentication Flow

Passport.js handles session-based login.

Only logged-in users can create/edit/delete listings.

Flash messages show warnings & success alerts.

☁️ Image Upload System

Multer handles image file uploads.

Cloudinary stores and serves images.

Secure CDN URLs prevent file leaks and corruption.

⭐ Future Enhancements (Optional)

Wishlist / Favorites System

Reviews & Ratings

Pagination

Search & Filter listings

Admin dashboard






























