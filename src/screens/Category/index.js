import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import CategoryPage from './CategoryPage'

const Category = () => (
    <Routes>
        <Route path={ROUTER.CATEGORY.INDEX} element={<CategoryPage />} />
    </Routes>
);

export default Category;