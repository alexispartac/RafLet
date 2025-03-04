import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import PageRoutes from './router'
import Footer from './components/Footer';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './App.css'

const queryClient = new QueryClient();

function App() {

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router>
            <NavBar />
            {/* <PageRoutes />
            <Footer /> */}
          </Router>
        </Provider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
