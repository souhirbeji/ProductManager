const Product = require("../models/product.model.js"); //Import the model from the model file

//With this syntax, we are exporting an object that consists of key:value pairs
    //the values consist of the logic used to query the DB
module.exports = {
    getAllProducts: (req, res) => {
        Product.find({}) //remember, these methods (find, findOne, create, etc) are all specific mongoose methods you can see a complete list in their docs
            .then((allProducts) => res.json(allProducts))
            .catch((err) => console.log(err));
    },
//{} al the products
    getOneProduct: (req, res) => {
        Product.findOne({ _id: req.params.id }) //We have to specify which field we want to search for our individual product (called a document in mongodb) by
            // _id is a field that is automatically added when we create a new document
            // We then say that the value will come from the request's parameters (params) and we name this parameter "id"
            // NOTE: We can call the parameter (id) whatever we want. However, it MUST match how we refer to it in our route.
            //Do not confuse the DB field of "_id" with the popular naming convention of "id"
            .then((oneProduct) => res.json(oneProduct))
            .catch((err) => console.log(err));
    },

    createProduct: (req, res) => {
        //We name the key and the value is going to be the function that queries DB.
        Product.create(req.body) //We use the Product model to create a new product document. We take in the body of the request sent from the client.
            .then((newProduct) => res.json(newProduct)) //That returns a promise whose resolution we handle with then,
            //and run .json() on our response so that we can read the JSON object returned from our promise.
            .catch((err) => console.log(err));
    },

    //The logic for updating requires both a parameter (params) and body from the request
        // We must first find the document before we can add in the new info.
    updateProduct: (req, res) => {
        Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true, //By default, update fill not return a new document. This is necessary to ensure we respond with the newly updated document.
            runValidators: true, //This ensures validators work on a PUT request.
        })
            .then((updatedProduct) => res.json(updatedProduct))
            .catch((err) => console.log(err));
    },

    deleteProduct: (req, res) => {
        Product.deleteOne({ _id: req.params.id })
            .then((deletedId) => res.json(deletedId))
            .catch((err) => console.log(err));
    },
};