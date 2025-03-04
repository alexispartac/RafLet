'use server'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ItemType } from '../@types/item';
import ItemsShow from "./ItemsShow";
import NotFound from './NotFound';
import ItemContiner from './ItemContiner';


const ALL_ITEMS_URL = "http://localhost:5000/items/items"
// const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";

const FatchItems = async (category = '' as string): Promise<ItemType[]> =>
    (await axios.get(`${ALL_ITEMS_URL}?category=${category}`)).data.items;


const Items = () => {
    const [showOnes, setShowOnes]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);
    const [category, setCategory]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState("all");
    try {                                   
        const { data: items, isLoading, error } = useQuery({
            queryKey: ['items', category],
            queryFn: () => FatchItems(category),
        });

        if (isLoading) {
            return <p> Loading... </p>
        }

        if (error) {
            return <NotFound />
        }
        console.log(items);
        return (
            <div className="home">
                <div className="home-settings">
                    <div className="filter-items">
                        <div className="filter-continer">
                            <div className='filter-continer-element'
                                onClick={() => setCategory("all")}> Toate </div>
                            <div className='filter-continer-element'
                                onClick={() => setCategory("hoodie")}> Hanorace </div>
                            <div className='filter-continer-element'
                                onClick={() => setCategory("t-shirt")}> Tricouri </div>
                            <div className='filter-continer-element'
                                onClick={() => setCategory("jeans")}> Blugi </div>
                            <div className='filter-continer-element'
                                onClick={() => setCategory("jacket")}> Geci </div>
                            <div className='filter-continer-element'
                                onClick={() => setCategory("sneaker")}> Papuci </div>
                        </div>
                    </div>
                </div>
                <ItemsShow setShowOnes={setShowOnes} showOnes={showOnes} />
                <div className={`items ${showOnes ? "show-ones" : null}`}>
                    {
                        items ?
                            items.map((item: ItemType) => {
                                return (
                                    <ItemContiner key={item.id} item={item} />
                                )
                            })
                            :

                            <h1>Nu mai avem in stoc!</h1>

                    }
                </div>
            </div>
        );
    } catch (error) {
        console.log(error)
        return (
            <NotFound />
        )
    }

}

export default Items;