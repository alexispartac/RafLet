import { ItemType } from '../../@types/item';
import { FavoriteDispatch } from 'src/frontend/@types/context';
import { ADD, DELETE, FAVORITE} from "../../constants"

const FavoriteReducer = (favorite: ItemType[], action: FavoriteDispatch) => {
    
    switch (action.type) {
        case ADD:{
            return [ ...favorite, action.favorit];
        }
        case DELETE:{
            return favorite.filter((item: ItemType) => item.id !== action.id);
        } 
        case FAVORITE:{
            if(!action.favorite)
                throw new Error("Nu se poate realiza aceasta actiune!");
            return [...action.favorite];
        }
        default:
            throw new Error("Unkonwn action: ");
            
    }


}


export default FavoriteReducer;