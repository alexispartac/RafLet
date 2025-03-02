import React from "react";
import { useDispatch } from "react-redux";
import { ItemType } from "../@types/item";
import { deleteFromFavorite } from "../redux/favoriteSlice";
import "./favorite-and-cart.css"

const FavoriteItem: React.FC<{ item: ItemType }> = ({ item }) => {

    const dispatchFavorite = useDispatch();

    return (
        <div className="body">
            <img src={`${item.img[0]}`} alt="img" className="image-fav" />
            <div className="body-det">
                <p> {item.title} </p>
                <p> {item.price} RON</p>
                <div onClick={() => dispatchFavorite(deleteFromFavorite(item))}>
                    x
                </div>
            </div>
        </div>
    );

}

export default FavoriteItem;