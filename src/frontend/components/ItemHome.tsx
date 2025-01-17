import React from "react";
import { ItemType } from "../@types/item";
import Item from "./Item";
import ConnectUser from "../utils/hooks/ConnectUser";
import { useItems, useFavoriteDispatch } from "../features/Context/ItemContext";
import "./itemhome.css"

const ItemHome: React.FC<{ item: ItemType, key: string }> = ({ item, key }) => {
    const { favorite, oneItem, handleSetOneItem } : any= useItems();
    const [favoritItem, setFavoritItem] = React.useState(false);
    const {token} = ConnectUser();

    console.log(favorite);
    React.useEffect(() => {
        favorite.forEach( (favoritItem: ItemType) => { 
            if(favoritItem.id === item.id)
            {
                setFavoritItem(true);
            }
        })
    }, [])



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
                    <img className="image" onClick={handleSetOneItem} src={item.img[0]} alt="1" />
                    <button onClick={handleFavorite}>
                    {
                        !favoritItem ?
                        <img src="./src/assets/favicons/heart-empty.png" alt="heart" />
                        :
                        <img src="./src/assets/favicons/heart-full.png" alt="heart" />
                    }
                    </button>
                    <div className="item-home-continer">
                        <p>{item.title}</p>
                        <p className="price">{item.price},99 RON</p>
                    </div>
                </div>    
                {
                    !oneItem    
                    ?
                    null
                    :
                    // imi intra pe ultimul de fiecrare data doarece acesta este ultimil element din map
                    <Item item={{...item}} />
                }
            </div>
    );
}


export default React.memo(ItemHome);