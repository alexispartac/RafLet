import { Link } from 'react-router-dom';
import React from 'react';
import "./navbar.css"


const NavBar = () => {
    const [active, setActive] = React.useState(false);

    return (
        <div className="navbar">
            <nav className="continer">
                <div className="menu-button" >
                    <button onClick={() => setActive(true)}>
                        <img src="./src/assets/favicons/favicon-menu-off.png" alt="menu-off" />
                    </button>
                </div>
                { active ?
                    <div className='navbar-menu'>
                        <button className='navbar-menu-button' onClick={() => setActive(false)}>
                            <img src="./src/assets/favicons/favicon-menu-on.png" alt="menu-on" />
                        </button>
                        <Link to="/promotions">
                            <li className='navbar-item' onClick={() => setActive(false)}>Promotii</li>
                        </Link>
                        <Link to="/ ">
                            <li className='navbar-item' onClick={() => setActive(false)}>Home</li>
                        </Link>
                        <Link to="/man">
                            <li className='navbar-item' onClick={() => setActive(false)}>Man</li>
                        </Link>
                        <Link to="/woman">
                            <li className='navbar-item' onClick={() => setActive(false)}>Woman</li>
                        </Link>
                        <Link to="/admin">
                            <li className='navbar-item' onClick={() => setActive(false)}>Admin</li>
                        </Link>
                    </div> : null
                 }
                <Link to="/">
                    <div className="logo">
                        {/* <img src="" alt="Logo" /> */}
                        <h2>Re~Sell</h2>
                    </div>
                </Link>
                <div className="user-info">
                    <Link to="/cart">
                        <div className="cart">
                            {/* <img src="" alt="" /> */}
                            <img src="./src/assets/favicons/online-shopping.png" alt="" />
                            <h6>Cos</h6>
                        </div>
                    </Link>
                    <Link to="/favorite">
                        <div className="favorite">
                            {/* <img src="" alt="" /> */}
                            <img src="./src/assets/favicons/heart.png" alt="" />
                            <h6>Favorite</h6>
                        </div>
                    </Link>
                    <Link to="account">
                        <div className="account">
                            {/* <img src="" alt="" /> */}
                            <img src="./src/assets/favicons/user.png" alt="filter" />
                            <h6>Cont</h6>
                        </div>
                    </Link>
                </div>
            </nav>
            <div className="search">
                <input className="search-items" type="search" name="search-item" id="search-item" placeholder="Search..."/>
            </div>
        </div>
    )
}

export default NavBar;