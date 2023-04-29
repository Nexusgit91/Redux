import { configureStore } from "@reduxjs/toolkit";
//cart reducer
import cartReducer from "./Features/cartSlice";
import modalReducer from "./Features/modalSlice";
//store all the reducers from where we can access to the whole app
const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;
