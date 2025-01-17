// import axios from "axios";
// const GET_USER_FAVORITE_URL = "http://localhost:5000/items/items";

export const GetFavorite = async(/*userToken : string | null*/)  => {
    const favorite = [
    {
        id: "iubwf-wbfiufnu-fweukfbnk",
        title: "Tricou cu imprimeu custome",
        img: [
            "./src/assets/images/image1.jpeg"
        ],
        sizes: 
            {
                size: "S",
                available: true,
                pieces: 5,
                color: "red",
                discount: 10
            } 
        ,
        price: 150,
        favorite: false,
        cart: false,
        description: "fweybfwubfu ybwfeybwefb webyfuewfb iufwebnfiuwen"
    },
    {
        id: "iubwf-wbfiuf0wefnu-fweukfbnk",
        title: "Tricou cu imprimeu custome",
        img: [
            "./src/assets/images/image1.jpeg"
        ],
        sizes: 
            {
                size: "S",
                available: true,
                pieces: 5,
                color: "red",
                discount: 10
            } 
        ,
        price: 150,
        favorite: false,
        cart: false,
        description: "fweybfwubfu ybwfeybwefb webyfuewfb iufwebnfiuwen"
    }
]
    return [];
    // try {
    //     if(!userToken){
    //         throw new Error("Nu exista token!");
    //     }else{
    //         const response = await axios.get(GET_USER_FAVORITE_URL,
    //             {
    //                 params: {
    //                     userToken: userToken
    //                 },
    //                 headers: {
    //                     'Authorization': `Bearer ${userToken}`,
    //                     'Content-Type': 'application/json; charset=utf-8',
    //                     'Accept': 'application/json'
    //                 },
    //                 withCredentials: true
    //             }
    //         );
    //         const items = response.data; 
    //         return items;
    //     }

        
    // }catch(error: unknown) {
    //     if (!error) {
    //         console.log('Network error:', error);
    //     } else {
    //         console.log('Error response:', error);
    //     }
    // }

};
