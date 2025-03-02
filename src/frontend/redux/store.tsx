import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import favoriteSlice from './favoriteSlice'

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        favorite: favoriteSlice
    }
})
