import * as React from "react";
import { Link } from "react-router-dom"
import { useItems } from "../features/Context/ItemContext";
import { ItemType } from "../@types/item";
import ConnectUser from "../utils/hooks/ConnectUser";
import FavoriteItem from "./FavoriteItem";
import Footer from "./Footer";
import "./favorite.css"

const Favorite = () => {
    const { token } = ConnectUser();
    const context = useItems();
    let favorite; 
    if (context) 
        favorite = context.favorite; 
    else
        favorite = undefined;
    if(!favorite)
        throw new Error("Nu s-au putut incarca datele!");
    
    if(!token.user)
        return (
        <>
            <h1 className="favorite-title">Favorite</h1>
            <div className="favorite-continer">
                <img src="./src/assets/images/favorite-img.png" alt="" />
                <h1>Adauga</h1>
                <p>Salveaza rapid articolele pentru mai tarziu</p>
                {
                    !token.user ?
                    <Link to="/account">
                        <button className="login-button">
                            Conecteaza-te
                        </button>
                    </Link>
                    : null
                }
            </div>
            <div className="space"></div>
            {
                !token.user ?
                <div className="favorite-to-home">
                    <h3>Daca nu doresti sa intrii in contul tau continua sa vizionezi produsele.</h3>
                    <p>
                    <Link to="/">
                        Continua cumparaturile!
                    </Link>
                    </p>
                </div>
                : null
            }
            <Footer />
        </>
        );

    return (
        <div>
            {
                favorite.length ?
                // schimbare aspect produse la favorite si produse in cos
                    <div className="favorite-body"> 
                        <h3>Favoritele tale</h3>
                        {
                            favorite.map( (favorit: ItemType, index: number) => {
                                return <FavoriteItem item={favorit} key={"favorite" + index} />
                            })
                        }
                    </div>
                
                :
                <h1 className="favorite-empty">Nu aveti niciun produs favorit. Intorceti-va la cuparaturi!</h1>
            }
            <Footer />
        </div>
    );

}

export default React.memo(Favorite);