import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';

import PREFIX from '../../../redux/frefix';

import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';

const { AUTH } = PREFIX;

const {
    LOGIN,
    INFO,
    GET_FILTER_LIST_CATEGORY,
    GET_FILTER_LIST_WAREHOUSE,
    GET_FILTER_LIST_ACCOUNT,
    GET_FILTER_LIST_PROVIDER,
    LOG_OUT,
} = TYPE;

/**
 * @Login
 */

const loginType = { prefix: AUTH, type: LOGIN };

export const login = (loginInfo) => async (dispatch) => {
    const api = API_URLS.AUTH.login();
    const payload = {
        email: loginInfo.email,
        password: loginInfo.password,
    };
    dispatch(isDispatchCalling(loginType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(loginType, response.data));
    else dispatch(isDispatchFailed(loginType, error));
}

const infoType = { prefix: AUTH, type: INFO };

export const getUserInfoByToken = () => async (dispatch) => {
    const api = API_URLS.AUTH.info();

    dispatch(isDispatchCalling(infoType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(infoType, response.data));
    else dispatch(isDispatchFailed(infoType, error));
}

const getFilterListCategoryType = { prefix: AUTH, type: GET_FILTER_LIST_CATEGORY }
export const getFilterListCategory = () => async (dispatch) => {
    const api = API_URLS.AUTH.getFilterListCategory();

    dispatch(isDispatchCalling(getFilterListCategoryType));
    const { response, error } = await apiCall({ ...api });

    if (response) {
        const listCate = response.data?.map((category) => ({ value: category._id, label: category.name }));
        dispatch(isDispatchSuccess(getFilterListCategoryType, listCate));
    } else {
        dispatch(isDispatchFailed(getFilterListCategoryType, error));
    }
}

const getFilterListWarehouseType = { prefix: AUTH, type: GET_FILTER_LIST_WAREHOUSE }
export const getFilterListWarehouse = () => async (dispatch) => {
    const api = API_URLS.AUTH.getFilterListWarehouse();

    dispatch(isDispatchCalling(getFilterListWarehouseType));
    const { response, error } = await apiCall({ ...api });

    if (response) {
        const listWarehouse = response.data?.map((warehouse) => ({ value: warehouse._id, label: warehouse.name }));
        dispatch(isDispatchSuccess(getFilterListWarehouseType, listWarehouse));
    } else {
        dispatch(isDispatchFailed(getFilterListWarehouseType, error));
    }
}

const getFilterListAccountType = { prefix: AUTH, type: GET_FILTER_LIST_ACCOUNT }
export const getFilterListAccount = () => async (dispatch) => {
    const api = API_URLS.AUTH.getFilterListAccount();

    dispatch(isDispatchCalling(getFilterListAccountType));
    const { response, error } = await apiCall({ ...api });

    if (response) {
        const listAccount = response.data?.filter(account => account.role === 'admin').map((account) => ({ value: account._id, label: account.email }));
        dispatch(isDispatchSuccess(getFilterListAccountType, listAccount));
    } else {
        dispatch(isDispatchFailed(getFilterListAccountType, error));
    }
}

const getFilterListProviderType = { prefix: AUTH, type: GET_FILTER_LIST_PROVIDER };
export const getFilterListProvider = () => async (dispatch) => {
    const api = API_URLS.AUTH.getFilterListProvider();

    dispatch(isDispatchCalling(getFilterListProviderType));
    const { response, error } = await apiCall({ ...api });

    if (response) {
        const listProvider = response.data?.map((provider) => ({ value: provider._id, label: provider.name }));
        dispatch(isDispatchSuccess(getFilterListProviderType, listProvider));
    } else {
        dispatch(isDispatchFailed(getFilterListProviderType, error));
    }
}

const logOutType = { prefix: AUTH, type: LOG_OUT };

export const logOut = () => async (dispatch) => {
    const api = API_URLS.AUTH.logOut();

    dispatch(isDispatchCalling(logOutType));
    const { response } = await apiCall({ ...api });

    if (response) {
        dispatch(isDispatchSuccess(logOutType));
    } else {
        dispatch(isDispatchFailed(logOutType));
    }
}