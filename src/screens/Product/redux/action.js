import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';
import PREFIX from '../../../redux/frefix';

import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';

const { PRODUCT } = PREFIX;

const {
    GET_LIST_PRODUCTS,
    ADD_NEW_PRODUCT,
    GET_PRODUCT_DETAILS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    UPLOAD_IMAGES_FOR_PRODUCT,
    DELETE_PRODUCT_IMAGE,
    ADD_UPDATE_FLASH_SALE,
} = TYPE;

/**
 * @GetListProducts
 */

const getListProductType = { prefix: PRODUCT, type: GET_LIST_PRODUCTS };

export const getListProducts = (params) => async (dispatch) => {
    const { current, pageSize } = params.options;
    const payload = params.filter;
    const api = API_URLS.PRODUCT.getListProduct(current, pageSize);

    dispatch(isDispatchCalling(getListProductType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        const actionPayload = {
            data: response.data,
            pagination: {
                current: response.pagination.page,
                pageSize: response.pagination.limit,
                total: response.pagination.totalData,
            },
        }
        dispatch(isDispatchSuccess(getListProductType, actionPayload));
    }
    else dispatch(isDispatchFailed(getListProductType, error));
}

const uploadImageForProductType = { prefix: PRODUCT, type: UPLOAD_IMAGES_FOR_PRODUCT }

export const uploadImageForProduct = (prodId, listImg) => async (dispatch) => {
    const api = API_URLS.PRODUCT.uploadImagesForProduct(prodId);
    dispatch(isDispatchCalling(uploadImageForProductType));
    let formData = new FormData();

    console.log(listImg);

    Array.from(listImg).forEach(img => {
        if (img.originFileObj)
            formData.append('file', img.originFileObj);
        else
            formData.append('file', img.name);
    });

    const { response, error } = await apiCall({ ...api, payload: formData, maxBodyLength: Infinity });

    if (response)
        dispatch(isDispatchSuccess(uploadImageForProductType, response.data));
    else dispatch(isDispatchFailed(uploadImageForProductType, error));
}

const deleteImageProductType = { prefix: PRODUCT, type: DELETE_PRODUCT_IMAGE }

export const deleteImageProduct = (productId, imageName) => async (dispatch) => {
    const api = API_URLS.PRODUCT.deleteImageProduct(productId);
    dispatch(isDispatchCalling(deleteImageProductType));
    const payload = {
        imageId: imageName,
    };

    const { response, error } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(deleteImageProductType, response.data));
    else dispatch(isDispatchFailed(deleteImageProductType, error));
}

const addNewProductType = { prefix: PRODUCT, type: ADD_NEW_PRODUCT };

export const addNewProduct = (payload) => async (dispatch) => {
    const api = API_URLS.PRODUCT.addNewProduct();
    dispatch(isDispatchCalling(addNewProductType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response)
        dispatch(isDispatchSuccess(addNewProductType, response.data));
    else dispatch(isDispatchFailed(addNewProductType, error));
}

const getProductDetailsType = { prefix: PRODUCT, type: GET_PRODUCT_DETAILS };

export const getProductDetails = (id) => async (dispatch) => {
    const api = API_URLS.PRODUCT.getProductDetails(id);
    dispatch(isDispatchCalling(getProductDetailsType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getProductDetailsType, response.data));
    else dispatch(isDispatchFailed(getProductDetailsType, error));
}

const updateProductType = { prefix: PRODUCT, type: UPDATE_PRODUCT };

export const updateProduct = (id, payload) => async (dispatch) => {
    const api = API_URLS.PRODUCT.updateProduct(id);

    dispatch(isDispatchCalling(updateProductType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(updateProductType, response));
    else dispatch(isDispatchFailed(updateProductType, error));
}

const deleteProductType = { prefix: PRODUCT, type: DELETE_PRODUCT };

export const deleteProduct = (id) => async (dispatch) => {
    const api = API_URLS.PRODUCT.deleteProduct(id);
    dispatch(isDispatchCalling(deleteProductType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(deleteProductType, response));
    else dispatch(isDispatchFailed(deleteProductType, error));
}

/**
 * @AddUpdateFlashSale
 */

const addUpdFSType = { prefix: PRODUCT, type: ADD_UPDATE_FLASH_SALE };

export const addUpdFS = (payload) => async (dispatch) => {
    const api = API_URLS.PRODUCT.addUpdFlashSale();
    dispatch(isDispatchCalling(addUpdFSType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        dispatch(isDispatchSuccess(addUpdFSType, response));
    }
    else dispatch(isDispatchFailed(addUpdFSType, error));
}