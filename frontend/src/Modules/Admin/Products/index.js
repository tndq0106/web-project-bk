import React, { Fragment, createContext, useReducer } from "react";
import ProductList from "./productList";
import { productState, productReducer } from "./productContext";


export const ProductContext = createContext();

const ProductComponent = () => {
    return (
        <div>
            <ProductList />
        </div>
    )
}

const Products = (props) => {
    const [data, dispatch] = useReducer(productReducer, productState);

    return (
        <Fragment>
            <ProductContext.Provider value={{ data, dispatch }}>
                <ProductComponent />
            </ProductContext.Provider>
        </Fragment>
    );
};

export default Products;