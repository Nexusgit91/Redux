import { createSlice } from "@reduxjs/toolkit";
import { items } from "../data/item";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: items,
    total: 0,
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
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
