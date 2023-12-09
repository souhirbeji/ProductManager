const mongoose = require("mongoose"); //Mongoose is a MongoDB library that will also act as a linnk (driver) between our server and Database

//Our schema "shapes" the information that is to be stored in this collection.
//In the future, this will be were our validations are written as well.
const ProductSchema = new mongoose.Schema({
    title:{
        type: String
    },

    price:{
        type: Number
    },

    description:{
        type: String
    }

    //This line adds a "createdAt" and "updatedAt" field when our document is created.
}, {timestamps: true})

//Our model acts an an interface that we can use to query our database
//It consists of 1. The collection name written capitalized and singular (shows as "products" in db) 2. The Schema
const Product = mongoose.model("Product", ProductSchema);

//We export the model in order to use it in our controller, where we will use it to get info from the DB
module.exports = Product;