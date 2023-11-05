import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import BannerPage from './BannerPage';

const Banners = () => (
    <Routes>
        <Route path={ROUTER.BANNER.INDEX} element={<BannerPage />} />
    </Routes>
);

export default Banners;