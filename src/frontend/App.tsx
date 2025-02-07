import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import NavBar from './components/NavBar';
import PageRoutes  from './router'
import { ItemProvider }  from './features/Context/ItemContext';
import Footer from './components/Footer';
// import Promotions from './components/Promotion';
import { PriceOrderContextProvider } from './features/Context/PriceOrderContext';
import './App.css'
import { ItemsOrderContextProvider } from './features/Context/ItemsOrderContext';

function App() {

  return (
      <Router>
        <ItemProvider>
          <PriceOrderContextProvider>
            <ItemsOrderContextProvider>
              {/* <Promotions /> */}
              <NavBar />
              <PageRoutes />
              <Footer />
            </ItemsOrderContextProvider>
          </PriceOrderContextProvider>
        </ItemProvider>
      </Router>
  );
}

export default App
