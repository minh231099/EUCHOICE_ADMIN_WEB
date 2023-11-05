import { fromJS } from 'immutable';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';
import TYPE from './type';

const {
    GET_LIST_PRODUCTS,
    GET_PRODUCT_DETAILS,
    ADD_NEW_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    UPLOAD_IMAGES_FOR_PRODUCT,
    DELETE_PRODUCT_IMAGE,
    ADD_UPDATE_FLASH_SALE,
} = TYPE;

const initialState = fromJS({
    products: [],
    error: false,
    isFetching: false,
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
    productDetails: {},
    updateStatus: '',
    deleteStatus: '',
    addNewStatus: '',
    addedIdProduct: null,
    deleteProductImageError: false,
    successFS: false,
    messageFS: null,
    addUpdFSError: false,
});

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_PRODUCTS:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        successFS: false,
                        error: false,
                        products: [],
                        messageFS: null,
                        addUpdFSError: false,
                    })
                )
            }

            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        products: data,
                        pagination: pagination,
                    })
                )
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        products: [],
                    })
                );
            }
        case GET_PRODUCT_DETAILS:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        productDetails: {},
                    })
                )
            }

            if (isSuccessfulApiCall(action)) {
                const data = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        productDetails: data,
                    })
                )
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        productDetails: {},
                    })
                );
            }
        case ADD_NEW_PRODUCT:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        addNewStatus: 'adding'
                    })
                )
            }

            if (isSuccessfulApiCall(action)) {
                const { _id } = action.payload;
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        addedIdProduct: _id,
                        addNewStatus: 'uploading',
                    })
                )
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        addNewStatus: 'fail',
                    })
                );
            }
        case UPDATE_PRODUCT:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        updateStatus: 'updating',
                    })
                )
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        updateStatus: 'uploading',
                    })
                )
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        updateStatus: 'fail',
                    })
                );
            }

        case DELETE_PRODUCT:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        isFetching: true,
                        error: false,
                        deleteStatus: 'deleting',
                    })
                )
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: false,
                        deleteStatus: 'success',
                    })
                )
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        isFetching: false,
                        error: true,
                        deleteStatus: 'fail',
                    })
                );
            }
        case UPLOAD_IMAGES_FOR_PRODUCT:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        addedIdProduct: null,
                        addNewStatus: 'uploading',
                        updateStatus: 'uploading',
                    })
                )
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        addedIdProduct: null,
                        addNewStatus: 'success',
                        updateStatus: 'success',
                    })
                )
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        addedIdProduct: null,
                        addNewStatus: 'fail uploading',
                        updateStatus: 'fail uploading',
                    })
                );
            }
        case DELETE_PRODUCT_IMAGE:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        deleteProductImageError: false,
                    })
                )
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        deleteProductImageError: false,
                    })
                )
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        deleteProductImageError: true,
                    })
                );
            }
        case ADD_UPDATE_FLASH_SALE:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        successFS: false,
                        addUpdFSError: false,
                    })
                )
            }

            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        successFS: true,
                        addUpdFSError: false,
                        messageFS: action?.payload?.message
                    })
                )
            }

            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        successFS: false,
                        addUpdFSError: true,
                    })
                );
            }
        default:
            return state;
    }
};

export default productReducer;
