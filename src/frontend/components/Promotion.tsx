import React from "react";
import { Link } from "react-router";
import './promotion.css'

const Promotion = () => {

    return (
        <div className="promotions" >
            <h5 className="adds">Preturi mai mici la articole promotionale! Intra si descopera-ti favoritele.</h5>
            <div className="links">
                <a href="/man">
                    MEN
                </a>    
                <a href="/woman">
                    WOMAN
                </a>    
            </div>
        
        </div>
        
    );
}

export default Promotion;