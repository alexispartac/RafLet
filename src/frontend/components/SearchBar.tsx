import React from 'react'

const SearchBar = () => {
    return (
        <div className="basis-[1vw] flex sm:basis-[50vw]">
            <input className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" type="search" name="search-item" id="search-item" placeholder="Search..."/>
        </div>
    )
}

export default SearchBar;