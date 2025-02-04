import React from "react";
import Items from "./Items";
import ItemsShow from "./ItemsShow";
import FilterItems from "./FilterItems";
import ItemsInStock from "./ItemsInStock";

const Woman = () => {
    const [showOnes, setShowOnes]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    return (
        <div>
            {/* un filter pentru women clothes */}
            <div className="home-settings">
                <FilterItems />
                <ItemsInStock />
                <ItemsShow setShowOnes={setShowOnes} showOnes={showOnes}/>
            </div>
            <Items women={true} men={false} showOnes={showOnes}/>
        </div>
    );
}

export default Woman;