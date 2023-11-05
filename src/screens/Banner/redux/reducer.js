import { fromJS } from 'immutable';
import TYPE from './type';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';
const { GET_ALL_BANNER_MAIN, UPDATE_ORDER_BANNER, CHANGE_ACTIVATION, SET_SHOW, UPLOAD_BANNER, DELETE_BANNER, UPDATE_BANNER } = TYPE;

const initialState = fromJS({
    listBanner: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
    isFetching: false,
    success: false,
    error: false,
    successAdd: false,
    successDlt: false,
    successUpd: false,
    isCreateEr: false,
    refreshing: false,
    messageBN: null,
})

const bannersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BANNER_MAIN: {
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        listBanner: [],
                        pagination: null,
                        isFetching: true,
                        success: false,
                        error: false,
                        successAdd: false,
                        successDlt: false,
                        successUpd: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageBN: null,
                    })
                );
            };
            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;
                const data1 = data.map((item, index) => {
                    let date1 = new Date();
                    let date2 = new Date(item.expired);
                    if (date1 > date2) {
                        return {
                            color: '#color-table-bold',
                            key: index + 1,
                            ...item
                        }
                    }
                    else {
                        return {
                            key: index + 1,
                            ...item
                        }
                    }

                })
                return state.merge(
                    fromJS({
                        listBanner: data1,
                        pagination: pagination,
                        isFetching: false,
                        success: true,
                        error: false,
                        successAdd: false,
                        successDlt: false,
                        successUpd: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageBN: null,
                    })
                );
            };
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        listBanner: [],
                        pagination: null,
                        isFetching: false,
                        success: false,
                        error: true,
                        successAdd: false,
                        successDlt: false,
                        successUpd: false,
                        isCreateEr: false,
                        refreshing: false,
                        messageBN: null,
                    })
                );
            };
        }
        case UPDATE_ORDER_BANNER: {
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
        case SET_SHOW: {
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
        case UPLOAD_BANNER: {
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
                const message = action?.payload?.message ?? 'createNewBannerError';
                return state.merge(
                    fromJS({
                        successAdd: false,
                        isCreateEr: true,
                        messageBN: message,
                    })
                );
            };
        }
        case DELETE_BANNER: {
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
        case UPDATE_BANNER: {
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
                const message = action?.payload?.message ?? 'updateBannerError';
                return state.merge(
                    fromJS({
                        successUpd: false,
                        isCreateEr: true,
                        messageBN: message,
                    })
                );
            };
        }
        default:
            return state;
    };
};

export default bannersReducer;