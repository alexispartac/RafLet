import axios from "axios";
import { ItemType } from "src/frontend/@types/item";
const GET_ITEMS_URL = "http://localhost:5000/items/items"


export const GetItems = async()  => {

    const items = [
        {
            id: "iubwf-wbfiufnu-fweukfbnk",
            title: "Tricou cu imprimeu custome",
            img: [
                "image1.jpeg",
                "image2.jpeg",
                "image3.jpeg"
            ],
            price: 150,
            favorite: false,
            cart: false,
            gender: "male",
            description: "fweybfwubfu ybwfeybwefb webyfuewfb iufwebnfiuwen"
        },
        {
            id: "iubwf-wbfiuf0wefnu-fweukfbnk",
            title: "Tricou cu imprimeu custome",
            img: [
                "image1.jpeg",
                "image2.jpeg",
                "image3.jpeg"
            ],
            price: 150,
            favorite: false,
            cart: false,
            gender: "male",
            description: "fweybfwubfu ybwfeybwefb webyfuewfb iufwebnfiuwen"
        }
    ]

    try {
        // const response = await axios.get(GET_ITEMS_URL,
        //     {
        //         headers: {
        //             'Content-Type': 'application/json; charset=utf-8',
        //             'Accept': 'application/json'
        //         },
        //         withCredentials: true
        //     }
        // );
        // const items = response.data.items; 
        // const items: ItemType[] = [];        
        return items; 
    }catch(error: unknown) {
        if (!error) {
            console.log('Network error:', error);
        } else {
            console.log('Error response:', error);
        }
    }

};
