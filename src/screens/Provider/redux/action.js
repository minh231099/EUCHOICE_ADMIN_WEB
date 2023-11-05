import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';
import PREFIX from '../../../redux/frefix';
import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';
import { getFilterListProvider } from '../../Auth/redux/action';

const { PROVIDER } = PREFIX;

const {
    GET_ALL_PROVIDER,
    CHANGE_ACTIVATION_PROVIDER,
    ADD_PROVIDER,
    UPDATE_PROVIDER,
    DELETE_PROVIDER,
} = TYPE

/**
 * @GET_ALL_PROVIDER
 */

const getListProviderType = { prefix: PROVIDER, type: GET_ALL_PROVIDER };

export const getListProvider = (params) => async (dispatch) => {
    const { current, pageSize } = params.options;
    const payload = params.filter;
    const api = API_URLS.PROVIDER.getListProvider(current, pageSize);

    dispatch(isDispatchCalling(getListProviderType));
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
        dispatch(isDispatchSuccess(getListProviderType, actionPayload));
    }
    else dispatch(isDispatchFailed(getListProviderType, error));
}

/**
 * @CHANGE_ACTIVATION_PROVIDER
 */

const changeActivationType = { prefix: PROVIDER, type: CHANGE_ACTIVATION_PROVIDER };

export const changeProviderActivation = (_id, payload) => async (dispatch) => {
    const api = API_URLS.PROVIDER.setActivationProvider(_id);
    dispatch(isDispatchCalling(changeActivationType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(changeActivationType, response));
    }
    else dispatch(isDispatchFailed(changeActivationType, error))
}

/**
 * @ADD_PROVIDER
 */

const addProviderType = { prefix: PROVIDER, type: ADD_PROVIDER };

export const addNewProvider = (payload) => async (dispatch) => {
    const api = API_URLS.PROVIDER.addNewProvider();
    dispatch(isDispatchCalling(addProviderType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListProvider())
        dispatch(isDispatchSuccess(addProviderType, response));
    }
    else dispatch(isDispatchFailed(addProviderType, error))
}

/**
 * @UPDATE_PROVIDER
 */

const updateProviderType = { prefix: PROVIDER, type: UPDATE_PROVIDER };

export const updProvider = (_id, payload) => async (dispatch) => {
    const api = API_URLS.PROVIDER.updateProvider(_id);
    dispatch(isDispatchCalling(updateProviderType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListProvider());
        dispatch(isDispatchSuccess(updateProviderType, response));
    }
    else dispatch(isDispatchFailed(updateProviderType, error));
}

/**
 * @DELETE_PROVIDER
 */

const deleteProviderType = { prefix: PROVIDER, type: DELETE_PROVIDER };

export const dltProvider = (_id, payload) => async (dispatch) => {
    const api = API_URLS.PROVIDER.deleteProvider(_id);
    dispatch(isDispatchCalling(deleteProviderType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListProvider());
        dispatch(isDispatchSuccess(deleteProviderType, response));
    }
    else dispatch(isDispatchFailed(deleteProviderType, error));
}