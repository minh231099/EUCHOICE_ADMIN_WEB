import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import ProductPage from './ProductPage.js'
import AddNewProductPage from './AddNewProductPage';
import UpdateProductPage from './UpdateProductPage';

const Product = () => (
    <Routes>
        <Route path={ROUTER.PRODUCT.INDEX} element={<ProductPage />} />
        <Route path={ROUTER.PRODUCT.ADD_NEW} element={<AddNewProductPage />} />
        <Route path={ROUTER.PRODUCT.UPDATE} element={<UpdateProductPage />} />
    </Routes>
);

export default Product;