import React from 'react'
import { ItemType } from 'src/frontend/@types/item'

export const SingleItemContext = React.createContext<ItemType | undefined>(undefined);


export const SingleItemProvider = ({ children, item }: { children: React.ReactNode, item: ItemType }) => {
    return (
        <SingleItemContext.Provider value={item}>
            {children}
        </SingleItemContext.Provider>
    )
}

