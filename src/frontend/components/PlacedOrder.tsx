import React from 'react'
import { Link,  useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useItemsOrder } from '../features/Context/ItemsOrderContext'
import { ItemType } from '../@types/item'
import { usePriceOrder } from '../features/Context/PriceOrderContext'
import { useCartDispatch, useItems } from '../features/Context/ItemContext'
import './cart.css'

interface OrderInfo {
    name: string,
    email: string,
    address: string,
    phone: string,
    items: ItemType[],
    total: number
}

// const URL_ORDER_INFO = "";

const PlacedOrder = () => {
    const [finishOrder, setFinishOrder]: any = React.useState(false);
    const { setItemsOrder }: any = useItemsOrder();
    const location = useLocation();
    
    const dispatchCart: any = useCartDispatch();
    const { setPriceOrder } : any= usePriceOrder();
    const { cartItems }: any = useItems();

    const itemsOrder = location.state.orderItems;
    const priceOrder = location.state.priceOrder;
    const [orderInfo, setOrderInfo]: any = React.useState<OrderInfo>({
        name: "",
        email: "",
        address: "",
        phone: "",
        items: [...itemsOrder],
        total: priceOrder, 
    });

    const handleOrderInfo = (e: any, prop: string) => {
        setOrderInfo({
            ...orderInfo,
            [prop]: e.target.value
        })
    }

    const handleOrderFinish = () => {
        cartItems.forEach( (item: ItemType) => {
            dispatchCart({ type: "delete", id: item.id });
        });
        setTimeout( () => {
            setPriceOrder(0);
        }, 100)
    }

    const submitOrderInfo = async(e: any) => {
        e.preventDefault();
        setFinishOrder(true);
        handleOrderFinish();
        setItemsOrder([]);
        //cerere catre backend
        // const response = await axios.post(URL_ORDER_INFO, 
        //     orderInfo,
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         withCredentials: true
        //     }
        // );

        console.log(orderInfo);
    }

    const navigate = useNavigate();
    const handleItemHome = () => {
        navigate("/");
    }

    return (
            <div className="order-placed">
                <button onClick={handleItemHome}>
                  <img src="../../assets/favicons/back-button.png" alt="back-button" />  
                </button>
                { !finishOrder ?
                <div className='order-info'>
                    <h2>Detalii comanda</h2>
                    <br />
                    <label htmlFor="name">Nume:</label>
                    <input type="text" placeholder='Nume Prenume' name="name" id="name" onChange={(e) => handleOrderInfo(e, "name")}/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder='example@email.com' name="email" id="email" onChange={(e) => handleOrderInfo(e, "email")}/>
                    <label htmlFor="address">Adresa:</label>
                    <input type="text" placeholder='Judet-Oras-Strada-Numar' name="address" id="address" onChange={(e) => handleOrderInfo(e, "address")}/>
                    <label htmlFor="number">Numar de telefon:</label>
                    <input type="number" placeholder='07XXXXXXXX' name="number" id="number" onChange={(e) => handleOrderInfo(e, "phone")}/>
                    <button type="submit" onClick={(e) => submitOrderInfo(e)}>TRIMITE SI FINALIIZEAZA COMANDA</button>
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