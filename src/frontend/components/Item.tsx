import * as React from "react";
import { ItemType } from "../@types/item";
import Footer from "./Footer";
import ConnectUser from "../utils/hooks/ConnectUser";
import { useCartDispatch, useFavoriteDispatch, useItems } from "../features/Context/ItemContext";
import { useLocation, useNavigate } from "react-router";
import { usePriceOrder } from "../features/Context/PriceOrderContext";
import { useItemsOrder } from "../features/Context/ItemsOrderContext";
import "./item.css"


interface SlideImageProps {
    images: string[];
}

const SlideImage: React.FC<SlideImageProps> = ({ images }) => {
    const [currentImage, setCurrentImage] = React.useState(images[0]);

    const handleClickRight = () => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex = (currentIndex + 1 + images.length) % images.length;
         setCurrentImage(images[nextIndex]);
    }

    const handleClickLeft = () => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentImage(images[nextIndex]);
    }

    return (
        <div className="main-image" >
            <button className="button-left" onClick={handleClickLeft}>
                <img src={baseFavicon + "icons8-back-50.png"} alt="left" />
            </button>
                <img src={baseImage + currentImage} alt="Main" />
            <button className="button-right" onClick={handleClickRight}>
            <img src={baseFavicon + "icons8-forward-50.png"} alt="right" />
            </button>
        </div>
    );
};


const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const baseImage = "https://images-product-rafa.s3.amazonaws.com/";

const Item = () => {
    const [describe, setDescribe]: any = React.useState(false);
    const [maintenance, setMaintenance]: any = React.useState(false);
    const [delivery, setDelivery]: any = React.useState(false);
    const [inCart, setInCart]: any = React.useState(false);
    const [favoritItem, setFavoritItem]: any = React.useState(false);

    const { priceOrder, setPriceOrder }: any = usePriceOrder();
    const { itemsOrder, setItemsOrder }: any = useItemsOrder();

    const { token } = ConnectUser();
    const dispatchCart: any = useCartDispatch()
    const dispatchFavorite: any = useFavoriteDispatch();

    const { favorite, cartItems } : any = useItems();
    
    const location = useLocation()
    const item : ItemType = location.state.item;

    const navigate = useNavigate();
    const handleItemHome = () => {
        navigate("/");
    }

    React.useEffect(() => {
        favorite.forEach( (favoritItem: ItemType) => { 
            if(favoritItem.id === item.id)
                {
                    setFavoritItem(true);
                }
        });
        cartItems.forEach( (cartItem: ItemType) => {
            if(cartItem.id === item.id)
                {
                    setInCart(true);
                }
        })
    }, [favoritItem, cartItems])
        
    const handleFavorite = () => {
        if(token.user) {
            alert("Adaugat la favorite!");  
            if(!favoritItem)
                {
                    setFavoritItem(true);    
                    dispatchFavorite({ type: 'add', favorit: item });
                }else{
                    setFavoritItem(false);
                    dispatchFavorite({ type: 'delete', id: item.id });
                }   
        }else{
            alert("Trebuie sa fiti autentificat pentru a adauga la favorite!");
        }
    }
    const handleDescribe = () => {
        setDescribe(!describe);
    }
    const handleMaintenance = () => {
        setMaintenance(!maintenance);
    }
    const handleDelivery = () => {
        setDelivery(!delivery);
    }
    const handleCart = () => {
        if(token.user) {
            alert("Adaugat in cos!");
            dispatchCart({ type: 'add' , cartItem: item});
            setPriceOrder(priceOrder + item.price);
            setItemsOrder([...itemsOrder, { id: item.id, name: item.title, price: item.price, quantity: 1 }]);
            setInCart(true);
        }else{
            alert("Trebuie sa fiti autentificat pentru a adauga produsele dumneavoastra in cos!");
        }
    }


    return (
        <div className="item" key={item.id}>
            <br />
            <SlideImage images={item.img} />
            <button className="heart-button" onClick={handleFavorite}>
                {
                    !favoritItem ?
                    <img className="heart" src={baseFavicon + "heart-empty.png"} alt="heart" />
                    :
                    <img className="heart" src={baseFavicon + "heart-full.png"} alt="heart" />
                }
            </button>
            <button className="back-button" onClick={handleItemHome}>
                <img className="back" src={baseFavicon + "back-button.png"} alt="heart" />
            </button>
            <div className="details">
                <h5>{item.title}</h5>
                <h3>{item.price} RON</h3>
                <button disabled={inCart} onClick={handleCart}>
                    <h2>Adauga - {item.price} RON</h2>
                </button>
                <h5> Livrare gratuita peste 200 RON</h5>
                <h5> Retur 15 RON</h5>
                <div onClick={handleDescribe}>
                    <h5> DESCRIERE </h5>
                    <img className="arrow-down" src={baseFavicon + "down-arrow.png"} alt="arrow" />
                    {
                        describe ?
                        <div className="describe">
                            <p>{item.description}</p>
                        </div>
                        : null
                    }
                </div>
                <div onClick={handleMaintenance}>
                    <h5> COMPOZITIE SI INTRETINERE </h5>
                    <img className="arrow-down" src={baseFavicon + "down-arrow.png"} alt="arrow" />
                    {
                        maintenance ?
                        <div className="maintenance">
                            <p>
                            Material: 60% BUMBAC, 40% POLIESTER washing
                            SPĂLĂLAŢI LA MAŞINĂ DE SPĂLAT, MAX. TEMP.30 ° C bleaching
                            NU FOLOSIŢI ÎNĂLBITOR drying
                            NU USCAŢI PRIN CENTRIFUGARE ironing
                            CĂLCAŢI LA TEMP.MAX. 110 ° C - FĂRĂ ABUR preservation
                            NU SE CURĂŢA CHIMIC
                            </p>
                        </div>
                        : null
                    }
                </div>
                <div onClick={handleDelivery}>
                    <h5> LIVRARE SI RETUR </h5>
                    <img className="arrow-down" src={baseFavicon + "down-arrow.png"} alt="arrow" />
                    {
                        delivery ?
                        <div className="delivery">
                            <p>
                            Politica de expediere <br />
                                    Ridicare din magazin <br />
                                    GRATUITĂ <br />
                                    3-6 zile lucrătoare <br />

                                    Cargus Ship&Go - plata online: <br />
                                    10,99 RON* <br />
                                    3-6 zile lucrătoare <br />

                                    FanCourier Collect Point - plata online: <br />
                                    10,99 RON* <br />
                                    3-6 zile lucrătoare <br />

                                    Cargus Ship&Go - plata la livrare: <br />
                                    13,99 RON* <br />
                                    3-6 zile lucrătoare <br />

                                    FanCourier - Plata online: <br />
                                    16,99 RON* <br />
                                    3-6 zile lucrătoare <br />

                                    Cargus Curier - Plata la livrare: <br />
                                    18,99 RON* <br />
                                    3-6 zile lucrătoare <br />
                                    * - Livrare gratuită de la 159 RON <br />
                            </p>
                        </div>
                        : null
                    }
                </div>
            </div>
            <Footer />
        </div>    
    );
}


export default Item;