import React from "react";
import { ItemType } from "../@types/item";
import ConnectUser from "../utils/hooks/ConnectUser";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, deleteFromFavorite } from "../redux/favoriteSlice";


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
            <div className="block relative px-[0.5rem]"  >
                <img className="w-full max-h-[270px] object-fill" onClick={handleItem} src={baseImage + item.img[1]} alt="1" />
                <button className="absolute top-2 right-3 bg-transparent border-none" onClick={handleFavorite}>
                    {
                        !isFavorit ?
                            <img className="relative w-[28px] h-[30px] z-0 top-[1px]" src={baseFavicon + "heart-empty.png"} alt="heart" />
                            :
                            <img className="relative w-[28px] h-[30px] z-0 top-[1px]" src={baseFavicon + "heart-full.png"} alt="heart" />
                    }
                </button>
                <div className="flex flex-col gap-2.5 p-[0.3rem] text-[1em] font-sans ">
                    <p>{item.title}</p>
                    <p className="text-red-500">{item.price} RON</p>
                </div>
            </div>
        </div>
    );
}


export default ItemContiner;