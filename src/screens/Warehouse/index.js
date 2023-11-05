import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import WarehousePage from './WarehousePage';

const Warehouse = () => (
    <Routes>
        <Route path={ROUTER.WAREHOUSE.INDEX} element={<WarehousePage />} />
    </Routes>
);

export default Warehouse;