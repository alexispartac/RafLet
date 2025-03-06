import React from "react" 
import axios from "axios";

const URL_DISCOUNT = 'http://localhost:5000/addDiscount';
const AddDiscount = () => {
    const [discount, setDiscount]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0);

    const addDiscount = async() => {
        await axios.post(URL_DISCOUNT, {discount: discount}, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            },   
            withCredentials: true
        }).then(() => {
            alert("Discount added successfully!");
        })
        .catch(() => {
            alert("Error adding discount!");
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscount(Number(event.target.value) );
    }   

    const handleAddDiscount = async() => {
        await addDiscount();
        setDiscount(0);
    }


    return (
        <div className="flex flex-col justify-center px-[30px] py-[10px]">
            <input type="text" placeholder={`${discount}`} value={discount} onChange={e => handleChange(e)}/>
            <button onClick={handleAddDiscount}> Add discount</button>
        </div>
    )
}

export default AddDiscount