import { fromJS } from 'immutable';
import TYPE from './type';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';

const {
    GET_ALL_PROVIDER,
    CHANGE_ACTIVATION_PROVIDER,
    ADD_PROVIDER,
    UPDATE_PROVIDER,
    DELETE_PROVIDER,
} = TYPE

const initialState = fromJS({
    listProvider: [],
    isFetching: false,
    success: false,
    successAdd: false,
    successUpd: false,
    successDlt: false,
    isCreateEr: false,
    refreshing: false,
    messageProv: null,
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
})

const providerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROVIDER: {
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        listProvider: [],
                        pagination: null,
                        isFetching: true,
                        success: false,
                        successAdd: false,
                        successUpd: false,
                        successDlt: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageProv: null,
                    })
                );
            };
            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;
                return state.merge(
                    fromJS({
                        listProvider: data,
                        pagination: pagination,
                        isFetching: false,
                        success: true,
                        successAdd: false,
                        successUpd: false,
                        successDlt: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageProv: null,
                    })
                );
            };
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        listProvider: [],
                        pagination: null,
                        isFetching: false,
                        success: false,
                        successAdd: false,
                        successUpd: false,
                        successDlt: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageProv: null,
                    })
                );
            };
        }
        case CHANGE_ACTIVATION_PROVIDER: {
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
        case ADD_PROVIDER: {
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
                const message = action?.payload?.message ?? 'createNewProviderError';
                return state.merge(
                    fromJS({
                        successAdd: false,
                        isCreateEr: true,
                        messageProv: message,
                    })
                );
            };
        }
        case UPDATE_PROVIDER: {
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
                const message = action?.payload?.message ?? 'updateProviderError';
                return state.merge(
                    fromJS({
                        successUpd: false,
                        isCreateEr: true,
                        messageProv: message,
                    })
                );
            };
        }
        case DELETE_PROVIDER: {
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

export default providerReducer;