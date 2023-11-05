import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';

import PREFIX from '../../../redux/frefix';

import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';

const { ORDER } = PREFIX;

const {
    GET_LIST_ORDER,
    CHANGE_ORDER_STATUS_TO_SHIPPING,
    CANCEL_LIST_ORDER,
    CHANGE_ORDER_STATUS_TO_PACKING,
} = TYPE;

/**
 * @GetListOrder
 */

const getListOrderType = { prefix: ORDER, type: GET_LIST_ORDER };

export const getListOrder = (params) => async (dispatch) => {
    const { current, pageSize } = params.options;
    const payload = params.filter;
    const api = API_URLS.ORDER.getListOrder(current, pageSize);

    dispatch(isDispatchCalling(getListOrderType));
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
        dispatch(isDispatchSuccess(getListOrderType, actionPayload));
    }
    else dispatch(isDispatchFailed(getListOrderType, error));
}

/**
 *@ChangeOrderStatusToShipping
 */

const ChangeOrderStatusToShipping = { prefix: ORDER, type: CHANGE_ORDER_STATUS_TO_SHIPPING }

export const changeOrderStatusToShipping = (id) => async (dispatch) => {
    const api = API_URLS.ORDER.changeOrderStatusToShipping(id);

    dispatch(isDispatchCalling(ChangeOrderStatusToShipping));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(ChangeOrderStatusToShipping));
    else dispatch(isDispatchFailed(ChangeOrderStatusToShipping));
}

/**
 * @CancelListOrders
 */

const CancelListOrdersType = { prefix: ORDER, type: CANCEL_LIST_ORDER }

export const cancelListOrders = (listId) => async (dispatch) => {
    const api = API_URLS.ORDER.cancelListOrders();
    const payload = {
        listId,
    }
    dispatch(isDispatchCalling(CancelListOrdersType));
    const { response } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(CancelListOrdersType));
    else dispatch(isDispatchFailed(CancelListOrdersType));
}

/**
 *@ChangeOrderStatusToPacking
 */

const ChangeOrderStatusToPacking = { prefix: ORDER, type: CHANGE_ORDER_STATUS_TO_PACKING }

export const changeOrderStatusToPacking = (id) => async (dispatch) => {
    const api = API_URLS.ORDER.changeOrderStatusToPacking(id);

    dispatch(isDispatchCalling(ChangeOrderStatusToPacking));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(ChangeOrderStatusToPacking));
    else dispatch(isDispatchFailed(ChangeOrderStatusToPacking));
}