import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import NavBar from './components/NavBar';
import PageRoutes  from './router'
import { ItemProvider }  from './features/Context/ItemContext';
import Footer from './components/Footer';
import { PriceOrderContextProvider } from './features/Context/PriceOrderContext';
import { ItemsOrderContextProvider } from './features/Context/ItemsOrderContext';
import { CookiesProvider } from 'react-cookie';
import './App.css'

function App() {

  return (
    <CookiesProvider>
      <Router>
        <ItemProvider>
          <PriceOrderContextProvider>
            <ItemsOrderContextProvider>
              <NavBar />
              <PageRoutes />
              <Footer />
            </ItemsOrderContextProvider>
          </PriceOrderContextProvider>
        </ItemProvider>
      </Router>
    </CookiesProvider>
  );
}

export default App
