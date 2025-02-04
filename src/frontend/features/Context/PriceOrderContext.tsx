import React from 'react'
import { ProviderProps } from 'src/frontend/@types/context';

interface PriceOrderContextType {
    priceOrder: number;
    setPriceOrder: React.Dispatch<React.SetStateAction<number>>;
}

const PriceOrderContext = React.createContext<PriceOrderContextType | undefined>(undefined);

const PriceOrderContextProvider: React.FC<ProviderProps> = ({children}) => {
    const [priceOrder, setPriceOrder] = React.useState<number>(0);
    

    return (
        <PriceOrderContext.Provider value={{priceOrder, setPriceOrder}}>
            {children}
        </PriceOrderContext.Provider>
    )
}

export { PriceOrderContextProvider };

export function usePriceOrder(){
    return React.useContext(PriceOrderContext);
}


