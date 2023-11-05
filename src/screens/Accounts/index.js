import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../../routes';
import AccountsPage from './AccountsPage';

const Accounts = () => (
    <Routes>
        <Route path={ROUTER.ACCOUNTS.INDEX} element={<AccountsPage />} />
    </Routes>
);

export default Accounts;