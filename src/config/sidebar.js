import React from 'react';
import ROUTER from '../routes';
import {
  AppstoreOutlined,
  HomeOutlined,
  TeamOutlined,
  InboxOutlined,
  BankOutlined,
  AppstoreAddOutlined,
  ContainerOutlined,
  PictureOutlined,
  ProfileOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';

export default {
  ROUTES: [
    {
      key: 'home',
      path: ROUTER.HOME,
      icon: <HomeOutlined />,
    },
    {
      key: 'accounts',
      path: ROUTER.ACCOUNTS.INDEX,
      icon: <TeamOutlined />,
    },
    {
      key: 'category',
      path: ROUTER.CATEGORY.INDEX,
      icon: <AppstoreOutlined />,
    },
    {
      key: 'product',
      path: ROUTER.PRODUCT.INDEX,
      icon: <InboxOutlined />
    },
    {
      key: 'warehouse',
      path: ROUTER.WAREHOUSE.INDEX,
      icon: <BankOutlined />,
    },
    {
      key: 'provider',
      path: ROUTER.PROVIDER.INDEX,
      icon: <AppstoreAddOutlined />,
    },
    {
      key: 'order',
      path: ROUTER.ORDER.INDEX,
      icon: <ContainerOutlined />
    },
    {
      key: 'banner',
      path: ROUTER.BANNER.INDEX,
      icon: <PictureOutlined />
    },
    {
      key: 'about',
      path: ROUTER.ABOUT.INDEX,
      icon: <ProfileOutlined />
    },
    {
      key: 'blog',
      path: ROUTER.BLOG.INDEX,
      icon: <SnippetsOutlined />
    }
  ],
};