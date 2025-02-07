import React from "react";
import { Link } from "react-router";
import './promotion.css'

const Promotion = () => {

    return (
        <div className="promotions" >
            <h5 className="adds">Preturi mai mici la articole promotionale! Intra si descopera-ti favoritele.</h5>
            <div className="links">
                <Link to="/man">
                    <li>Man</li>
                </Link>
                <Link to="/woman">
                    <li>Woman</li>
                </Link>  
            </div>
        
        </div>
        
    );
}

export default Promotion;