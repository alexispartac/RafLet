import { ItemType } from '../../@types/item';
import { ItemDispatch } from '../../@types/context'
import { ADD, DELETE, ITEMS } from "../../constants"

const ItemReducer = (items: ItemType[], action: ItemDispatch) => {
    
    switch (action.type) {
        case ADD:{
            return [ ...items, action.item];
        }
        case DELETE:{
            return items.filter((item: ItemType) => item.id !== action.id);
        } 
        case ITEMS:{
            if(!action.items)
                throw new Error("Nu se poate realiza aceasta actiune!");
            return [...action.items];
        }
        default:
            throw new Error("Unkonwn action: ");
            
    }


}


export default ItemReducer;