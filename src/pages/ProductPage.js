import React from 'react';
import { useParams } from 'react-router-dom';
import NoProduct from './NoProductPage';
import productFactory from '../features/product/productFactory';

export default function ProductPage() {
    const params = useParams();
    if (isNaN(params.id)) return <NoProduct />;

    const productID = Number(params.id);
    const Product = productFactory({ itemID: productID });

    return <Product />;
};