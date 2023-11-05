import { fromJS } from 'immutable';
import TYPE from './type';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';
const { GET_ALL_ACCOUNTS, ADD_ACCOUNTS, UPDATE_ACCOUNTS, CHANGE_PASSWORD_ACCOUNTS, CHANGE_ACTIVATION, DELETE_ACCOUNTS } = TYPE;

const initialState = fromJS({
    listAccounts: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
    isFetching: false,
    success: false,
    error: false,
    refreshing: false,
    isCreateEr: false,
    messageAcc: null,
    successAdd: false,
    successUpd: false,
    successDlt: false,
})

const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ACCOUNTS: {
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        listAccounts: [],
                        pagination: null,
                        isFetching: true,
                        success: false,
                        successAdd: false,
                        successDlt: false,
                        successUpd: false,
                        error: false,
                        refreshing: false,
                        messageAcc: null,
                        isCreateEr: false,
                    })
                );
            };
            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;
                return state.merge(
                    fromJS({
                        listAccounts: data,
                        pagination: pagination,
                        isFetching: false,
                        success: true,
                        error: false,
                        successAdd: false,
                        successDlt: false,
                        successUpd: false,
                        refreshing: false,
                        messageAcc: null,
                        isCreateEr: false,
                    })
                );
            };
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        listAccounts: [],
                        pagination: null,
                        isFetching: false,
                        success: false,
                        successAdd: false,
                        successDlt: false,
                        successUpd: false,
                        error: true,
                        refreshing: false,
                        messageAcc: null,
                        isCreateEr: false,
                    })
                );
            };
        }
        case ADD_ACCOUNTS: {
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
                const message = action?.payload?.data?.message ?? 'createNewAccountError';
                return state.merge(
                    fromJS({
                        successAdd: false,
                        isCreateEr: true,
                        messageAcc: message,
                    })
                );
            };
        }
        case UPDATE_ACCOUNTS: {
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
                const message = action?.payload?.data?.message ?? 'updateAccountInfomationError';
                return state.merge(
                    fromJS({
                        successUpd: false,
                        isCreateEr: true,
                        messageAcc: message,
                    })
                );
            };
        }
        case CHANGE_PASSWORD_ACCOUNTS: {
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
                const message = action?.payload?.data?.message ?? 'updateAccountSecurityError';
                return state.merge(
                    fromJS({
                        successUpd: false,
                        isCreateEr: true,
                        messageAcc: message,
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
        case DELETE_ACCOUNTS: {
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

export default accountsReducer;