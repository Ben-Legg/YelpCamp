// self contained file used to seed db with campground locations


const mongoose = require("mongoose");
const cities = require("./cities"); // import cities array
const {places, descriptors} = require("./seed-helpers"); // import model
const Campground = require("../models/campground"); // import model

// connect to db
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

// logic to check for errors
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const randomCampName = array => array[Math.floor(Math.random() * array.length)]; // pick a random value from array to create unique camp descriptions

// function to seed db with random campground data 
async function seedDB() {
    await Campground.deleteMany({}); // delete existing documents in database collection
    for (let i = 0; i < 50; i++){ // create 50 random instances of Campground model
        const randomCityIndex = Math.floor(Math.random() * 1000); // Pick ramdom location using data from cities array
        const randomPrice = Math.floor(Math.random() * 20) + 10; // Make a random price
        const camp = new Campground({
            location: `${cities[randomCityIndex].city}, ${cities[randomCityIndex].state}`,
            title: `${randomCampName(descriptors)} ${randomCampName(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            price: randomPrice
        });
        await camp.save();
    }
    console.log("Finished Seeding")
}

// close db connection
seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database closed");
});