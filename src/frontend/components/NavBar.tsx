import { Link } from 'react-router-dom';
import React from 'react';
import "./navbar.css"
import SearchBar from './SearchBar';

const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const NavBar = () => {
    const [active, setActive] = React.useState(false);

    return (
        <div className="navbar">
            <nav className="continer">
                <div className="menu-button" >
                    <button onClick={() => setActive(true)}>
                        <img src={baseFavicon + "favicon-menu-off.png"} alt="menu-off" />
                    </button>
                </div>
                    <div className={`${active ? "nav-menu-back": null}`} onClick={() => setActive(false)}></div>
                    <div className={`navbar-menu ${active ? "active": null}`}>
                        <button className='navbar-menu-button' onClick={() => setActive(false)}>
                            <img src={baseFavicon + "favicon-menu-on.png"} alt="menu-on" />
                        </button>
                        <Link to="/ ">
                            <li className='navbar-item' onClick={() => setActive(false)}>Home</li>
                        </Link>
                        <Link to="/man">
                            <li className='navbar-item' onClick={() => setActive(false)}>Man</li>
                        </Link>
                        <Link to="/woman">
                            <li className='navbar-item' onClick={() => setActive(false)}>Woman</li>
                        </Link>
                    </div> 
                <Link to="/">
                    <div className="logo">
                        {/* <img src="" alt="Logo" /> */}
                        <h2>Re~Sell</h2>
                    </div>
                </Link>
                <div className="user-info">
                    <Link to="/cart">
                        <div className="cart">
                            <img src={baseFavicon + "online-shopping.png"} alt="" />
                            <h6>Cos</h6>
                        </div>
                    </Link>
                    <Link to="/favorite">
                        <div className="favorite">
                            <img src={baseFavicon + "heart.png"} alt="" />
                            <h6>Favorite</h6>
                        </div>
                    </Link>
                    <Link to="account">
                        <div className="account">
                            <img src={baseFavicon + "user.png"} alt="filter" />
                            <h6>Cont</h6>
                        </div>
                    </Link>
                </div>
            </nav>
            <SearchBar />
        </div>
    )
}

export default NavBar;