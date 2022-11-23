import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from './pages/NotFoundPage';
import About from './pages/AboutPage';
import Cart from './components/Cart';
import Catalog from './pages/CatalogPage';
import FindProduct from './components/FindProduct';
import Main from './pages/MainPage';
import Contacts from './pages/ContactsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import "./css/font-awesome.min.css";
import "./css/bootstrap.min.css";
import "./css/style.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={ <Main /> } />
        <Route path="/catalog" exact element={ <Catalog /> } />
        <Route path="/about" exact element={ <About /> } />
        <Route path="/contacts" exact element={ <Contacts /> } />
        <Route path="/products/:id" exact element={ <FindProduct /> } />
        <Route path="/cart" exact element={ <Cart /> } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;