import React, { useCallback } from 'react';
// import { Layout } from 'antd';
import ProLayout from '@ant-design/pro-layout';
import layoutConfig from '../../config/layoutConfig';
import { Link } from 'react-router-dom';
import WithLocale from '../../hoc/WithLocale';
import { useNavigate } from 'react-router-dom';
import WithAuthenrization from '../../hoc/WithAuthenrization';
import WithAuthentication from '../../hoc/WithAuthentication';

// Component
import LanguageToggleButton from '../../components/LanguageToggleButton';

// Page
import Home from '../Home';
import Category from '../Category';

import { useTranslation } from 'react-i18next';
import Accounts from '../Accounts';
import Product from '../Product';
import Warehouse from '../Warehouse';
import Provider from '../Provider';
import Order from '../Order';
import { UserWidget } from './components/UserWidget';
import Banners from '../Banner';
import About from '../About';
import Blogs from '../Blogs';

const AppLayout = () => {
  const navigate = useNavigate()

  const { t } = useTranslation();
  const renderLayout = () => {
    const layout = { ...layoutConfig };
    if (layout) {
      layout.route.routes.forEach(val => {
        val.name = t(val.key);
      });
    }
    return layout;
  }

  const handleOnClick = useCallback(() => {
    navigate('/'), [navigate]
  })

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        className='custom-layout'
        {...renderLayout()}
        menuFooterRender={false}
        menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
        rightContentRender={() => (
          <div style={{ color: '#fff', marginRight: 50, display: 'flex' }}>
            <LanguageToggleButton />
            <div style={{ marginLeft: 30 }}>
              <UserWidget />
            </div>
          </div>
        )}
        onMenuHeaderClick={handleOnClick}
        headerStyle={{
          background: '#000',
        }}
      >
        <div style={{
          height: '100%'
        }}>
          <Home />
          <Accounts />
          <Category />
          <Product />
          <Warehouse />
          <Provider />
          <Order />
          <Banners />
          <About />
          <Blogs />
        </div>
      </ProLayout>
    </div>
  );
};

export default WithAuthenrization(true)(
  WithAuthentication(WithLocale(AppLayout))
);
