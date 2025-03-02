import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { ItemTypeOrder } from "../@types/item";
import ConnectUser from "../utils/hooks/ConnectUser";
import CartItem from "./CartItem.tsx";
import Footer from "./Footer.tsx";
import { useSelector } from "react-redux";
import "./cart.css"

const Cart = () => {
    const { token } = ConnectUser();
    const cartItems = useSelector((state: any) => state.cart.cart);
    const navigate = useNavigate();
    if (!token.user)
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

    if (!cartItems)
        return (
            <Link to="/">
                <p>Cosul este gol! Continua cumparaturile!</p>
            </Link>
        );

    const handleOrder = () => {
        navigate(`/placed-order`, { state: { orderItems: cartItems } });
    }


    return (
        <div>
            {
                cartItems.length ?
                    <div>
                        <div className="cart-body">
                            <h3 className="cart-title">Cosul meu</h3>
                            {
                                cartItems.map((item: ItemTypeOrder) =>
                                    <CartItem key={item.id} item={item} />)
                            }
                        </div>
                        <button className="pay" onClick={() => handleOrder()}>
                            <h2>
                                Finalizeaza comanda
                            </h2>
                        </button>
                        <br />
                    </div>
                    : <h1 className="cart-empty">Nu aveti niciun produs in cos. Intorceti-va la cuparaturi!</h1>
            }
            <Footer />
        </div>
    );
}

export default React.memo(Cart);