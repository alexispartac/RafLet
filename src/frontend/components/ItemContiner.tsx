import React from "react";
import { ItemType } from "../@types/item";
import ConnectUser from "../utils/hooks/ConnectUser";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, deleteFromFavorite } from "../redux/favoriteSlice";
import "./ItemContiner.css"

const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const baseImage = "https://images-product-rafa.s3.amazonaws.com/";



const ItemContiner: React.FC<{ item: ItemType }> = ({ item }) => {
    const favorite = useSelector((state: any) => state.favorite.favorite);
    const [isFavorit, setIsFavorit] = React.useState(
        favorite.find((favorit: ItemType) => favorit.id === item.id));
    const { token } = ConnectUser();

    const navigate = useNavigate();
    const handleItem = () => {
        navigate(`/item/${item.title + "&&" + item.id}`, { state: { item: item } });
    }

    const dispatchFavorite = useDispatch();

    const handleFavorite = () => {
        if (token.user) {
            if (!isFavorit) {
                alert("Adaugat la favorite!");
                dispatchFavorite(addToFavorite(item));
                setIsFavorit(true);
            } else {
                alert("Sters de la favorite!");
                dispatchFavorite(deleteFromFavorite(item));
                setIsFavorit(false);
            }
        } else {
            alert("Trebuie sa fiti autentificat pentru a adauga la favorite!");
        }
    }
    return (
        <div>
            <div className="item-home" >
                <img className="image" onClick={handleItem} src={baseImage + item.img[1]} alt="1" />
                <button onClick={handleFavorite}>
                    {
                        !isFavorit ?
                            <img src={baseFavicon + "heart-empty.png"} alt="heart" />
                            :
                            <img src={baseFavicon + "heart-full.png"} alt="heart" />
                    }
                </button>
                <div className="item-home-continer">
                    <p>{item.title}</p>
                    <p className="price">{item.price} RON</p>
                </div>
            </div>
        </div>
    );
}


export default ItemContiner;