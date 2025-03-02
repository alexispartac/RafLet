import React, { useState } from 'react'
import { ItemTypeOrder } from '../@types/item';
import "./cart-item.css"
import { useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/cartSlice';

const baseImage = "https://images-product-rafa.s3.amazonaws.com/";
const CartItem: React.FC<{ item: ItemTypeOrder }> = ({ item }) => {
    const dispatchCart = useDispatch();
    const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(item.quantity);
    return (
        <div className="cart-item-body">
            <img src={baseImage + item.img[0]} alt="img" className="cart-item-image-fav" />
            <div className="cart-item-body-det">
                <p> {item.name} </p>
                <p> {item.price * count} RON</p>
                <div className='count'>
                    <button onClick={() => { dispatchCart(deleteFromCart(item)); setCount(count - 1) }}>-</button>
                    <p>{count}</p>
                    <button onClick={() => { dispatchCart(addToCart(item)); setCount(count + 1) }}>+</button>
                </div>
            </div>

        </div>
    );

}


export default React.memo(CartItem);