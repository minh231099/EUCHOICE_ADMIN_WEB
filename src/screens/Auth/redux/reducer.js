import { fromJS } from 'immutable';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';
import TYPE from './type';
import cookiesTransaction from '../../../helpers/cookiesTransaction';
import cookiesVariables from '../../../constants/cookiesVariables';

const { setCookie, deleteCookie } = cookiesTransaction;
const { cktoken } = cookiesVariables;


const {
    LOGIN,
    INFO,
    GET_FILTER_LIST_CATEGORY,
    GET_FILTER_LIST_WAREHOUSE,
    GET_FILTER_LIST_ACCOUNT,
    GET_FILTER_LIST_PROVIDER,
    LOG_OUT,
} = TYPE;

const initialState = fromJS({
    isFetching: false,
    isActive: true,
    isAuthenticated: false,
    error: false,
    isVerify: false,
    errorMessage: '',
    newLogin: false,
    listFilterCategory: undefined,
    listFilterWarehouse: undefined,
    listFilterAccount: undefined,
    listFilterProvider: undefined,
    getListFilterCategoryError: false,
    getListFilterWarehouseError: false,
    getListFilterAccountError: false,
    getListFilterProviderError: false,
    userInfo: undefined,
    isGetInfoFetching: false,
});

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        isVerify: false,
                        isAuthenticated: false,
                        newLogin: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                const { token } = action.payload;
                setCookie(cktoken, token.split(' ')[1]);

                return state.merge(
                    fromJS({
                        isAuthenticated: true,
                        isFetching: false,
                        error: false,
                        isVerify: true,
                        newLogin: true,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                const { message } = action?.payload;

                return state.merge(
                    fromJS({
                        isAuthenticated: false,
                        isFetching: false,
                        isVerify: false,
                        error: true,
                        errorMessage: message,
                        newLogin: false,
                    })
                );
            }
        case LOG_OUT:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                deleteCookie(cktoken);

                return state.merge(
                    fromJS({
                        isAuthenticated: false,
                        isFetching: false,
                        error: false,
                        isVerify: false,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                const { message } = action?.payload;

                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        errorMessage: message
                    })
                );
            }
        case INFO:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isGetInfoFetching: true,
                        error: false,
                        isVerify: false,
                        isAuthenticated: false,
                        userInfo: undefined,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                const data = action.payload;
                return state.merge(
                    fromJS({
                        isAuthenticated: true,
                        isGetInfoFetching: false,
                        error: false,
                        isVerify: true,
                        userInfo: data,
                        newLogin: false,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                const { message } = action.payload;
                deleteCookie(cktoken);
                return state.merge(
                    fromJS({
                        isAuthenticated: false,
                        isGetInfoFetching: false,
                        isVerify: false,
                        error: true,
                        errorMessage: message,
                        userInfo: undefined,
                    })
                );
            }
        case GET_FILTER_LIST_CATEGORY:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        listFilterCategory: undefined,
                        getListFilterCategoryError: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                const data = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        listFilterCategory: data,
                        getListFilterCategoryError: false,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        listFilterCategory: undefined,
                        getListFilterCategoryError: true,
                    })
                );
            }
        case GET_FILTER_LIST_WAREHOUSE:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        listFilterWarehouse: undefined,
                        getListFilterWarehouseError: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                const data = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        listFilterWarehouse: data,
                        getListFilterWarehouseError: false,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        listFilterWarehouse: undefined,
                        getListFilterWarehouseError: true,
                    })
                );
            }
        case GET_FILTER_LIST_ACCOUNT:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        listFilterAccount: undefined,
                        getListFilterAccountError: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                const data = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        listFilterAccount: data,
                        getListFilterAccountError: false,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        listFilterAccount: undefined,
                        getListFilterAccountError: true,
                    })
                );
            }
        case GET_FILTER_LIST_PROVIDER:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        listFilterProvider: undefined,
                        getListFilterProviderError: false,
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                const data = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        listFilterProvider: data,
                        getListFilterProviderError: undefined,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        listFilterProvider: undefined,
                        getListFilterProviderError: false,
                    })
                );
            }
        default:
            return state;
    }
};

export default authReducer;
