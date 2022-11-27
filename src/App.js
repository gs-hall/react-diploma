import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from './pages/NotFoundPage';
import About from './pages/AboutPage';
import Catalog from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import Main from './pages/MainPage';
import Contacts from './pages/ContactsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import MainContainer from './components/MainContainer';
import "./css/font-awesome.min.css";
import "./css/bootstrap.min.css";
import "./css/style.css";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainContainer>
        <Routes>
          <Route path="/" exact element={ <Main /> } />
          <Route path="/catalog" exact element={ <Catalog /> } />
          <Route path="/about" exact element={ <About /> } />
          <Route path="/contacts" exact element={ <Contacts /> } />
          <Route path="/products/:id" exact element={ <ProductPage /> } />
          <Route path="/cart" exact element={ <CartPage /> } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MainContainer>
      <Footer />
    </BrowserRouter>
  );
};

export default App;