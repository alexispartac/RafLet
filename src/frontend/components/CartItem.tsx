import React from 'react'   
import { useCartDispatch } from '../features/Context/ItemContext';
import { ItemType } from '../@types/item';
import "./cart-item.css"

const CartItem: React.FC<{item: ItemType}> = ({ item })  => {
    const dispatchCart: any= useCartDispatch();

    return (
        <div className="cart-item-body">
            <img src={`${item.img[0]}`} alt="img" className="cart-item-image-fav"/>
            <div className="cart-item-body-det">
                <p> {item.title} </p>
                <p> {item.price} RON</p>
                <div onClick={() => {dispatchCart({id: item.id, type: 'delete'})}} >
                    ---
                </div>
            </div>
            
        </div>
    );

}


export default CartItem;