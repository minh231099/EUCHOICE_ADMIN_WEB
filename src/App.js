import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ROUTER from './routes';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import AppLayout from './screens/Layout';
import LoginScreen from './screens/Login';

setConfig({
  showReactDomPatchNotification: false,
});

const App = () => (
  <div>
      <Routes>
        <Route path={ROUTER.INDEX} element={<AppLayout />} />
        <Route exact path={ROUTER.LOGIN} element={<LoginScreen />} />
      </Routes>
  </div>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
