const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Campground = require("./models/campground"); // import model

// connect to db
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

// logic to check for errors
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const app = express();

// set view engine and define relative path to views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true})); // parse incoming incoming request payloads for accessing submitted form body
app.use(methodOverride("_method")); // enable support for HTTP PUT and DELETE

app.get("/", (req, res) => {
    res.render("home");
})

// route for campgrounds index
app.get("/campgrounds", async (req, res) => {
   const campgrounds = await Campground.find({});
   res.render("campgrounds/index", { campgrounds });
})

// route for making new campground
app.get("/campgrounds/new", async (req, res) => {
    res.render("campgrounds/new");
 });
 
// route for submitting new campground
app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

// route for campgrounds detail page
app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
 });

// route for editing campgrounds
 app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
 });

 // route for submitting updated campground details
 app.put("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }); // spread posted object into new object to update db
    res.redirect(`/campgrounds/${campground._id}`);
 });

 // route to delete campground
app.delete("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
 });

app.listen(3000, () => {
    console.log("Serving on port 3000");
});