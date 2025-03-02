import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../@types/item";

const initialState: { favorite: ItemType[] } = {
    favorite: []
};
const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<ItemType>) => {
            state.favorite.push(action.payload);
        },
        deleteFromFavorite: (state, action: PayloadAction<ItemType>) => {
            state.favorite = state.favorite.filter((item: ItemType) => item.id !== action.payload.id);
        },
    }
})


export const { addToFavorite, deleteFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;