import React from "react";
import { useDispatch } from "react-redux";
import { ItemType } from "../@types/item";
import { deleteFromFavorite } from "../redux/favoriteSlice";

const FavoriteItem: React.FC<{ item: ItemType }> = ({ item }) => {

    const dispatchFavorite = useDispatch();

    return (
        <div className="flex flex-row p-[10px] gap-[10px]">
            <img src={`${item.img[0]}`} alt="img" className="w-[100px] h-[100px] object-scale-down" />
            <div className="p-[10px]">
                <p> {item.title} </p>
                <p> {item.price} RON</p>
                <div className='flex flex-row px-[10px] gap-10' onClick={() => dispatchFavorite(deleteFromFavorite(item))}>
                    x
                </div>
            </div>
        </div>
    );

}

export default FavoriteItem;