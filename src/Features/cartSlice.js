import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { items } from "../data/item";
const url = "https://course-api.com/react-useReducer-cart-project";
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("SOMETHING WENT WRONG");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: items,
    total: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      state.items.push(newItem);
      state.total += newItem.price * newItem.quantity;
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);
      if (itemToRemove) {
        state.items = state.items.filter((item) => item.id !== itemId);
        state.total -= itemToRemove.price * itemToRemove.quantity;
      }
    },
    increaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
        state.total += item.price;
      }
    },
    decreaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== itemId);
          state.total -= item.price;
        } else {
          item.quantity--;
          state.total -= item.price;
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: {
    //pending,fulfilled,rejected all the basic fxn
    [getCartItems.pending]: (state) => {
      state.status = "loading";
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
      console.log(action);

      state.total = action.payload.total;
    },
    [getCartItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
