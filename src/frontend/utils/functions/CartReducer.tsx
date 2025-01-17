import { ItemType } from 'src/frontend/@types/item';
import { CartDispatch } from 'src/frontend/@types/context'
import { ADD, DELETE, CARTITEMS} from "../../constants"

const CartReducer = (cartItems: ItemType[], action: CartDispatch) => {

    switch (action.type) {
        case ADD:{
            return [ ...cartItems, action.cartItem];
        }
        case DELETE:{
            return cartItems.filter((item: ItemType) => item.id !== action.id);
        } 
        case CARTITEMS:{
            if(!action.cartItems)
                throw new Error("Nu se poate realiza aceasta actiune!");
            return [...action.cartItems];
        }
        default:
            throw new Error("Unkonwn action: ");
            
    }

};

export default CartReducer;
