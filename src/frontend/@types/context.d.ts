import { ItemType } from "./item";

export interface IContext {
    items: ItemType[];
    favorite: ItemType[];
    cartItems: ItemType[];  
}


export interface ProviderProps { 
    children: ReactNode; 
}

export type ItemDispatch =  
                        | { item: ItemType; type: 'add' }
                        | { id: string; type: 'delete'}
                        | { items: ItemType[] | undefined; type: 'items'}
                            
export type FavoriteDispatch = 
                            | { favorit: ItemType; type: 'add' }
                            | { id: string; type: 'delete'}
                            | { favorite: ItemType[] | undefined; type: 'favorite'}

export type CartDispatch = 
                            | { cartItem: ItemType; type: 'add' }
                            | { id: string; type: 'delete'}
                            | { cartItems: ItemType[] | undefined; type: 'cartitems'}