import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';
import PREFIX from '../../../redux/frefix';
import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';
import { getFilterListWarehouse } from '../../Auth/redux/action';

const { WAREHOUSE } = PREFIX;

const {
    GET_ALL_WAREHOUSE,
    CHANGE_ACTIVATION,
    ADD_WAREHOUSE,
    UPDATE_WAREHOUSE,
    DELETE_WAREHOUSE,
} = TYPE;

/**
 * @GET_ALL_WAREHOUSE
 */

const getListWHType = { prefix: WAREHOUSE, type: GET_ALL_WAREHOUSE };

export const getListWH = (params) => async (dispatch) => {
    const { current, pageSize } = params.options;
    const payload = params.filter;
    const api = API_URLS.WAREHOUSE.listWarehouse(current, pageSize);

    dispatch(isDispatchCalling(getListWHType));
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
        dispatch(isDispatchSuccess(getListWHType, actionPayload));
    }
    else dispatch(isDispatchFailed(getListWHType, error));
}

/**
 * @CHANGE_ACTIVATION
 */

const changeActivationType = { prefix: WAREHOUSE, type: CHANGE_ACTIVATION };

export const changeWHActivation = (_id, payload) => async (dispatch) => {
    const api = API_URLS.WAREHOUSE.setActivation(_id);
    dispatch(isDispatchCalling(changeActivationType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(isDispatchSuccess(changeActivationType, response));
    }
    else dispatch(isDispatchFailed(changeActivationType, error))
}

/**
 * @ADD_WAREHOUSE
 */

const addWarehouseType = { prefix: WAREHOUSE, type: ADD_WAREHOUSE };

export const addNewWarehouse = (payload) => async (dispatch) => {
    const api = API_URLS.WAREHOUSE.addWarehouse();
    dispatch(isDispatchCalling(addWarehouseType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListWarehouse());
        dispatch(isDispatchSuccess(addWarehouseType, response));
    }
    else dispatch(isDispatchFailed(addWarehouseType, error))
}

/**
 * @UPDATE_WAREHOUSE
 */

const updateWarehouseType = { prefix: WAREHOUSE, type: UPDATE_WAREHOUSE };

export const updWarehouse = (_id, payload) => async (dispatch) => {
    const api = API_URLS.WAREHOUSE.updateWarehouse(_id);
    dispatch(isDispatchCalling(updateWarehouseType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListWarehouse());
        dispatch(isDispatchSuccess(updateWarehouseType, response));
    }
    else dispatch(isDispatchFailed(updateWarehouseType, error))
}

/**
 * @DELETE_WAREHOUSE
 */

const deleteWarehouseType = { prefix: WAREHOUSE, type: DELETE_WAREHOUSE };

export const dltWarehouse = (_id, payload) => async (dispatch) => {
    const api = API_URLS.WAREHOUSE.deleteWarehouse(_id);
    dispatch(isDispatchCalling(deleteWarehouseType));
    const { response, error } = await apiCall({ ...api, payload });
    if (!error && response?.success === true) {
        dispatch(getFilterListWarehouse());
        dispatch(isDispatchSuccess(deleteWarehouseType, response));
    }
    else dispatch(isDispatchFailed(deleteWarehouseType, error))
}