
const express = require("express"); //express is a powerful framework for our node server.
const cors = require("cors");
const app = express(); //the express method allows us to create an express application

app.use(express.json()); //middleware that allows us to read JSON objects sent in the client's request
app.use(express.urlencoded({ extended: true })); //middleware that allows us to read JSON objects with strings and arrays in the client's request

app.use(cors({ //cors is going to allow different ports to send requests to our API
    origin:"http://localhost:3000" 
}));

//To allow requests from any client origin/port, app.use(cors()) is available but this can present security concerns.

//we require our mongoose config file so that it is available to our express method
require("./config/mongoose.config"); 

//we require our routes folder which had a function (with an app parameter) exported in this short-hand syntax. The express method must be added as an argument. 
//See the routes file to better understand how these work together.
require("./routes/product.routes")(app);
//here is the long-hand syntax to get a better idea of what's happening here.
    //const productRoutes = require("./routes/product.routes")
    //productRoutes(app)

//We set our node server to listen on port 8000
app.listen(8000, () => console.log("Listening on Port 8000"))