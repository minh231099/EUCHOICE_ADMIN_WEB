import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import BlogPage from './BlogPage';
import CreateNewBlogPage from './CreateNewBlogPage';

const Blogs = () => (
    <Routes>
        <Route path={ROUTER.BLOG.INDEX} element={<BlogPage />} />
        <Route path={ROUTER.BLOG.CREATE} element={<CreateNewBlogPage />} />
        <Route path={ROUTER.BLOG.UPDATE} element={<CreateNewBlogPage />} />
    </Routes>
);

export default Blogs;