import React, {Fragment, useContext, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { ProductContext } from "./index";
import { createProduct, getProducts} from "./fetchAPI";

function CreateProduct(){
    const {data, dispatch } = useContext(ProductContext);

    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        name:"",
        description:"",
        price:"",
        image: null,
       // category:"",
        stock: "",
        success: false,
        error: false,
    });

    const fetchData = async () => {
        let resData = await getProducts();
        setTimeout(() => {
            if (resData & resData.Products) {
                dispatch({
                    type: "fetchProductsChangeState",
                    payload: resData.Products,
                });
            }
        }, 1000);
    };

    //const categories = ['milk','latte','soda','tea','other'];

    // const categoryOptions = categories.map((option) => ({
    //     value: option,
    //     label: option.charAt(0).toUpperCase() + option.slice(1)
    // }));
    // const handleCategorySelect = (newValue) => {
    //     setCategory(newValue);
    //     categories.push(newValue);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        
        try {
            let resData = await createProduct(formData);
            if (responseData.success){
                fetchData();
                setFormData({
                    ...formData,
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                   // category: "",
                    image: "",
                    success: resData.success,
                    error: false,
                });
                setTimeout(() => {
                    setFormData({
                        ...formData,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                      //  category: "",
                        image: "",
                        success: false,
                        error: false,
                    })
                }, 2000);
            } else if (resData.error){
                setFormData({...formData, error: resData.error, success: false});
                setTimeout(() => {
                return setFormData({...formData, error: false, success: false});
            }, 2000);
            }   
        } catch (error){
            console.log(error);
        }
       // history('/admin');
    }


    let history = useNavigate();
    return(
        <Fragment>
        <div className="form-box">
            <div className='row'>
                <h3>Add Product</h3>
                <i class="fa-solid fa-xmark" onClick={(e) =>
                    dispatch({type: "addProduct", payload: false})}></i>
            </div>
            {formData.error ? alert(formData.error, "red") : ""}
            {formData.success ? alert(formData.success, "blue") : ""}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='form-group'>
                    <div className="field">
                        <label htmlFor='name'>Product name</label>
                        <input type="text" id="name" value={formData.name}
                        onChange={(e) => 
                            setFormData({
                                ...formData,
                                error: false,
                                success: false,
                                name: e.target.value
                            })
                        }
                    />
                    </div>
                    <div className="field">
                        <label htmlFor='price'>Price</label>
                        <input type="number" id="price" placeholder='0.00'
                            value={formData.price}
                            onChange={(e) => setFormData({
                                ...formData,
                                error: false,
                                success: false,
                                price: e.target.value
                            })}/>
                    </div>
                </div>
                <div className='form-group'>
                    <div className="field">
                        <label htmlFor='description'>Description</label>
                        <input type="text" id="description" value={formData.description}
                            onChange={(e) => setForm({
                                ...formData,
                                error: false,
                                success: false,
                                description: e.target.value
                            })} 
                        />
                    </div>
                </div>
                <div className='form-group'>
                    
                    {/* <div className='field'>
                        <label htmlFor='category'>Category</label>
                        <select name="category" id="category" value={formData.category}
                            onChange={(e) => setFormData({
                                ...formData,
                                error: false,
                                success: false,
                                category: e.target.value
                            })}
                        >
                            <option value="" disabled selected>Select category</option>
                            {categories.length > 0 ? categories.map(function (elem){
                                return (
                                    <option name="category" value={elem._id} key={elem._id}>
                                        {elem.categoryName}
                                    </option>
                                );
                            }) : ""}
                        </select>
                    </div> */}

                    <div className="field">
                        <label htmlFor='Stock'>Stock</label>
                        <input type="number" id="stock" value={formData.stock}
                            onChange={(e) => setFormData({
                                ...formData,
                                error: false,
                                success: false,
                                stock: e.target.value
                            })}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <div className="field">
                        <label htmlFor='image'>Image</label>
                        <input type="file" accpet=".jpg, .jpeg, .png"
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    error: false,
                                    success: false,
                                    image: e.target.files[0]
                                })}
                        />
                    </div>        
                </div>
                <button class="button" type="submit">Create proudct</button>
            </form>
        </div>
        </Fragment>
    );
}

export default CreateProduct;