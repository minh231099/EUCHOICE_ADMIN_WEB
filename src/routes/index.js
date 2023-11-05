const ROUTER = {
  INDEX: '/*',
  HOME: '/',
  LOGIN: '/login',
  CATEGORY: {
    INDEX: '/category',
  },
  ACCOUNTS: {
    INDEX: '/accounts',
  },
  PRODUCT: {
    INDEX: '/product',
    ADD_NEW: '/product/new',
    UPDATE: '/product/:id',
  },
  WAREHOUSE: {
    INDEX: '/warehouse',
  },
  PROVIDER: {
    INDEX: '/provider',
  },
  ORDER: {
    INDEX: '/order',
  },
  BANNER: {
    INDEX: '/banner',
  },
  ABOUT: {
    INDEX: '/about',
  },
  BLOG: {
    INDEX: '/blog',
    CREATE: '/blog/new',
    UPDATE: '/blog/:id',
  },
};
export default ROUTER;
