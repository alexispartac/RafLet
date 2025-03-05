import React from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser';
import { deleteCart } from '../redux/cartSlice';
import { ItemTypeOrder } from '../@types/item';
import { Button } from './elements/Button';
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
    const cartItems = useSelector((state: any) => state.cart.cart);
    const [finishOrder, setFinishOrder]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);
    let totalPrice = 0;
    cartItems.forEach((cartItem: ItemTypeOrder) => totalPrice = totalPrice + (cartItem.price * cartItem.quantity))
    const orderItems = cartItems.map((item: ItemTypeOrder) => `Produs: ${item.name}, Pret: ${item.price} Ron, Cantitatea: ${item.quantity}`).join('\n')

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
        items: orderItems,
        total: totalPrice,
    });

    React.useEffect(() => {
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

    const dispatchCart = useDispatch();

    const handleOrderFinish = () => {
        SendEmail();
        dispatchCart(deleteCart());
    }

    const submitOrderInfo = async (e: any) => {
        e.preventDefault();

        if (orderInfo.name && orderInfo.email && orderInfo.judet && orderInfo.oras && orderInfo.strada && orderInfo.numar && orderInfo.phone) {
            setFinishOrder(true);
            handleOrderFinish();
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
        navigate("/cart");
    }

    return (
        <div className="relative flex w-full justify-center py-5">
            <button className='flex absolute w-[30px] top-[45px] left-[10px]' onClick={handleItemHome}>
                <img src={baseFavicon + "back-button.png"} alt="back-button" />
            </button>
            {!finishOrder ?
                <div className='flex items-center flex-col '>
                    <h2>Detalii comanda</h2>
                    <br />
                    <div>
                        {
                            cartItems.map((cartItem: ItemTypeOrder) =>
                                <p>{cartItem.name}: {cartItem.quantity} - {cartItem.price * cartItem.quantity} RON</p>
                            )
                        }
                    </div>
                    <h4 className='p-3'>
                        Total: {totalPrice} RON
                    </h4>
                    <div className="flex bg-gray-100 w-[300px] shadow-md p-5 m-5 rounded">
                        <form className='flex flex-col w-full items-center' onSubmit={submitOrderInfo}>
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
                            <input type='phone' placeholder='07XXXXXXXX' name="number" id="number" required onChange={(e) => handleOrderInfo(e, "phone")} />
                            <Button onClick={() => {}} color='red'>
                                <input  type="submit" className='submit' value="Trimite" />
                            </Button>
                        </form>
                    </div>
                </div>
                :
                <div className="flex flex-col items-center text-center m-auto">
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