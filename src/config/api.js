import cookiesTransaction from '../helpers/cookiesTransaction';
import cookiesVariables from '../constants/cookiesVariables';

const { getCookie } = cookiesTransaction;
const { cktoken, ckrftoken } = cookiesVariables;

const rftoken = getCookie(ckrftoken);

const HEADERS = {
  DEFAULT_HEADER: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  header: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${getCookie(cktoken)}`,
  }),
  header_form: () => ({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Authorization: `Bearer ${getCookie(cktoken)}`,
  }),
  jsonHeader: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: getCookie(cktoken),
    RefreshToken: rftoken,
  }),
  file_header: () => ({
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${getCookie(cktoken)}`,
  }),
};

export const API_URLS = {
  AUTH: {
    login: () => ({
      endPoint: 'v1/account/adminSignIn',
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
    }),
    info: () => ({
      endPoint: 'v1/account/info',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getFilterListCategory: () => ({
      endPoint: 'v1/category/list?all=true',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getFilterListWarehouse: () => ({
      endPoint: 'v1/warehouse/list?all=true',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getFilterListAccount: () => ({
      endPoint: 'v1/account/list?all=true',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getFilterListProvider: () => ({
      endPoint: 'v1/provider/list?all=true',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    logOut: () => ({
      endPoint: 'v1/account/signout',
      method: 'POST',
      headers: HEADERS.header(),
    })
  },
  ACCOUNTS: {
    listAcc: (page, limit) => ({
      endPoint: `v1/account/adminList?page=${page}&limit=${limit}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    addAcc: () => ({
      endPoint: 'v1/account/add',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updAcc: () => ({
      endPoint: 'v1/account/update',
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    adminChangePass: () => ({
      endPoint: 'v1/account/admin-changePassword',
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    setActivation: (_id) => ({
      endPoint: `v1/account/hide/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    delAcc: (_id) => ({
      endPoint: `v1/account/delete/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    })
  },
  CATEGORY: {
    getListCategory: (page, limit) => ({
      endPoint: `v1/category/adminList?page=${page}&limit=${limit}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    addNewCategory: () => ({
      endPoint: 'v1/category/add',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    deleteCategory: (categoryID) => ({
      endPoint: `v1/category/delete/${categoryID}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    deleteListCategories: () => ({
      endPoint: 'v1/category/delete-many',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateCategory: (categoryID) => ({
      endPoint: `v1/category/update/${categoryID}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
  },
  PRODUCT: {
    getListProduct: (page, limit) => ({
      endPoint: `v1/product/adminList?page=${page}&limit=${limit}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    addNewProduct: () => ({
      endPoint: 'v1/product/add',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    getProductDetails: (id) => ({
      endPoint: `v1/product/info/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    updateProduct: (id) => ({
      endPoint: `v1/product/update/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    deleteProduct: (id) => ({
      endPoint: `v1/product/delete/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    uploadImagesForProduct: (id) => ({
      endPoint: `v1/image/upload/product/${id}`,
      method: 'POST',
      headers: HEADERS.file_header(),
    }),
    deleteImageProduct: (productId) => ({
      endPoint: `v1/image/delete/product/${productId}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    addUpdFlashSale: () => ({
      endPoint: `v1/product/flash-sale`,
      method: 'POST',
      headers: HEADERS.header(),
    })
  },
  WAREHOUSE: {
    listWarehouse: (page, limit) => ({
      endPoint: `v1/warehouse/adminList?page=${page}&limit=${limit}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    setActivation: (_id) => ({
      endPoint: `v1/warehouse/hide/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    addWarehouse: () => ({
      endPoint: 'v1/warehouse/add',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateWarehouse: (_id) => ({
      endPoint: `v1/warehouse/update/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    deleteWarehouse: (_id) => ({
      endPoint: `v1/warehouse/delete/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
  },
  IMAGE: {
    uploadImagesForProduct: (productId) => ({
      endPoint: `v1/image/upload/product/${productId}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  PROVIDER: {
    getListProvider: (page, limit) => ({
      endPoint: `v1/provider/adminList?page=${page}&limit=${limit}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    addNewProvider: () => ({
      endPoint: 'v1/provider/add',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    deleteProvider: (providerID) => ({
      endPoint: `v1/provider/delete/${providerID}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    deleteManyProvider: () => ({
      endPoint: 'v1/provider/delete-many',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateProvider: (providerID) => ({
      endPoint: `v1/provider/update/${providerID}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    setActivationProvider: (providerID) => ({
      endPoint: `v1/provider/hide/${providerID}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
  },
  ORDER: {
    getListOrder: (page, limit) => ({
      endPoint: `v1/order/adminList?page=${page}&limit=${limit}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    changeOrderStatusToShipping: (id) => ({
      endPoint: `v1/order/shipping/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    cancelListOrders: () => ({
      endPoint: `v1/order/cancel-many`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    changeOrderStatusToPacking: (id) => ({
      endPoint: `v1/order/packing/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    })
  },
  BANNER: {
    getListBanner: (page, limit, top) => ({
      endPoint: `v1/banner/adminList?page=${page}&limit=${limit}${top}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    updateOrder: () => ({
      endPoint: `v1/banner/update-orders`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    setActivation: (_id) => ({
      endPoint: `v1/banner/hide/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    setShow: (_id) => ({
      endPoint: `v1/banner/always/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    uploadBanner: () => ({
      endPoint: `v1/image/upload/banner`,
      method: 'POST',
      headers: HEADERS.file_header(),
    }),
    deleteBanner: (_id) => ({
      endPoint: `v1/banner/delete/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    updateBanner: (_id) => ({
      endPoint: `v1/banner/update/${_id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
  },
  ABOUT: {
    editWebProfile: () => ({
      endPoint: `v1/config/editProfile`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    getWebProfile: () => ({
      endPoint: `v1/config/profile`,
      method: 'GET',
      headers: HEADERS.header(),
    })
  },
  BLOG: {
    uploadNewBlog: () => ({
      endPoint: `v1/news/add`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    getListBlog: (pagination) => ({
      endPoint: `v1/news/adminList?page=${pagination.current}&limit=${pagination.pageSize}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getInfoBlog: (id) => ({
      endPoint: `v1/news/info/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    updateBlog: (id) => ({
      endPoint: `v1/news/update/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    deleteBlog: (id) => ({
      endPoint: `v1/news/delete/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    })
  }
};
