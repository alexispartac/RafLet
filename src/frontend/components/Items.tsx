'use server'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ItemType } from '../@types/item';
import ItemsShow from "./ItemsShow";
import NotFound from './NotFound';
import ItemContiner from './ItemContiner';


const ALL_ITEMS_URL = "http://localhost:5000/items/items"
const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";

const FatchItems = async () => {
    const response = await axios.get(ALL_ITEMS_URL);
    return response.data;
}

const Items = () => {
    const [showOnes, setShowOnes]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    try {
        const { data: { items }, isLoading, error } = useQuery({
            queryKey: ['items'],
            queryFn: FatchItems,
        });

        if (isLoading) {
            return <p> Loading... </p>
        }

        if (error) {
            return <NotFound />
        }

        return (
            <div className="home">
                <div className="home-settings">
                    <div className="filter-items">
                        <button /* onClick={handleFilter} */>
                            <img src={baseFavicon + "menu.png"} alt="filter" />
                        </button>
                        <h4>
                            Filtre
                        </h4>
                    </div>
                    <ItemsShow setShowOnes={setShowOnes} showOnes={showOnes} />
                </div>
                <div className={`items ${showOnes ? "show-ones" : null}`}>
                    {
                        items.map((item: ItemType) => {
                            return (
                                <ItemContiner key={item.id} item={item} />
                            )
                        })
                    }
                </div>
            </div>
        );
    } catch (error) {
        return (
            <NotFound />
        )
    }

}

export default Items;