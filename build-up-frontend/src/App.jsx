import React from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './pages/global/Navbar';
import { ProductDescription } from './pages/product_description/ProductDescription';
import { ProductCheckout } from './pages/product_checkout/ProductCheckout';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
