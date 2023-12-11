const ProductController = require("../controllers/product.controller"); //We import the object exported from the controller

module.exports = (app) => {
    app.get("/api/products", ProductController.getAllProducts);
    //We use the express method to make a post request to "/api/products" route, which will run the function found at ProductController.createProduct
    app.post("/api/products", ProductController.createProduct);
    //This paramater (params) from the request will be written in from the route
    //NOTE: this param written here must match EXACTLY with what you named it in your controller (here, we used id).
    //This value will be passed in from the client.
    app.get("/api/products/:id", ProductController.getOneProduct);
    //We can use the same param name for each route. It's a different route due to differing HTTP verbs.
    app.put("/api/products/:id", ProductController.updateProduct);
    app.delete("/api/products/:id", ProductController.deleteProduct);
};