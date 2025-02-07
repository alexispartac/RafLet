// import axios from "axios";
// const GET_CART_ITEMS_URL = "";

import { ItemType } from "src/frontend/@types/item";

export const GetCartItems = async(/*userToken : string | null*/)  => {
//     const items = [
//     {
//         id: "iubwf-wbfiufnu-fweukfbnk",
//         title: "Tricou cu imprimeu custome",
//         img: [
//             "./src/assets/images/image1.jpeg"
//         ],
//         sizes: 
//             {
//                 size: "S",
//                 available: true,
//                 pieces: 5,
//                 color: "red",
//                 discount: 10
//             } 
//         ,
//         price: 150,
//         favorite: false,
//         cart: false,
//         gender: "male",
//         description: "fweybfwubfu ybwfeybwefb webyfuewfb iufwebnfiuwen"
//     },
//     {
//         id: "iubwf-wbfiuf0wefnu-fweukfbnk",
//         title: "Tricou cu imprimeu custome",
//         img: [
//             "./src/assets/images/image1.jpeg"
//         ],
//         sizes: 
//             {
//                 size: "S",
//                 available: true,
//                 pieces: 5,
//                 color: "red",
//                 discount: 10
//             } 
//         ,
//         price: 150,
//         favorite: false,
//         cart: false,
//         gender: "male",
//         description: "fweybfwubfu ybwfeybwefb webyfuewfb iufwebnfiuwen"
//     }
// ]
    try {
            // const response = await axios.get(const GET_CART_ITEMS_URL,
            //     {
            //         headers: {
            //             'Content-Type': 'application/json; charset=utf-8',
            //             'Accept': 'application/json'
            //         },
            //         withCredentials: true
            //     }
            // );
            // const items = response.data.items; 
            const cartItems: ItemType[] = [];        
            return cartItems; 
        }catch(error: unknown) {
            if (!error) {
                console.log('Network error:', error);
            } else {
                console.log('Error response:', error);
            }
        }

};
