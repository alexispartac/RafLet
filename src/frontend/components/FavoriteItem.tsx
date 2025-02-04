import React from "react";
import { ItemType } from "../@types/item";
import { useFavoriteDispatch } from "../features/Context/ItemContext";
import "./favorite-and-cart.css"

const FavoriteItem: React.FC<{item: ItemType}> = ({ item }) => {
    const dispatchFavorite: any = useFavoriteDispatch();

    return (
        <div className="body">
            <img src={`${item.img[0]}`} alt="img" className="image-fav"/>
            <div className="body-det">
                <p> {item.title} </p>
                <p> {item.price} RON</p>
                <div onClick={() => {dispatchFavorite({id: item.id, type: 'delete'})}} >
                        x
                </div>
            </div>
        </div>
    );

}

export default FavoriteItem;