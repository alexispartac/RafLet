import { Link } from 'react-router-dom';
import React from 'react';
import SearchBar from './SearchBar';

const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const NavBar = () => {
    const [active, setActive] = React.useState(false);

    return (
        <div className="flex h-[4rem] sticky top-0 bg-white z-1 border-b-1 border-black-500 py-2">
            <nav className="flex w-full flex-row justify-between ">
                <div className='flex p-[5px] basis-[15vw] sm:basis-[5vw]' onClick={() => setActive(true)}>
                    <img className='flex cover' src={baseFavicon + "favicon-menu-off.png"} alt="menu-off" />
                </div>
                <div className={`${active ? "block h-screen text-center fixed top-0 left-0 text-black w-full z-0 bg-[#3c3c3c4d]" : "hidden"}`} onClick={() => setActive(false)}></div>
                <div className={`flex flex-col w-7/10 h-screen text-center fixed top-0 -left-full bg-white text-black transition ease-in-out duration-500 ${active ? "left-0 border-r border-gray-300" : ""}`}>
                    <button className="self-start p-2" onClick={() => setActive(false)}>
                        <img className="max-w-[2rem]" src={baseFavicon + "favicon-menu-on.png"} alt="menu-on" />
                    </button>
                    <Link to="/">
                        <li className="p-4 list-none bg-white text-black text-lg" onClick={() => setActive(false)}>Home</li>
                    </Link>
                    <Link to="/man">
                        <li className="p-4 list-none bg-white text-black text-lg" onClick={() => setActive(false)}>Man</li>
                    </Link>
                    <Link to="/woman">
                        <li className="p-4 list-none bg-white text-black text-lg" onClick={() => setActive(false)}>Woman</li>
                    </Link>
                </div>

                <div className="flex h-full basis-[10vw]  ">
                    <Link to="/">
                        {/* <img src="" alt="Logo" /> */}
                        <h2 className='flex text-[2rem] content-center justify-center'>Re~Sell</h2>
                    </Link>
                </div>
                <SearchBar />
                <div className="flex auto-cols-max grid-flow-col py-[2px] px-[10px] gap-4 basis-[20vw]">
                    <Link to="/cart">
                        <div className="flex flex-col items-center justify-center">
                            <img className='max-w-[1.5rem]' src={baseFavicon + "online-shopping.png"} alt="" />
                            <h6>Cos</h6>
                        </div>
                    </Link>
                    <Link to="/favorite">
                        <div className="flex flex-col items-center justify-center">
                            <img className='max-w-[1.5rem]' src={baseFavicon + "heart.png"} alt="" />
                            <h6>Favorite</h6>
                        </div>
                    </Link>
                    <Link to="account">
                        <div className="flex flex-col items-center justify-center">
                            <img className='max-w-[1.5rem]' src={baseFavicon + "user.png"} alt="filter" />
                            <h6>Cont</h6>
                        </div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;