const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
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

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/makecampground", async (req, res) => {
    const camp = new Campground({ title: "My Backyard", description: "Cheap Camping !" })
    await camp.save();
    res.send(camp);
})


app.listen(3000, () => {
    console.log("Serving on port 3000");
});