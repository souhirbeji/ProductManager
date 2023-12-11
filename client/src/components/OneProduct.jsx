import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";

const OneProduct = (props) => {
    //Because we named the variable in our app.js path id, that is its key.
    //We gave that variable its value in Display.js when we traveled here via "Link".
    //That will allow us to destructure the value from the useParams hook using the id key.
    const { id } = useParams();
    const navigate = useNavigate();
    const [oneProduct, setOneProduct] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                console.log(res.data);
                setOneProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]); //React will give us an "unused dependency" Yellow-Label Warning if we do not include this in the dependency array
    //Functionally, this is useless, we do not need this useEffect to run based on the changing of the id while in this component because there are no changes occurring here.
    //So in this example the above or simply [] will work the same way. We can just do this to eliminate the warning.

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                //Because the delete request is on a different component, we do not need to update state here.
                    //Navigating back to our Main.js will trigger a total rerender in DisplayAll, 
                        //which will rerun our useEffect, setting state to the most up to date collection list (delete included)
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="oneProduct-component">
            <h2>{oneProduct.title}</h2>
            <p>Price: ${oneProduct.price}</p>
            <p>Description: {oneProduct.description}</p>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    );
};

export default OneProduct;
