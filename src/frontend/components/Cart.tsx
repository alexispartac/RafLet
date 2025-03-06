import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { ItemTypeOrder } from "../@types/item";
import ConnectUser from "../utils/hooks/ConnectUser";
import CartItem from "./CartItem.tsx";
import Footer from "./Footer.tsx";
import { useSelector } from "react-redux";
import { Button } from "./elements/Button.tsx";

const Cart = () => {
    const { token } = ConnectUser();
    const cartItems = useSelector((state: any) => state.cart.cart);
    const navigate = useNavigate();
    if (!token.user)
        return (
            <div className="flex flex-col text-center py-[10px]">
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
                    <div className="grid pt-[1em] justify-center">
                        <div className="block px-[30px] py-[10px]">
                            <h3>Cosul meu</h3>
                            {
                                cartItems.map((item: ItemTypeOrder) =>
                                    <CartItem key={item.id} item={item} />)
                            }
                        </div>
                        <Button onClick={() => handleOrder()} color="red">
                            <h2>
                                Finalizeaza comanda
                            </h2>
                        </Button>
                        <br />
                    </div>
                    :
                    <div className="flex justify-center py-2 px-10 ">
                        <h1>Nu aveti niciun produs in cos. Intorceti-va la cuparaturi!</h1>
                    </div> 
            }
            <Footer />
        </div>
    );
}

export default React.memo(Cart);