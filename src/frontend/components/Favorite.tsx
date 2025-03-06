import * as React from "react";
import { Link } from "react-router-dom"
import { ItemType } from "../@types/item";
import ConnectUser from "../utils/hooks/ConnectUser";
import FavoriteItem from "./FavoriteItem";
import { useSelector } from "react-redux";
import { Button } from "./elements/Button";


const baseImage = "https://images-product-rafa.s3.amazonaws.com/";

const Favorite = () => {

    const listOfFavorite = useSelector((state: any) => state.favorite.favorite);
    const { token,  } = ConnectUser();

    if (!token.user)
        return (
            <div className="flex flex-col text-center py-[10px]">
                <h1 className="text-3xl">Favorite</h1>
                <div className="flex flex-col justify-center py-[10px] gap-[10px]">
                    <img className="p-[4rem] sm:px-[500px] sm:py-[20px]" src={baseImage + "favorite-img.png"} alt="" />
                    <p>Salveaza rapid articolele pentru mai tarziu</p>
                    {
                        !token.user ?
                            <Link to="/account">
                                <Button onClick={() => {}} color="red">
                                    Conecteaza-te
                                </Button>
                            </Link>
                            : null
                    }
                </div>
                <div className="space"></div>
                {
                    !token.user ?
                        <div>
                            <h3>Daca nu doresti sa intrii in contul tau continua sa vizionezi produsele.</h3>
                            <p>
                                <Link to="/">
                                    Continua cumparaturile!
                                </Link>
                            </p>
                        </div>
                        : null
                }
            </div>
        );

    return (
        <div>
            {
                listOfFavorite ?
                    <div className="grid pt-[1em] justify-center">
                        <div className="block px-[30px] py-[10px]">
                            <h3>Favoritele tale</h3>
                            {
                                listOfFavorite.map((favorit: ItemType) => {
                                    return <FavoriteItem item={favorit} key={favorit.id} />
                                })
                            }
                        </div>
                    </div>
                    :
                    <h1 className="flex justify-center py-5 px-10 ">Nu aveti niciun produs favorit. Intorceti-va la cuparaturi!</h1>
            }
        </div>
    );

}

export default React.memo(Favorite);