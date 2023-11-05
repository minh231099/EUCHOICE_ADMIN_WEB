import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';
import PREFIX from '../../../redux/frefix';
import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';
import { getFilterListAccount } from '../../Auth/redux/action';

const { ACCOUNTS } = PREFIX;

const {
    GET_ALL_ACCOUNTS,
    ADD_ACCOUNTS,
    UPDATE_ACCOUNTS,
    CHANGE_PASSWORD_ACCOUNTS,
    CHANGE_ACTIVATION,
    DELETE_ACCOUNTS,
} = TYPE;

/**
 * @GET_ALL_ACCOUNT
 */

const getListAccType = { prefix: ACCOUNTS, type: GET_ALL_ACCOUNTS };

export const getListAcc = (params) => async (dispatch) => {
    const { current, pageSize } = params.options;
    const payload = params.filter;
    const api = API_URLS.ACCOUNTS.listAcc(current, pageSize);
    dispatch(isDispatchCalling(getListAccType));
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
        dispatch(isDispatchSuccess(getListAccType, actionPayload));
    }
    else dispatch(isDispatchFailed(getListAccType, error));
}

/**
 * @ADD_ACCOUNT
 */

const addAccType = { prefix: ACCOUNTS, type: ADD_ACCOUNTS };

export const addAcc = (payload) => async (dispatch) => {
    const api = API_URLS.ACCOUNTS.addAcc();
    dispatch(isDispatchCalling(addAccType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListAccount());
        dispatch(isDispatchSuccess(addAccType, response));
    }
    else dispatch(isDispatchFailed(addAccType, error))
}

/**
 * @UPDATE_ACCOUNT
 */

const updAccType = { prefix: ACCOUNTS, type: UPDATE_ACCOUNTS };

export const updAcc = (payload) => async (dispatch) => {
    const api = API_URLS.ACCOUNTS.updAcc();
    dispatch(isDispatchCalling(updAccType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListAccount());
        dispatch(isDispatchSuccess(updAccType, response));
    }
    else dispatch(isDispatchFailed(updAccType, error))
}

/**
 * @CHANGE_PASSWORD_ACCOUNT
 */

const changePassType = { prefix: ACCOUNTS, type: CHANGE_PASSWORD_ACCOUNTS };

export const changePassAcc = (payload) => async (dispatch) => {
    const api = API_URLS.ACCOUNTS.adminChangePass();
    dispatch(isDispatchCalling(changePassType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(changePassType, response));
    }
    else dispatch(isDispatchFailed(changePassType, error))
}

/**
 * @CHANGE_ACTIVATION
 */

const changeActivationType = { prefix: ACCOUNTS, type: CHANGE_ACTIVATION };

export const changeActivation = (_id, payload) => async (dispatch) => {
    const api = API_URLS.ACCOUNTS.setActivation(_id);
    dispatch(isDispatchCalling(changeActivationType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(changeActivationType, response));
    }
    else dispatch(isDispatchFailed(changeActivationType, error))
}

/**
 * @DELETE_ACCOUNTS
 */

const delAccType = { prefix: ACCOUNTS, type: DELETE_ACCOUNTS };

export const deleteAcc = (_id, payload) => async (dispatch) => {
    const api = API_URLS.ACCOUNTS.delAcc(_id);
    dispatch(isDispatchCalling(delAccType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListAccount());
        dispatch(isDispatchSuccess(delAccType, response));
    }
    else dispatch(isDispatchFailed(delAccType, error))
}