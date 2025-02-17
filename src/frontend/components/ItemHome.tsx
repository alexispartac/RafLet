import React from "react";
import { ItemType } from "../@types/item";
import ConnectUser from "../utils/hooks/ConnectUser";
import { useItems, useFavoriteDispatch } from "../features/Context/ItemContext";
import { useNavigate } from "react-router";
import "./itemhome.css"


const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const baseImage = "https://images-product-rafa.s3.amazonaws.com/";
const ItemHome: React.FC<{ item: ItemType, key: string }> = ({ item, key }) => {
    const [favoritItem, setFavoritItem] = React.useState(false);
    const { favorite } : any= useItems();
    const { token } = ConnectUser();

    const navigate = useNavigate();
    const handleItem = () => {
        // setTimeout( () => {
        // }, 100)
            navigate(`/item/${item.title + "&&" + item.id}`, { state: { item: item } });
    }

    React.useEffect(() => {
        favorite.forEach( (favoritItem: ItemType) => { 
            if(favoritItem.id === item.id)
            {
                setFavoritItem(true);
            }
        })
    }, [favorite])

    const dispatchFavorite: any = useFavoriteDispatch();
    const handleFavorite = () => {
        if(token.user) {
            if(!favoritItem)
                {
                    alert("Adaugat la favorite!");
                    setFavoritItem(true);   
                    dispatchFavorite({ type: 'add', favorit: item });
                }else{
                    alert("Sters de la favorite!");
                    setFavoritItem(false);
                    dispatchFavorite({ type: 'delete', id: item.id });
                }   
        }else{
            alert("Trebuie sa fiti autentificat pentru a adauga la favorite!");
        }
    }
    return (
        <div key={key}>
            <div className="item-home" >
                <img className="image" onClick={handleItem} src={baseImage+ item.img[0] } alt="1" />
                <button onClick={handleFavorite}>
                {
                    !favoritItem ?
                    <img src={baseFavicon + "heart-empty.png"} alt="heart" />
                    :
                    <img src={baseFavicon + "heart-full.png"} alt="heart" />
                }
                </button>
                <div className="item-home-continer">
                    <p>{item.title}</p>
                    <p className="price">{item.price},99 RON</p>
                </div>
            </div>    
        </div>
    );
}


export default ItemHome;