import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import ProviderPage from './ProviderPage'

const Provider = () => (
    <Routes>
        <Route path={ROUTER.PROVIDER.INDEX} element={<ProviderPage />} />
    </Routes>
);

export default Provider;