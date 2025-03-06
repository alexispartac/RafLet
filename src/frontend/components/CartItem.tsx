import React, { useState } from 'react'
import { ItemTypeOrder } from '../@types/item';
import { useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/cartSlice';

const baseImage = "https://images-product-rafa.s3.amazonaws.com/";
const CartItem: React.FC<{ item: ItemTypeOrder }> = ({ item }) => {
    const dispatchCart = useDispatch();
    const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(item.quantity);
    return (
        <div className="flex flex-row p-[10px] gap-[10px]">
            <img src={baseImage + item.img[0]} alt="img" className="w-[100px] h-[100px] object-scale-down" />
            <div className="p-[10px]">
                <p> {item.name} </p>
                <p> {item.price * count} RON</p>
                <div className='flex flex-row px-[10px] gap-10'>
                    <button onClick={() => { dispatchCart(deleteFromCart(item)); setCount(count - 1) }}>-</button>
                    <p>{count}</p>
                    <button onClick={() => { dispatchCart(addToCart(item)); setCount(count + 1) }}>+</button>
                </div>
            </div>

        </div>
    );

}


export default React.memo(CartItem);