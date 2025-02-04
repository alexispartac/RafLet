import * as React from 'react';
import { GetItems } from '../../utils/functions/GetItems';
import { GetFavorite } from '../../utils/functions/GetFavorite';
import { GetCartItems } from '../../utils/functions/GetCartItems';
import { ItemType } from '../../@types/item';
import ItemReducer from '../../utils/functions/ItemReducer';
import FavoriteReducer from '../../utils/functions/FavoriteReducer';
import CartReducer from '../../utils/functions/CartReducer';
import { IContext, ProviderProps, ItemDispatch, FavoriteDispatch, CartDispatch } from '../../@types/context';

const ItemContext = React.createContext<IContext | undefined>(undefined);
const ItemDispatchContext = React.createContext<unknown>(null);
const FavoriteDispatchContext = React.createContext<unknown>(null);
const CartDispatchContext = React.createContext<unknown>(null);


const ItemProvider : React.FC<ProviderProps> = ({ children }) => {
    const [items, dispatchItems]: [items: ItemType[], action: React.Dispatch<ItemDispatch>]= React.useReducer(ItemReducer, []);
    const [favorite, dispatchFavorite]: [favorite: ItemType[], action: React.Dispatch<FavoriteDispatch>]= React.useReducer(FavoriteReducer, []);
    const [cartItems, dispatchCart]: [cartItems: ItemType[], action: React.Dispatch<CartDispatch>]= React.useReducer(CartReducer, []);
    
    
    React.useLayoutEffect( () => { 
        setTimeout( () => {
            GetItems().then(data => {
                dispatchItems({type: 'items', items: data});
            }).catch(() => {
                throw new Error("Nu s-au putut incarca datele!");
            });
            GetFavorite().then(data => {
                dispatchFavorite({type: 'favorite', favorite: data});
            }).catch(() => {
                throw new Error("Nu s-au putut incarca datele!");
            });
            GetCartItems().then(data => {
                dispatchCart({type: 'cartitems', cartItems: data});
            }).catch(() => {
                throw new Error("Nu s-au putut incarca datele!");
            });
        }, 500)
    },[])

    return (
        <ItemContext.Provider value={{ items, favorite, cartItems }}>
            <ItemDispatchContext.Provider value={dispatchItems}>
                <CartDispatchContext.Provider value={dispatchCart}>
                    <FavoriteDispatchContext.Provider value={dispatchFavorite}>
                        {children}
                    </FavoriteDispatchContext.Provider>
                </CartDispatchContext.Provider>
            </ItemDispatchContext.Provider>
        </ItemContext.Provider>
    );
};

export { ItemProvider };

export function useItems(){
    return React.useContext(ItemContext);
}

export function useItemDispatch(){
    return React.useContext(ItemDispatchContext);
}

export function useFavoriteDispatch(){
    return React.useContext(FavoriteDispatchContext);
}

export function useCartDispatch(){
    return React.useContext(CartDispatchContext);
}