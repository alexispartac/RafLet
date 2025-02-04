import React from 'react'
import { ItemType } from '../@types/item';
import { useItems } from '../features/Context/ItemContext';
import ItemHome from './ItemHome';

const Items: React.FC<{men: boolean, women: boolean, showOnes: boolean}> = ({men, women, showOnes}) => {
    const { items }: any= useItems();
    let filterAfterFilter;
    if(men){
        filterAfterFilter = items.filter((item: ItemType) => item.gender === 'men')
    }else if(women){
        filterAfterFilter = items.filter((item: ItemType) => item.gender === 'women')
    }else{
        filterAfterFilter = items;
    }

    return (
        <div className={`items ${showOnes ? "show-ones" : null}`}>
            {
                filterAfterFilter.map( (item: ItemType) => {
                    return (
                        <ItemHome key={item.id} item={{...item}}  />
                    )
                })
            }
        </div>
    );
}

export default Items;