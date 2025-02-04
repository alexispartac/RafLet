import React from 'react'
import { ProviderProps } from 'src/frontend/@types/context';

interface ItemTypeOrder {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface ItemsOrderContextType {
    itemsOrder: ItemTypeOrder[] | undefined;
    setItemsOrder: React.Dispatch<React.SetStateAction<ItemTypeOrder[] | undefined>>;
  
}

const ItemsOrderContext = React.createContext<ItemsOrderContextType | undefined>(undefined);

const ItemsOrderContextProvider: React.FC<ProviderProps> = ({children}) => {
    const [itemsOrder, setItemsOrder] = React.useState<ItemTypeOrder[] | undefined>([]);

    return (
        <ItemsOrderContext.Provider value={{ itemsOrder, setItemsOrder}}>
            {children}
        </ItemsOrderContext.Provider>
    )
}

export { ItemsOrderContextProvider };

export function useItemsOrder(){
    return React.useContext(ItemsOrderContext);
}


