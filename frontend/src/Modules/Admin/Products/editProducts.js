import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from "./index";
import { editProduct, getProducts } from './fetchAPI';

const EditProduct = (props) => {
   const {data, dispatch} = useContext(ProductContext);
   const [formData, setFormData] = useState({
       id: "",
       name:"",
       description:"",
       price:"",
       image: null,
       category:"",
       stock: "",
       success: false,
       error: false,
   });

   useEffect(() => {
       setFormData({
           id: data.editProduct.id,
           name: data.editProduct.name,
           description: data.editProduct.name,
           image: data.editProduct.image,
           category: data.editProduct.category,
           price: data.editProduct.price,
           stock: data.editProudct.stock
       })
   }, [data.editProduct]);

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

   const handleSubmit = async (e) => {
       e.preventDefault();
       if(!formData.image){
           console.log("image not uploaded", formData);
       } else {
           console.log("uploading emage");
       }
       try {
           let resData = await editProduct(formData);
           if(resData.success){
               fetchData();
               setFormData({...formData, success: resData.success});
               setTimeout(() => {
                   return setFormData({
                       ...formData,
                       success: resData.success,
                   });
               }, 2000);
           } else if (resData.error){
               setFormData({...formData, error: resData.error});
               setTimeout(() => {
                   return setFormData({
                       ...formData,
                       error: resData.error,
                   });
               }, 2000);
           }
       } catch (error) {
           console.log(error);
       }
   }
   return (
       <Fragment>
       <div className="form-box">
           <div className='row'>
               <h3>Edit Product</h3>
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
};

export default EditProduct;