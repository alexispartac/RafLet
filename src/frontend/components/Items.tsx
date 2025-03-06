'use server'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ItemType } from '../@types/item';
import ItemsShow from "./ItemsShow";
import NotFound from './NotFound';
import ItemContiner from './ItemContiner';


// const ALL_ITEMS_URL = "http://localhost:5000/items/items"
const ALL_ITEMS_URL = "https://ijbgjpo7xg.execute-api.us-east-1.amazonaws.com/test/items"

const FatchItems = async (category = '' as string): Promise<ItemType[]> => 
    (await axios.get(`${ALL_ITEMS_URL}?category=${category}`)).data;



const Items = () => {
    const [showOnes, setShowOnes]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);
    const [category, setCategory]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState("all");
    try {
        const { data: items, isLoading, error } = useQuery({
            queryKey: ['items', category],
            queryFn: () => FatchItems(category),
        });
        
        if (isLoading) {
            return 
        }

        if (error) {
            return <NotFound />
        }
        return (
            <div>

                <div className="flex flex-row h-[70px] justify-center">
                    <div className="flex flex-row bg-white gap-5 overflow-x-scroll scroll-smooth scrollbar-hide p-[10px]">
                        <div className="flex min-w-[100px] justify-center text-lg w-auto text-center p-2.5 bg-[#98979742] mr-2.5 shadow-[5px_5px_10px_rgba(0,0,0,0.2)] hover:bg-[#09090952] active:bg-[#09090952]"
                            onClick={() => setCategory("all")}>
                            <p>
                                Toate
                            </p>
                        </div>
                        <div className="flex min-w-[100px] justify-center text-lg w-auto text-center p-2.5 bg-[#98979742] mr-2.5 shadow-[5px_5px_10px_rgba(0,0,0,0.2)] hover:bg-[#09090952] active:bg-[#09090952]"
                            onClick={() => setCategory("hoodie")}>
                            <p>
                                Hanorace
                            </p>
                        </div>
                        <div className="flex min-w-[100px] justify-center text-lg w-auto text-center p-2.5 bg-[#98979742] mr-2.5 shadow-[5px_5px_10px_rgba(0,0,0,0.2)] hover:bg-[#09090952] active:bg-[#09090952]"
                            onClick={() => setCategory("t-shirt")}>
                            <p>
                                Tricouri
                            </p>
                        </div>
                        <div className="flex min-w-[100px] justify-center text-lg w-auto text-center p-2.5 bg-[#98979742] mr-2.5 shadow-[5px_5px_10px_rgba(0,0,0,0.2)] hover:bg-[#09090952] active:bg-[#09090952]"
                            onClick={() => setCategory("jeans")}>
                            <p>
                                Blugi
                            </p>
                        </div>
                        <div className="flex min-w-[100px] justify-center text-lg w-auto text-center p-2.5 bg-[#98979742] mr-2.5 shadow-[5px_5px_10px_rgba(0,0,0,0.2)] hover:bg-[#09090952] active:bg-[#09090952]"
                            onClick={() => setCategory("jacket")}>
                            <p>
                                Geci
                            </p>
                        </div>
                        <div className="flex min-w-[100px] justify-center text-lg w-auto text-center p-2.5 bg-[#98979742] mr-2.5 shadow-[5px_5px_10px_rgba(0,0,0,0.2)] hover:bg-[#09090952] active:bg-[#09090952]"
                            onClick={() => setCategory("sneaker")}>
                            <p>
                                Papuci
                            </p>
                        </div>
                    </div>
                    <ItemsShow setShowOnes={setShowOnes} showOnes={showOnes} />
                </div>
                <div>
                    <div className={`grid gap-5 ${showOnes ? "grid-cols-1 px-[30%] py-[20px]" : "grid-cols-2 gap-2 py-[20px] sm:grid-cols-5"}`}>

                        {
                            items ?
                                items.map((item: ItemType) => {
                                    return (
                                        <ItemContiner key={item.id} item={item} />
                                    )
                                })
                                :
                                null
                        }
                    </div>
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