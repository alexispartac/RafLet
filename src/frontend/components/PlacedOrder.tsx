import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import emailjs from '@emailjs/browser';
import { useItemsOrder } from '../features/Context/ItemsOrderContext'
import { ItemType } from '../@types/item'
import { usePriceOrder } from '../features/Context/PriceOrderContext'
import { useCartDispatch, useItems } from '../features/Context/ItemContext'
import './cart.css'

interface OrderInfo {
    name: string,
    email: string,
    judet: string,
    oras: string,
    strada: string,
    numar: string,
    bloc?: string,
    scara?: string,
    apartament?: string,
    phone: string,
    items: any,
    total: number,
}

// const URL_ORDER_INFO = "";
const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const PlacedOrder = () => {
    const [finishOrder, setFinishOrder]: any = React.useState(false);
    const { setItemsOrder }: any = useItemsOrder();
    const location = useLocation();

    const dispatchCart: any = useCartDispatch();
    const { setPriceOrder }: any = usePriceOrder();
    const { cartItems }: any = useItems();

    const itemsOrder = location.state.orderItems;
    const priceOrder = location.state.priceOrder;
    const [orderInfo, setOrderInfo]: any = React.useState<OrderInfo>({
        name: "",
        email: "",
        judet: "",
        oras: "",
        strada: "",
        numar: "",
        bloc: "",
        scara: "",
        apartament: "",
        phone: "",
        items: itemsOrder.map((item: any) => `Produs: ${item.name}, Cantitate: ${item.quantity}, Pret: ${item.price} Ron`).join('\n'),
        total: priceOrder,
    });

    useEffect(() => {
        emailjs.init({
            publicKey: 'aKQS4bLVSyXfhE0Rc',
        });
        console.log("fwfwef");
    }, []);

    const handleOrderInfo = (e: any, prop: string) => {
        setOrderInfo({
            ...orderInfo,
            [prop]: e.target.value
        })
    }

    const SendEmail = () => {
        emailjs.send('service_m7xm4on', 'template_zael9ym', orderInfo)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    const handleOrderFinish = () => {
        SendEmail();
        cartItems.forEach((item: ItemType) => {
            dispatchCart({ type: "delete", id: item.id });
        });
        setTimeout(() => {
            setPriceOrder(0);
        }, 100)
    }

    const submitOrderInfo = async (e: any) => {
        e.preventDefault();

        if (orderInfo.name && orderInfo.email && orderInfo.judet && orderInfo.oras && orderInfo.strada && orderInfo.numar && orderInfo.phone) {

            setFinishOrder(true);
            handleOrderFinish();
            setItemsOrder([]);
        }
        //cerere catre backend de a sterge din stoc
        // const response = await axios.post(URL_ORDER_INFO, 
        //     orderInfo,
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         withCredentials: true
        //     }
        // );

    }

    const navigate = useNavigate();
    const handleItemHome = () => {
        navigate("/");
    }

    return (
        <div className="order-placed">
            <button onClick={handleItemHome}>
                <img className='back-button' src={baseFavicon + "back-button.png"} alt="back-button" />
            </button>
            {!finishOrder ?
                <div className='order-info'>
                    <h2>Detalii comanda</h2>
                    <br />
                    <div className='order-info-input'>
                        <form onSubmit={submitOrderInfo}>
                            <label htmlFor="name">*Nume:</label>
                            <input type="text" placeholder='Nume' name="name" id="name" required onChange={(e) => handleOrderInfo(e, "name")} />
                            <label htmlFor="email">*Email:</label>
                            <input type="email" placeholder='example@email.com' name="email" id="email" required onChange={(e) => handleOrderInfo(e, "email")} />
                            <label htmlFor="address">*Adresa:</label>
                            <input type="text" placeholder='Judet' name="judet" id="judet" required onChange={(e) => handleOrderInfo(e, "judet")} />
                            <input type="text" placeholder='Oras' name="oras" id="oras" required onChange={(e) => handleOrderInfo(e, "oras")} />
                            <input type="text" placeholder='Strada' name="strada" id="strada" required onChange={(e) => handleOrderInfo(e, "strada")} />
                            <input type="text" placeholder='Numar' name="numar" id="numar" required onChange={(e) => handleOrderInfo(e, "numar")} />
                            <input type="text" placeholder='Bloc' name="bloc" id="bloc" onChange={(e) => handleOrderInfo(e, "bloc")} />
                            <input type="text" placeholder='Scara' name="scara" id="scara" onChange={(e) => handleOrderInfo(e, "scara")} />
                            <input type="text" placeholder='Apartament' name="apartament" id="apartament" onChange={(e) => handleOrderInfo(e, "apartament")} />
                            <label htmlFor="number" >*Numar de telefon:</label>
                            <input type="number" placeholder='07XXXXXXXX' name="number" id="number" required onChange={(e) => handleOrderInfo(e, "phone")} />
                            <input type="submit" className='submit' value="Trimite" />
                        </form>
                    </div>
                </div>
                :
                <div className="info">
                    <h2>
                        Comanda a fost plasata cu succes!
                    </h2>
                    <p>
                        Multumim pentru cumparaturile facute! Veti primi confirmarea printr-un mail.
                    </p>
                    <Link to='/'>Inapoi la magazin</Link>
                </div>
            }
        </div>
    )
}

export default PlacedOrder;