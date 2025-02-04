import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.tsx';
import Account from './components/Account.tsx';
import Favorite from './components/Favorite.tsx';
import Cart from './components/Cart.tsx';
import NotFound from './components/NotFound.tsx';
import Promotions from './components/Promotion.tsx';
import Man from './components/Man.tsx';
import Woman from './components/Woman.tsx';
import Admin from './components/Admin.tsx';
import SignIn from './components/SignIn.tsx';
import DetailsAccount from './components/DetailsAccount.tsx';
import MyDiscount from './components/MyDiscount.tsx';
import Item from './components/Item.tsx';
import PlacedOrder from './components/PlacedOrder.tsx';

const PageRoutes = () => {

    return (
        <Routes>
            <Route path="/admin" element={<Admin />} />

            <Route path="/" element={<Home />} />
                <Route path="/item/:id" element={<Item/>} />
            <Route path="/account" element={<Account/>} />
                <Route path="details-account" element={<DetailsAccount/>} />
                <Route path="my-discount" element={<MyDiscount/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/cart" element={<Cart />} />
                <Route path='/placed-order' element={<PlacedOrder />}/>

            <Route path="/promotions" element={<Promotions />} />
            <Route path="/man" element={<Man />} />
            <Route path="/woman" element={<Woman />} />

            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default PageRoutes;