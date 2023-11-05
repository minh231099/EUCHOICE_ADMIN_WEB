import { fromJS } from 'immutable';
import TYPE from './type';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';
const { GET_ALL_WAREHOUSE, CHANGE_ACTIVATION, ADD_WAREHOUSE, UPDATE_WAREHOUSE, DELETE_WAREHOUSE } = TYPE;

const initialState = fromJS({
    listWarehouse: [],
    isFetching: false,
    success: false,
    successAdd: false,
    successUpd: false,
    successDlt: false,
    isCreateEr: false,
    refreshing: false,
    messageWH: null,
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
})

const warehouseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_WAREHOUSE: {
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        listWarehouse: [],
                        pagination: null,
                        isFetching: true,
                        success: false,
                        successAdd: false,
                        successUpd: false,
                        successDlt: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageWH: null,
                    })
                );
            };
            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;
                return state.merge(
                    fromJS({
                        listWarehouse: data,
                        pagination: pagination,
                        isFetching: false,
                        success: true,
                        successAdd: false,
                        successUpd: false,
                        successDlt: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageWH: null,
                    })
                );
            };
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        listWarehouse: [],
                        pagination: null,
                        isFetching: false,
                        success: false,
                        successAdd: false,
                        successUpd: false,
                        successDlt: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageWH: null,
                    })
                );
            };
        }
        case CHANGE_ACTIVATION: {
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({

                    })
                );
            };
            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({

                    })
                );
            };
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({

                    })
                );
            };
        }
        case ADD_WAREHOUSE: {
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        successAdd: false,
                        isCreateEr: false,
                    })
                );
            };
            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        successAdd: true,
                        refreshing: true,
                        isCreateEr: false,
                    })
                );
            };
            if (isFailedApiCall(action)) {
                const message = action?.payload?.message ?? 'createNewWarehouseError';
                return state.merge(
                    fromJS({
                        successAdd: false,
                        isCreateEr: true,
                        messageWH: message,
                    })
                );
            };
        }
        case UPDATE_WAREHOUSE: {
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        successUpd: false,
                        isCreateEr: false,
                    })
                );
            };
            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        successUpd: true,
                        refreshing: true,
                        isCreateEr: false,
                    })
                );
            };
            if (isFailedApiCall(action)) {
                const message = action?.payload?.message ?? 'updateWarehouseError';
                return state.merge(
                    fromJS({
                        successUpd: false,
                        isCreateEr: true,
                        messageWH: message,
                    })
                );
            };
        }
        case DELETE_WAREHOUSE: {
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        successDlt: false,
                    })
                );
            };
            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        successDlt: true,
                        refreshing: true,
                    })
                );
            };
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        successDlt: false,
                    })
                );
            };
        }
        default:
            return state;
    };
};

export default warehouseReducer;