import { ADD_ITEM, DELETE_ITEM, RESET_ITEM, CLEAR_ITEM } from "../actionTypes/actionTypes";

const addItem = (payload) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};

const deleteItem = (payload) => {
  return {
    type: DELETE_ITEM,
    payload,
  };
};

const clearItem = (payload) => {
  return{
    type: CLEAR_ITEM,
    payload,
  }
}

const resetItem = (payload) => {
  return {
    type: RESET_ITEM,
    payload,
  };
};

export { addItem, deleteItem, resetItem, clearItem };
