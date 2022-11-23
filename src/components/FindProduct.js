import React from 'react';
import { useParams } from 'react-router-dom';
import {  } from '../features/product/productSlice';
import NoProduct from '../pages/NoProductPage';
import Product from '../pages/ProductPage';
import { useDispatch } from 'react-redux';

export default function FindProduct() {
    const params = useParams();

    const dispatch = useDispatch();
  
    const productID = Number(params.id);
    //const Product = withRedux(Product);

    if (params?.id === undefined) return <NoProduct />;
    
    return (
      <Product
        />
    );
};

/*
        fetchAction={ fetchServiceRequest }
        reloadAction={ reloadService }
        fetchUrl={ `${process.env.REACT_APP_SERVICE_URL}/${serviceID}` }
        selector={ selectService }
        returnLink="/"
*/