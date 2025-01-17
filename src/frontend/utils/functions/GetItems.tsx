import axios from "axios";
const GET_ITEMS_URL = "http://localhost:5000/items/items"

export const GetItems = async()  => {
    try {
        const response = await axios.get(GET_ITEMS_URL,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                withCredentials: true
            }
        );
        const items = response.data.items; 
        
        return items; 
    }catch(error: unknown) {
        if (!error) {
            console.log('Network error:', error);
        } else {
            console.log('Error response:', error);
        }
    }

};
