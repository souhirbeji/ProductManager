import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = (props) => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    //we don't want the header changing every time we type, so let's have a piece of state to
    //capture and display document's title as it is when this component renders and we make our
    //getOne request in our useEffect

    const [headerTitle, setHeaderTitle] = useState("");

    //We run our findOne request so that we can populate our inputs
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
                //this is meant to be unchanging while we're on this component,
                //so we use another useState hook to capture and display it
                setHeaderTitle(res.data.title);
            })
            .catch((err) => console.log(err));
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/products/${id}`, { //id is the req.params and the following object is the req.body
                title, //shorthand for title:title
                price,
                description,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/"); //No need to worry about state here. Navigate will trigger a total rerender of Main/DisplayAll which will update our list via useEffect in Display
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <header>Edit {headerTitle}</header>

            <form onSubmit={submitHandler}>
                <div className="form-fields">
                    <label>Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        name="title"
                        type="text"
                    />
                </div>

                <br />

                <div className="form-fields">
                    <label>Price</label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        name="price"
                        type="number"
                    />
                </div>

                <br />

                <div className="form-fields">
                    <label>Description</label>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="description"
                        type="text"
                    />
                </div>

                <br />
                {/* Could also be a button element. Try it! */}
                <input class="submit-input" type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateProduct;