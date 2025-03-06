import React from "react";

const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const Footer = () => {
    return (
        <div className="felx flex-col">
            <div className="flex flex-col  items-center justify-center py-10 mx-auto text-center ">
                <h4> Urmareste-ne </h4>
                <div className="flex flex-row gap-4 pt-2">
                    {/* transforma in link uri cate pagina */}
                    <img className="w-6 h-6" src={baseFavicon + "instagram.png"} alt="filter" />
                    <img className="w-6 h-6" src={baseFavicon + "twitter.png"} alt="filter" />
                    <img className="w-6 h-6" src={baseFavicon + "youtube.png"} alt="filter" />
                    <img className="w-6 h-6" src={baseFavicon + "facebook.png"} alt="filter" />
                </div>
            </div>
            <div className="flex flex-col text-center gap-5 p-2 border-b border-gray-600 info">
                <h6>AJUTOR SI CONTACT</h6>
                <h6>ASPECT DE ORDIN JURIDIC</h6>
                <h6>REGULI SI POLITICA DE CONFIDENTIALITATE</h6>
                <h6>LPP</h6>
            </div>
            <footer className="p-5">
                <h6 className="text-center pb-2 leading-5">
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
                <h6 className="text-center pb-2 leading-5">
                    House © 2024 Toate drepturile rezervate
                </h6>
            </footer>
        </div>
    );
}

export default Footer;