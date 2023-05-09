import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface StoreState {
  categoryValue: string;
  cart: Product[];
}
const initialState: StoreState = {
  categoryValue: "2313c5df-f978-4560-a761-931cf81ba6a1",

  cart: [],
};
export const storeSlice = createSlice({
  name: "store-slice",
  initialState,
  reducers: {
    updateCategory(
      state: StoreState,
      action: PayloadAction<{ value: string }>
    ) {
      state.categoryValue = action.payload.value;
    },
    addToCart(state: StoreState, action: PayloadAction<Product>) {
      const checkProductInCart = state.cart.find(
        (item) => item._id === action.payload._id
      );
      const productIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (checkProductInCart) {
        state.cart[productIndex] = {
          ...checkProductInCart,
          quantity: checkProductInCart.quantity + 1,
        };
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
    },
    decreaseElement(state: StoreState, action: PayloadAction<Product>) {
      const index = state.cart.findIndex((el) => el._id === action.payload._id);
      if (action.payload.quantity - 1 < 1) {
        state.cart = state.cart.filter((el) => el._id !== action.payload._id);
      } else {
        state.cart[index] = {
          ...action.payload,
          quantity: action.payload.quantity - 1,
        };
      }
    },
    removeFromCart(state: StoreState, action: PayloadAction<{ id: string }>) {
      const item = state.cart.find((el) => el._id === action.payload.id);

      state.cart = state.cart.filter((item) => item._id !== action.payload.id);
    },
  },
});

//store actions
export const { addToCart, removeFromCart, decreaseElement } =
  storeSlice.actions;
//selectors
export const categoryVal = (state: RootState) => state.store.categoryValue;

export const cart = (state: RootState) => state.store.cart;

export const cartItemWithId = (state: RootState, id: string) =>
  state.store.cart.filter((item) => item._id === id);

export const cartTotal = (state: RootState) =>
  state.store.cart.reduce(
    (total: number, item: Product) => (total += item.price * item.quantity),
    0
  );

export const cartLength = (state: RootState) =>
  state.store.cart.reduce(
    (total: number, item: Product) => (total += +item.quantity),
    0
  );

export default storeSlice.reducer;
