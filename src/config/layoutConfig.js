import SIDEBAR from './sidebar';
import logo from '../assets/images/logo.png';

export default {
  route: {
    path: '/',
    routes: SIDEBAR.ROUTES,
  },
  layout: 'top',
  title: 'HAGA86',
  logo: logo,
  fixSiderbar: true,
  navTheme: 'light',
  contentWidth: 'Fixed',
  splitMenus: false,
  fixedHeader: true,
  footerRender: false,
};
