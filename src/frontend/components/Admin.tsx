// import ConnectUser from "../utils/hooks/ConnectUser";
import React from "react";
import axios from "axios";
import AddItem from "./AddItem";
import AddDiscount from "./AddDiscount";
import "./admin.css"
import { DetailsType } from "../@types/admin";
const adminId = '8634876-234324-324234-32432432';

const URL_DETAILS = 'null';
const Admin = () => {
    // const { token } = ConnectUser();
    const token = {
        user: '8634876-234324-324234-32432432'
    }

    const [details, setDetails] : [ details: DetailsType , setDetails : React.Dispatch<React.SetStateAction<DetailsType>>] = React.useState({
        users: 0,
        orders: 0,
        products: 0,
        soldProducts: 0,
        monthlyIncome: 0,
        yearlyIncome: 0,
        totalIncome: 0
    }) 

    const update = async () =>  {
        return await axios.get(URL_DETAILS, 
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },   
                withCredentials: true
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return false;
        })
    }

    const handleClickUpdateDetails = async() => {
        // cerere pentru a actualiza detaliile
        const updateDetails : DetailsType = await update();

        if(!updateDetails)
            alert("Eroare la actualizarea detaliilor");

        setDetails( {...details, ...updateDetails} )
    }

    if(token.user === adminId)
        return (
            <div className="admin">
                <div className="statistics">
                    <div className="continer">
                        <h4>Statistici</h4>
                        {/* Se actualizeaza intr o singura cerere apasand pe un buton */}
                        <button className="update" onClick={handleClickUpdateDetails}> Actualizeaza </button>
                        <div className="details">
                            <div>
                                <h5>Numar de utilizatori: </h5>                   
                                <h5>Numar comenzi: </h5>                          
                                <h5>Numar de produse: </h5>                       
                                <h5>Numar de produse vandute: </h5>               
                                <h5>Incasari lunare: </h5>                         
                                <h5>Incasari anuale: </h5>                         
                                <h5>Incasari totale: </h5>                            
                            </div>
                            <div>
                                <h5>{details.users}</h5>                          {/* cerere numar de utilizatori */}
                                <h5>{details.orders}</h5>                          {/* cerere numar de comenzi */}
                                <h5>{details.products}</h5>                          {/* cerere numar de produse */}
                                <h5>{details.soldProducts}</h5>                          {/* cerere numar de produse */}
                                <h5>{details.monthlyIncome}</h5>                          {/* cerere incasari pe o perioada de o luna*/}
                                <h5>{details.yearlyIncome}</h5>                          {/* cerere incasari pe o perioada de un an*/}
                                <h5>{details.totalIncome}</h5>                          {/* cerere incasari totale*/}
                            </div>
                        </div>
                        <div className="">

                        </div>
                        <br />
                        <h4> Adauga produs </h4>
                        <AddItem />
                        <br />
                        <h4> Adauga discount </h4>
                        <AddDiscount />
                    </div>
                </div>
            </div>
        );
} 

export default Admin;