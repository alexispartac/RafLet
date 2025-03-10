import * as React from "react";
import ConnectUser from "../utils/hooks/ConnectUser";
import { ItemType, ItemTypeOrder } from "../@types/item";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToFavorite, deleteFromFavorite } from "../redux/favoriteSlice";
import Footer from "./Footer";
import { Button } from "./elements/Button";

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
        <div className="relative flex h-[450px] justify-center" >
            <button className="absolute w-[40px] h-[40px] top-[120px] left-[10px] bg-transparent border-none z-2" onClick={handleClickLeft}>
                <img className="w-full object-contain" src={baseFavicon + "icons8-back-50.png"} alt="left" />
            </button>
            <img src={baseImage + currentImage} alt="Main" />
            <button className="absolute w-[40px] h-[40px] top-[120px] right-[10px] bg-transparent border-none z-2" onClick={handleClickRight}>
                <img className="w-full object-contain" src={baseFavicon + "icons8-forward-50.png"} alt="right" />
            </button>
        </div>
    );
};


const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const baseImage = "https://images-product-rafa.s3.amazonaws.com/";

const Item = () => {
    const location = useLocation()
    const item: ItemType = location.state.item;
    const [describe, setDescribe]: any = React.useState(false);
    const [maintenance, setMaintenance]: any = React.useState(false);
    const [delivery, setDelivery]: any = React.useState(false);
    const [inCart, setInCart]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const favorite = useSelector((state: any) => state.favorite.favorite);
    const [isFavorit, setIsFavorit] = React.useState(favorite.find((favorit: ItemType) => favorit.id === item.id));

    const { token } = ConnectUser();

    const cartItems = useSelector((state: any) => state.cart.cart)
    const dispatchCart = useDispatch();
    const dispatchFavorite = useDispatch();

    const navigate = useNavigate();
    const handleItemHome = () => {
        navigate("/");
    }

    React.useEffect(() => {
        favorite.forEach((isFavorit: ItemType) => {
            if (isFavorit.id === item.id) {
                setIsFavorit(true);
            }
        });
        cartItems.forEach((cartItem: ItemTypeOrder) => {
            if (cartItem.id === item.id) {
                setInCart(true);
            }
        })
    }, [isFavorit, cartItems])

    const handleFavorite = () => {
        if (token.user) {
            if (!isFavorit) {
                alert("Adaugat la favorite!");
                dispatchFavorite(addToFavorite(item))
                setIsFavorit(true);
            } else {
                alert("Sters de la favorite!");
                dispatchFavorite(deleteFromFavorite(item))
                setIsFavorit(false);
            }
        } else {
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
        if (token.user) {
            alert("Adaugat in cos!");
            dispatchCart(addToCart({ id: item.id, name: item.title, img: item.img[0], price: item.price, quantity: 1 }));
            setInCart(true);
        } else {
            alert("Trebuie sa fiti autentificat pentru a adauga produsele dumneavoastra in cos!");
        }
    }

    return (
        //<div className="fixed top-0 left-0 w-screen h-screen overflow-scroll bg-gray-100 flex flex-col z-20"
        <div className="fixed top-0 left-0 w-screen h-screen overflow-scroll bg-gray-100 flex flex-col z-20" key={item.id}>
            <br />
            <div>
                <SlideImage images={item.img} />
            </div>
            <button className="absolute w-[40px] top-3 right-3 bg-transparent border-none" onClick={handleFavorite}>
                {
                    !isFavorit ?
                        <img className="w-[30px] z-0 relative top-[1px]" src={baseFavicon + "heart-empty.png"} alt="heart" />
                        :
                        <img className="w-[30px] z-0 relative top-[1px]" src={baseFavicon + "heart-full.png"} alt="heart" />
                }
            </button>
            <button className="absolute z-10 w-[40px] left-3 top-3 bg-transparent border-none" onClick={handleItemHome}>
                <img className="w-[30px] z-0 relative" src={baseFavicon + "back-button.png"} alt="heart" />
            </button>
            <div className="flex flex-col p-[30px] gap-2.5 border-b border-gray-700 p-[10px_20px] my-[15px] rounded-[20px] border border-[rgba(0,0,0,0.262)]">
                <h5 >{item.title}</h5>
                <h3>{item.price} RON</h3>
                <Button disabled={inCart} onClick={handleCart} color="red">
                    Adauga
                </Button>
                <h5> Livrare gratuita peste 200 RON</h5>
                <h5> Retur 15 RON</h5>
                <div onClick={handleDescribe}>
                    <h5> DESCRIERE </h5>
                    <img className="w-5 relative -top-5 -right-[310px]" src={baseFavicon + "down-arrow.png"} alt="arrow" />
                    {
                        describe ?
                            <div className="w-full p-[10px] bg-transparent">
                                <p className="leading-[25px]">{item.description}</p>
                            </div>
                            : null
                    }
                </div>
                <div onClick={handleMaintenance}>
                    <h5> COMPOZITIE SI INTRETINERE </h5>
                    <img className="w-5 relative -top-5 -right-[310px]" src={baseFavicon + "down-arrow.png"} alt="arrow" />
                    {
                        maintenance ?
                            <div className="w-full p-[10px] bg-transparent">
                                <p className="leading-[25px]">
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
                    <img className="w-5 relative -top-5 -right-[310px]" src={baseFavicon + "down-arrow.png"} alt="arrow" />
                    {
                        delivery ?
                            <div className="w-full p-[10px] bg-transparent">
                                <p className="leading-[25px]">
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