import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
// import moment from 'moment';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import LocaleContext from './utils/locale';
import MainApp from './App';
import Locale from './locales';
import LOCAL_STORAGE from './config/localStorage';
import { ConfigProvider } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN';
import en_US from 'antd/lib/locale/en_US';
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';
import 'antd/dist/antd.min.css';
import 'antd/dist/antd.variable.min.css';
import './assets/sass/main.scss';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import translator from './constants/translator';

const colorTable = {
  primaryColor: '#007BFF',
  secondaryColor: '#6C757D',
  successColor: '#28A745',
  dangerColor: '#DC3545',
  warningColor: '#FFC107',
  infoColor: '#17A2B8',
  lightColor: '#F8F9FA',
  darkColor: '#343A40',
  backgroundColor: '#FFFFFF',
  textColor: '#333333',
  linkColor: '#007BFF',
  borderColor: '#CCCCCC',
};


ConfigProvider.config({
  theme: colorTable,
});

const locale = new Locale(
  localStorage.getItem(LOCAL_STORAGE.language)
    ? localStorage.getItem(LOCAL_STORAGE.language)
    : 'vn'
);
i18n.init({
  interpolation: { escapeValue: false }, // React already escapes by default
  lng: localStorage.getItem(LOCAL_STORAGE.language) ? localStorage.getItem(LOCAL_STORAGE.language) : 'vn',
  resources: translator,
});

const setLocale = {
  en: en_US,
  vn: vi_VN
};

const App = () => (
  <Provider store={store}>
    <LocaleContext.Provider value={locale}>
      <BrowserRouter>
        <ConfigProvider locale={localStorage.getItem(LOCAL_STORAGE.language) ? setLocale[localStorage.getItem(LOCAL_STORAGE.language)] : setLocale['vn']}>
          <I18nextProvider i18n={i18n}>
            <MainApp />
          </I18nextProvider>
        </ConfigProvider>
      </BrowserRouter>
    </LocaleContext.Provider>
  </Provider>
);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

