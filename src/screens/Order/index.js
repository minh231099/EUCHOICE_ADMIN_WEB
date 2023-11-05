import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import OrderPage from './OrderPage';

const Order = () => (
    <Routes>
        <Route path={ROUTER.ORDER.INDEX} element={<OrderPage />} />
    </Routes>
);

export default Order;