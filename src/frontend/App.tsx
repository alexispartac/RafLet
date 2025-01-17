import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import PageRoutes  from './router'
import { ItemProvider }  from './features/Context/ItemContext';

function App() {

  return (
      <Router>
        <ItemProvider>
          <NavBar />
          <PageRoutes />
        </ItemProvider>
      </Router>
  );
}

export default App
