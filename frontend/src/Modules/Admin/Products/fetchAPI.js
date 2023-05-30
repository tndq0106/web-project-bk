import axios from "axios";
import apiURL from "./config";

export const getProducts = async () => {
    try {
        let res = await axios.get(`${apiURL}/api/products/listProducts`);
        console.log(res.data); // Check the response data
        return res.data;
    } catch (error) {
        console.log("An error occurred while fetching products:", error);
        throw(error);
    }
};

export const createProductImage = async({image}) => {
    let formData = new FormData();
    formData.append("image", image);
};

export const createProduct = async({
    name,
    description,
    image,
    //category,
    stock,
    price
}) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
   // formData.append("category", category);
    formData.append("stock",stock);
    formData.append("price",price);

    try{
        let res = await axios.post(`${apiURL}/api/product/add-product`, formData);
        return res.data;
    } catch (error){
        console.log(error);
    }
}

export const editProduct = async(product) => {
    console.log(product);
    let formData = new FormData();
    formData.append("id", product.id);
    formData.append("name", product.name);
    formData.append("description", product.description);
  //  formData.append("category", product.category._id);
    formData.append("stock", product.stock);
    formData.append("price", product.price);
    formData.append("image", product.image);

    try{
        let res = await axios.post(`${apiURL}/api/product/edit-product`, formData);
        return res.data;
        } catch (error){
            console.log(error);
        }
};

export const deleteProduct = async(id) => {
    try{
        let res = await axios.post(`${apiURL}/api/product/deleteProduct`);
        return res.data;
    } catch(error){
        console.log(error);
    }
}