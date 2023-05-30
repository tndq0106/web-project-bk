import { ADD_ITEM, DELETE_ITEM, RESET_ITEM } from "../actionTypes/actionTypes";

const initialState = {
  dataCart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const itemExist = state.dataCart?.find(
        (item) => item?._id === action.payload._id
      );
      if (itemExist && Object.keys(itemExist).length > 0) {
        const list = state.dataCart;
        const index = list.findIndex(
          (item) => item?._id === action.payload._id
        );
        list[index].quantity += 1;
        list[index].totalPrice += action.payload.price;
        return {
          dataCart: [...state.dataCart],
        };
      } else {
        return {
          dataCart: [...state.dataCart, action.payload],
        };
      }

    case DELETE_ITEM:
      const itemExistDelete = state.dataCart?.find(
        (item) => item?._id === action.payload._id
      );

      if (itemExistDelete?.quantity === 1) {
        const filterItem = state.dataCart.filter(
          (item) => item?._id !== action.payload._id
        );
        return {
          dataCart: filterItem,
        };
      } else {
        const list = state.dataCart;
        const index = list.findIndex(
          (item) => item?._id === action.payload._id
        );
        list[index].quantity -= 1;
        list[index].totalPrice -= action.payload.price;
        return {
          dataCart: [...state.dataCart],
        };
      }

    case RESET_ITEM:
      return initialState;

    default:
      return state;
  }
};
