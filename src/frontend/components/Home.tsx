import React from "react";
import FilterItems from "./FilterItems";
import Items from "./Items";
import ItemsInStock from "./ItemsInStock";
import ItemsShow from "./ItemsShow";
import "./home.css"

const Home = () => {
    const [showOnes, setShowOnes]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    return (
        <div className="home">
            {/* Filter cand o sa fie mai multe produse */}
            <div className="home-settings">
                <FilterItems />
                <ItemsInStock />
                <ItemsShow setShowOnes={setShowOnes} showOnes={showOnes}/>
            </div>
            <Items women={false} men={false} showOnes={showOnes} />
        </div>
    );
}

export default Home;