import { fromJS } from 'immutable';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';
import TYPE from './type';

const {
    GET_LIST_CATEGORY,
    ADD_NEW_CATEGORY,
    DELETE_CATEGORY,
    DELETE_LIST_CATEGORIES,
    UPDATE_CATEGORY,
} = TYPE;

const initialState = fromJS({
    categories: [],
    error: false,
    isFetching: false,
    addNewStatus: '',
    errorMessage: '',
    deleteStatus: '',
    updateStatus: '',
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
});

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_CATEGORY:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        categories: [],
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        categories: data,
                        pagination: pagination,
                    })
                );
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        categories: [],
                    })
                );
            }

        case ADD_NEW_CATEGORY:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        addNewStatus: 'sending',
                        errorMessage: '',
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        addNewStatus: 'success',
                        errorMessage: '',
                    })
                );
            }

            if (isFailedApiCall(action)) {
                const { message } = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        errorMessage: message,
                        addNewStatus: 'fail',
                    })
                );
            }

        case DELETE_CATEGORY:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        deleteStatus: 'deleting',
                        errorMessage: '',
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        deleteStatus: 'success',
                        errorMessage: '',
                    })
                );
            }

            if (isFailedApiCall(action)) {
                const { message } = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        errorMessage: message,
                        deleteStatus: 'fail',
                    })
                );
            }

        case DELETE_LIST_CATEGORIES:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        deleteStatus: 'deleting',
                        errorMessage: '',
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        deleteStatus: 'success',
                        errorMessage: '',
                    })
                );
            }

            if (isFailedApiCall(action)) {
                const { message } = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        errorMessage: message,
                        deleteStatus: 'fail',
                    })
                );
            }

        case UPDATE_CATEGORY:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        updateStatus: 'updating',
                        errorMessage: '',
                    })
                );
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        updateStatus: 'success',
                        errorMessage: '',
                    })
                );
            }

            if (isFailedApiCall(action)) {
                const { message } = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        errorMessage: message,
                        updateStatus: 'fail',
                    })
                );
            }

        default:
            return state;
    }
};

export default categoryReducer;
