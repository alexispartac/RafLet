import React from "react";
import { Link } from "react-router-dom"
import { ItemType } from "../@types/item";
import { useItems } from "../features/Context/ItemContext";
import ConnectUser from "../utils/hooks/ConnectUser";
import CartItem from "./CartItem.tsx";
import "./cart.css"
import Footer from "./Footer.tsx";

const Cart = () => {
    const { token } = ConnectUser();
    const { cartItems }: any= useItems();

    if(!token.user)
        return (
            <div className="cart-continer">
                <p>Daca ai adugat produse in cos la vizita <br /> trecuta pe site, te rugam sa te loghezi.</p>
                <br />
                <Link to="/account">
                    <button>
                        Conecteaza-te
                    </button>
                </Link>
                <br />
                <Link to="/">
                    <p>Sau continua cumparaturile!</p>
                </Link>
            </div>
        );

    if(!cartItems)
        return (
            <Link to="/">
                <p>Cosul este gol! Continua cumparaturile!</p>
            </Link>
        );
        
    return (
        <div>
            {
                cartItems.length ?
                    <div className="cart-body">
                        <h3 className="cart-title">Cart</h3>
                        { cartItems.map( (item: ItemType) => 
                            <CartItem item={item} />
                        )}  
                    </div>
                : <h1 className="cart-empty">Nu aveti niciun produs in cos. Intorceti-va la cuparaturi!</h1>
            }
            <Footer />
        </div>
    );
}

export default Cart;