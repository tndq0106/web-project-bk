import React, { Fragment, useContext, useEffect, useState } from 'react';
import {getProducts, deleteProduct} from "./fetchAPI";
import { useNavigate, Link } from "react-router-dom";
import { ProductContext } from "./index";
import apiURL from './config';

function AllProduct(props){
    let history = useNavigate();

    const { data, dispatch } = useContext(ProductContext);
    const {products} = data;
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        let resData = await getProducts();
        setTimeout(() => {
            if (resData && resData.Products) {
                dispatch({
                    type: "fetchProductsChangeState",
                    payload: resData.Products,
                });
            }
        }, 1000);
    };

    const deleteProductReq = async (id) => {
        var deleteFunc = await deleteProduct(id);
        if (deleteFunc.error){
            console.log(deleteFunc.error);
        }else if (deleteFunc.success) {
            console.log(deleteFunc.success);
            fetchData();
        }
    }

    const editProduct = (id, product, type) =>{
        if (type){
            dispatch({
                type: "editProductOpen",
                product: {...product, id:id},
            });
        }
    };

    return (
        <Fragment>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? (
                            products.map((item, key) => {
                                return (
                                    <ProductList product={item}
                                        editProduct={(id, product, type) =>
                                            editProduct(id, product, type)
                                        }
                                        deleteProduct={(id) => deleteProductReq(id)}
                                        key={key}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td>No product found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </Fragment>
    );
}
    const ProductList = ({product, deleteProduct, editProduct}) => {
        return (
            <Fragment>
                <tr>
                    <td>
                        {product.name.length > 15 ? product.Description.substring(1,15) + "..."
                        : product.name}
                    </td>
                    <td>
                        {product.description.slice(0,15)}...
                    </td>
                    <td> //w=h=12px
                        <img src={`${apiURL}/uploads/products/${product.pImages[0]}`}/>
                    </td> 
                    <td>{product.price}</td>
                    <td>{product.category.name}</td>
                    <td>{product.stock}</td>
                    <td>
                        <i class="fa-solid fa-pen-to-square"
                            onClick={(e) => editProduct(product.id, product, true)}></i>
                        <i class="fa-solid fa-trash"
                            onClick={(e) => deleteProduct(product.id)}></i>
                    </td>
                </tr>
            </Fragment>
        )
}
export default AllProduct;