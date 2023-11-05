import { fromJS } from 'immutable';
import TYPE from './type';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';

const {
    UPLOAD_NEW_BLOG,
    LIST_BLOG,
    INFO_BLOG,
    UPDATE_BLOG,
} = TYPE;

const initialState = fromJS({
    successUpload: false,
    listBlog: [],
    error: false,
    infoBlog: undefined,
    isFetching: false,
    pagination: {
        page: 1,
        limit: 20,
    }
});

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_NEW_BLOG:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        successUpload: false,
                    })
                )
            }
            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        successUpload: true,
                    })
                )
            }
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        successUpload: false,
                    })
                )
            }
        case LIST_BLOG:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        listBlog: [],
                        error: false,
                        isFetching: true,
                        pagination: {
                            page: 1,
                            limit: 20,
                        }
                    })
                )
            }
            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;
                return state.merge(
                    fromJS({
                        listBlog: data,
                        error: false,
                        isFetching: false,
                        pagination: {
                            current: pagination.page,
                            pageSize: pagination.limit,
                        }
                    })
                )
            }
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        listBlog: [],
                        error: true,
                        isFetching: false,
                        pagination: {
                            page: 1,
                            limit: 20,
                        }
                    })
                )
            }
        case INFO_BLOG:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        infoBlog: undefined,
                        error: false,
                    })
                )
            }
            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        infoBlog: action.payload,
                        error: false,
                    })
                )
            }
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        infoBlog: undefined,
                        error: true,
                    })
                )
            }
        case UPDATE_BLOG:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        error: false,
                    })
                )
            }
            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        error: false,
                    })
                )
            }
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        error: true,
                    })
                )
            }
        default:
            return state;
    };
}

export default blogReducer;