import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';
import PREFIX from '../../../redux/frefix';
import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';

const { BANNER } = PREFIX;

const {
    GET_ALL_BANNER_MAIN,
    UPDATE_ORDER_BANNER,
    CHANGE_ACTIVATION,
    SET_SHOW,
    UPLOAD_BANNER,
    DELETE_BANNER,
    UPDATE_BANNER
} = TYPE;

/**
 * @GET_ALL_BANNER
 */

const getListBannerType = { prefix: BANNER, type: GET_ALL_BANNER_MAIN };

export const getListBanner = (params, isTop, isPos) => async (dispatch) => {
    const { current, pageSize } = params.options;
    const payload = params.filter;
    const api = isTop ? API_URLS.BANNER.getListBanner(current, pageSize, '&top=true') : (isPos ? API_URLS.BANNER.getListBanner(current, pageSize, '&pos=true') : API_URLS.BANNER.getListBanner(current, pageSize, ''));
    dispatch(isDispatchCalling(getListBannerType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        const actionPayload = {
            data: response.data,
            pagination: {
                current: response.pagination.page,
                pageSize: response.pagination.limit,
                total: response.pagination.totalData,
            },
        }
        dispatch(isDispatchSuccess(getListBannerType, actionPayload));
    }
    else dispatch(isDispatchFailed(getListBannerType, error));
}

/**
 * @UPDATE_BANNER
 */

const updOrderBannerType = { prefix: BANNER, type: UPDATE_ORDER_BANNER };

export const updateOrderBanner = (listId) => async (dispatch) => {
    const payload = {
        listId: listId
    }
    const api = API_URLS.BANNER.updateOrder();
    dispatch(isDispatchCalling(updOrderBannerType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(updOrderBannerType, response));
    }
    else dispatch(isDispatchFailed(updOrderBannerType, error))
}

/**
 * @CHANGE_ACTIVATION_BANNER
 */

const changeActivationType = { prefix: BANNER, type: CHANGE_ACTIVATION };

export const changeBannerActivation = (_id, payload) => async (dispatch) => {
    const api = API_URLS.BANNER.setActivation(_id);
    dispatch(isDispatchCalling(changeActivationType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(changeActivationType, response));
    }
    else dispatch(isDispatchFailed(changeActivationType, error))
}

/**
 * @SET_SHOW_BANNER
 */

const setShowType = { prefix: BANNER, type: SET_SHOW };

export const setShowBanner = (_id, payload) => async (dispatch) => {
    const api = API_URLS.BANNER.setShow(_id);
    dispatch(isDispatchCalling(setShowType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(setShowType, response));
    }
    else dispatch(isDispatchFailed(setShowType, error))
}

/**
 * @UPLOAD_BANNER
 */

const uploadBannerType = { prefix: BANNER, type: UPLOAD_BANNER }

export const uploadBanner = (bannerPayload, listImg) => async (dispatch) => {
    const api = API_URLS.BANNER.uploadBanner();
    dispatch(isDispatchCalling(uploadBannerType));
    let formData = new FormData();
    Array.from(listImg).forEach(img => {
        formData.append('file', img.originFileObj);
    });
    for (const [key, value] of Object.entries(bannerPayload)) {
        formData.append(key, value)
    };
    const { response, error } = await apiCall({ ...api, payload: formData, maxBodyLength: Infinity });
    if (!error && response?.success === true)
        dispatch(isDispatchSuccess(uploadBannerType, response));
    else dispatch(isDispatchFailed(uploadBannerType, error));
}

/**
 * @DELETE_BANNER
 */

const deleteBannerType = { prefix: BANNER, type: DELETE_BANNER };

export const dltBanner = (_id, payload) => async (dispatch) => {
    const api = API_URLS.BANNER.deleteBanner(_id);
    dispatch(isDispatchCalling(deleteBannerType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(deleteBannerType, response));
    }
    else dispatch(isDispatchFailed(deleteBannerType, error))
}

/**
 * @UPDATE_BANNER
 */

const updateBannerType = { prefix: BANNER, type: UPDATE_BANNER };

export const updBanner = (_id, payload) => async (dispatch) => {
    const api = API_URLS.BANNER.updateBanner(_id);
    dispatch(isDispatchCalling(updateBannerType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(updateBannerType, response));
    }
    else dispatch(isDispatchFailed(updateBannerType, error))
}