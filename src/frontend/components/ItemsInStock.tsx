import React from 'react'
// import axios from 'axios';

// const URL_ITEMS_IN_STOCK = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const ItemsInStock = () => {
    const [valueItemsInStock, setValueItemsInStock]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(10);

    // React.useEffect( () => {
    //     const fetchItemsInStock = async () => {
    //         const response = await axios.get(URL_ITEMS_IN_STOCK, 
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 withCredentials: true
    //             },

    //         );
    //         setValueItemsInStock(response.data);
    //         setValueItemsInStock(30);
    //     }
    //     fetchItemsInStock();
    // }, [])

    return (
        <div className='stock-items'>
            <h4>
                Produse in stoc {valueItemsInStock}
            </h4>
        </div>
    )
}

export default ItemsInStock;