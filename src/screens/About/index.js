import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import AboutPage from './AboutPage';

const About = () => (
    <Routes>
        <Route path={ROUTER.ABOUT.INDEX} element={<AboutPage />} />
    </Routes>
);

export default About;