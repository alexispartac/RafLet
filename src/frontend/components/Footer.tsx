import React from "react";
import "./footer.css"

const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const Footer = () => {
    return (
        <div className="home">
            <div className="social-media">
                <h4> Urmareste-ne </h4>
                <div>
                    {/* transforma in link uri cate pagina */}
                    <img src={baseFavicon + "instagram.png"} alt="filter" />
                    <img src={baseFavicon + "twitter.png"} alt="filter" />
                    <img src={baseFavicon + "youtube.png"} alt="filter" />
                    <img src={baseFavicon + "facebook.png"} alt="filter" />
                </div>
            </div>
            <div className="info">
                <h6>AJUTOR SI CONTACT</h6>
                <h6>ASPECT DE ORDIN JURIDIC</h6>
                <h6>REGULI SI POLITICA DE CONFIDENTIALITATE</h6>
                <h6>LPP</h6>
            </div>
            <footer>
                <h6>
                    LPP ROMANIA FASHION S.R.L., 
                    având sediul în Bucureşti, 
                    Calea Griviței, nr. 84-98 si 100-102, 
                    The Mark Tower, Etaj 5, Sector 1, 
                    Cod Postal: 010735, 
                    înmatriculată la Registrul Comerţului 
                    din Bucureşti sub nr. J40/17329/2007 
                    având CUI: RO22418650 
                    numit în cele ce urmează şi LPP RO
                </h6>
                <h6>
                    House © 2024 Toate drepturile rezervate
                </h6>
            </footer>
        </div>
    );
}

export default Footer;