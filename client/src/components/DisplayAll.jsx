import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DisplayAll = (props) => {
    
    const { productList, setProductList} = props;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then((res) => {
                console.log(res.data);
                setProductList(res.data); 
                
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteFilter = (idFromBelow) => {
        //please take note of the different approach here in getting the id value for our route.
            //Unlike in other component's like DisplayOne, we are not passing this value in from another component,
                //In other words, there is no id to deconstuct from props! We get the value from below.
        axios.delete(`http://localhost:8000/api/products/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                //filter returns a NEW array of every that meets the return's criteria
                //Here, we want an array of every product whose _id does not match the product's _id that was clicked below.
                //This will allow us to instantly "react" to our change of state, and show the deletion in the browser.
                const newList = productList.filter((product, index) => product._id !== idFromBelow)
                setProductList(newList);
                //could also write like this:
                //setProductList(productList.filter((product, index) => product._id !== idFromBelow))
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <header>All Products:</header>

            {
            
                productList.map((product, index) => (
                    <div key={index}>
                        {/* This is where :id in our app.js path gets its value... We can access this info via props */}
                        {/* Note: when styling, the DOM read "Link" as an a tag */}
                        <Link to={`/product/${product._id}`}>{product.title}</Link>
                        <br />

                        {/* Similar concept to what we did above with the Link element. Instead, here we use the navigate method
                            to move to the UpdateProduct component */}
                        <button onClick={() => navigate(`/product/edit/${product._id}`)}>
                            Edit
                        </button>

                            {/* Here, we pass in this individual product's _id as an argument. This is how the idFromBelow parameter gets its value. */}
                        <button onClick={() => deleteFilter(product._id)}>
                            Delete
                        </button>
                    </div>
                ))
            
            }
        </div>
    );
};

export default DisplayAll;