const Product = require("../models/product.model.js"); //Import the model from the model file

//With this syntax, we are exporting an object that consists of key:value pairs
    //the values consist of the logic used to query the DB
module.exports = {
    createProduct: (req, res) => { //We name the key and the value is going to be the function that queries DB
        Product.create(req.body) //We use the Product model to create a new product document. We take in the body of the request from the client.
            .then((newProduct) => res.json(newProduct)) //That returns a promise whose resolution we handle with then, and run .json on our response so that we can easily read the JSON object.
            .catch((err) => console.log(err));
    }
};