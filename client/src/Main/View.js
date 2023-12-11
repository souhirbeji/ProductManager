import React, { useState } from "react";
import CreateProduct from "../components/CreateProduct";
import DisplayAll from "../components/DisplayAll";

const Main = (props) => {
    //We make sure our state is lifted so that both children components can have access to our getter and setter
    //That way an update that happens in CreateProduct can be reflected in DisplayAll
    const [productList, setProductList] = useState([]);

    return (
        <div>
            {/* We pass down the getter/setter via props obj, with a key of productList and a value of (the getter itself) productList. 
                You can name the key whatever you want, but this naming convention allows for less confusion and easy usage
                (see deconstructuring/usage in Child components)*/}
            <CreateProduct
                productList={productList}
                setProductList={setProductList}
            />

            <DisplayAll
                productList={productList}
                setProductList={setProductList}
            />
        </div>
    );
};
// props pass down smth as an argument to a child component 
export default Main;