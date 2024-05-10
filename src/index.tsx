import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContextProvider } from './context/Firebase/Firebase';
import { ProductsContextProvider } from './context/Firebase/Products';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
    <FirebaseContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </FirebaseContextProvider>
    </BrowserRouter>
);
