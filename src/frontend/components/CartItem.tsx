import React from 'react'   
import { useCartDispatch } from '../features/Context/ItemContext';
import { ItemType } from '../@types/item';
import { usePriceOrder } from '../features/Context/PriceOrderContext';
import { useItemsOrder } from '../features/Context/ItemsOrderContext';
import "./cart-item.css"

const baseImage = "https://images-product-rafa.s3.amazonaws.com/";
const CartItem: React.FC<{item: ItemType }> = ({ item })  => {
    const { priceOrder, setPriceOrder }: any = usePriceOrder();
    const { itemsOrder, setItemsOrder }: any = useItemsOrder();
    const dispatchCart: any= useCartDispatch();
    
    const foundItem = itemsOrder.find((itemOrder: any) => itemOrder.id === item.id);
    const quantity = foundItem?.quantity;
    const [count, setCount]: any = React.useState(quantity);


    console.log(itemsOrder);

    const addToTotalPriceOrder = () => {
        setPriceOrder(priceOrder + item.price);
    }
    const removeFromTotalPriceOrder = () => {
        setPriceOrder(priceOrder - item.price);
    }

    const addToTotalItemsOrder = () => {
        setItemsOrder(
            itemsOrder.map( (itemOrder: any) => {
                if(itemOrder.id === item.id)
                    return {...itemOrder, quantity: itemOrder.quantity + 1}
                else
                    return itemOrder
            })
        )
    }
     
    const removeFromTotalItemsOrder = () =>{
        if(count === 1){
            setItemsOrder(
                itemsOrder.map( (itemOrder: any) => 
                    itemOrder.id === item.id ?  null : itemOrder
                )
                .filter( (item: any) => item !== null)
            )
        }else{
            setItemsOrder(
                itemsOrder.map( (itemOrder: any) => {
                    if(itemOrder.id === item.id){
                        return {...itemOrder, quantity: itemOrder.quantity - 1}
                    }
                    else{
                        return itemOrder
                    }
                })
            )
        }
    }
    
    return (
        <div className="cart-item-body">
            <img src={baseImage+ item.img[0] } alt="img" className="cart-item-image-fav"/>
            <div className="cart-item-body-det">
                <p> {item.title} </p>
                <p> {item.price} RON</p>
                <div className='count'>
                    <button onClick={() =>  {
                        removeFromTotalPriceOrder();
                        removeFromTotalItemsOrder();
                        return count > 1 ? setCount(count - 1): dispatchCart({id: item.id, type: "delete"})
                    }
                }>-</button>
                    <p>{count}</p>
                    <button onClick={() => 
                    {
                        addToTotalPriceOrder();
                        addToTotalItemsOrder();
                        return setCount(count + 1);
                    }
                    }>+</button>
                </div>
            </div>
            
        </div>
    );

}


export default React.memo(CartItem);