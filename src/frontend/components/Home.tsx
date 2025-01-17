import React from "react";
import { ItemType } from "../@types/item";
import { useItems }  from "../features/Context/ItemContext";
import ItemHome from "./ItemHome";
import Footer from "./Footer";
import "./home.css"


const Home = () => {
    const { items }: any= useItems();
    console.log(items)
    return (
        <div className="home">
            <div className="filter-items">
                <button /* onClick={handleFilter} */>
                    <img src="./src/assets/favicons/menu.png" alt="filter" />
                </button>   
                <h4>
                    Filtre
                </h4>
            </div>
            {/* creere pentru mai mult de 50 produse un buton care sa le afisze pe restul */}
            <div className="items">
                {
                    items.map( (item: ItemType) => {
                        return (
                            <ItemHome key={item.id} item={{...item}} />
                        )
                    })
                }
            </div>
            <Footer />
        </div>
    );
}

export default Home;