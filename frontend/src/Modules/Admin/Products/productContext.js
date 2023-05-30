export const productState = {
    products: null,
    createProduct: false,
    editProduct: {
        modal: false,
        id: "",
        name: "",
        description: "",
        price: "",
        image: null,
        category: "",
        stock: ""
    }
};

export const productReducer = (state, action) => {
    switch (action.type) {
        case "fetchProductsAndChangeState":
            return{
                ...state,
                products: action.payload,
            };
        
        case "createProduct":
            return {
                ...state,
                createProduct: action.payload,
            };
        case "editProductOpen":
            return{
                ...state,
                editProduct: {
                    modal: true,
                    id: action.product.id,
                    name: action.product.name,
                    description: action.product.description,
                    price: action.product.price,
                    category: action.product.category,
                    stock: action.product.stock,
                    image: action.product.image
                }
            };
        case "editProductClose":
            return{
                ...state,
                modal: false,
                id: "",
                name: "",
                description: "",
                price: "",
                image: null,
                category: "",
                stock: ""
            }
        default: return state;
    }
}   