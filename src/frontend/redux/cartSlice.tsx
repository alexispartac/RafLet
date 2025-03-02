import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemTypeOrder } from "../@types/item";

const initialState: { cart: ItemTypeOrder[] } = {
    cart: []
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ItemTypeOrder>) => {
            const existingItem = state.cart.find(itemCart => itemCart.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        deleteFromCart: (state, action: PayloadAction<ItemTypeOrder>) => {
            const existingItem = state.cart.find(itemCart => itemCart.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                } else {
                    state.cart = state.cart.filter(itemCart => itemCart.id !== action.payload.id);
                }
            }
        },
        
        deleteCart: (state) => {
            state.cart = [];
        },
    }
})


export const { addToCart, deleteFromCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;