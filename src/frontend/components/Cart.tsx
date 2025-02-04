import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { ItemType } from "../@types/item";
import { useItems } from "../features/Context/ItemContext";
import ConnectUser from "../utils/hooks/ConnectUser";
import CartItem from "./CartItem.tsx";
import Footer from "./Footer.tsx";
import { usePriceOrder } from "../features/Context/PriceOrderContext";
import { useItemsOrder } from "../features/Context/ItemsOrderContext.tsx";
import "./cart.css"

const Cart = () => {
    const { token } = ConnectUser();
    const { cartItems }: any = useItems();
    const { priceOrder } : any= usePriceOrder();
    const { itemsOrder } : any= useItemsOrder();
    const navigate = useNavigate();

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
   
    console.log("cart", itemsOrder)
    const handleOrder = () => { 
        navigate(`/placed-order`, { state: { orderItems: itemsOrder, priceOrder: priceOrder } });
    }

    
    console.log(1);
    return (
            <div>
                {
                    cartItems.length ?
                    <div>
                        <div className="cart-body">
                            <h3 className="cart-title">Cosul meu</h3>
                            { 
                                cartItems.map( (item: ItemType) => 
                                    React.useMemo(() => <CartItem item={item} />, [item])
                            )} 
                        <div className="total-price">
                            <p>Total: {priceOrder} RON</p>
                        </div>
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