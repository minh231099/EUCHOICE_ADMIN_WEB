import { fromJS } from 'immutable';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';
import TYPE from './type';

const {
    GET_LIST_ORDER,
    CHANGE_ORDER_STATUS_TO_SHIPPING,
    CANCEL_LIST_ORDER,
    CHANGE_ORDER_STATUS_TO_PACKING,
} = TYPE;

const initialState = fromJS({
    orders: [],
    error: false,
    isFetching: false,
    changeStatus: '',
    errorMessage: '',
    cancelStatus: '',
    updateStatus: '',
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
});

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_ORDER:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        orders: [],
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        orders: data,
                        pagination: pagination,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        orders: [],
                    })
                );
            }
        case CHANGE_ORDER_STATUS_TO_SHIPPING:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        changeStatus: 'changing',
                        error: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        changeStatus: 'success',
                        error: false,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        changeStatus: 'failed',
                        error: true,
                    })
                );
            }
        case CANCEL_LIST_ORDER:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        cancelStatus: 'canceling',
                        error: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        cancelStatus: 'success',
                        error: false,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        cancelStatus: 'failed',
                        error: true,
                    })
                );
            }
        case CHANGE_ORDER_STATUS_TO_PACKING:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        changeStatus: 'changing',
                        error: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        changeStatus: 'success',
                        error: false,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        changeStatus: 'failed',
                        error: true,
                    })
                );
            }
        default:
            return state;
    }
};

export default orderReducer;
