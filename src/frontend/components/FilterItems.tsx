import React from 'react'

const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const FilterItems = () => {
    return (
        <div className="filter-items">
            <button /* onClick={handleFilter} */>
                <img src={baseFavicon + "menu.png"} alt="filter" />
            </button>
            <h4>
                Filtre
            </h4>
        </div>
    );
}


export default FilterItems;
