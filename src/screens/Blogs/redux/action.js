import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';
import PREFIX from '../../../redux/frefix';
import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';

const { BLOG } = PREFIX

const { UPLOAD_NEW_BLOG, LIST_BLOG, INFO_BLOG, UPDATE_BLOG, DELETE_BLOG } = TYPE;

const uploadNewBlogType = { prefix: BLOG, type: UPLOAD_NEW_BLOG };

export const uploadNewBlog = (title, content, image, brief) => async (dispatch) => {
    const payload = { title, content, image, brief}
    const api = API_URLS.BLOG.uploadNewBlog();

    dispatch(isDispatchCalling(uploadNewBlogType));

    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        dispatch(isDispatchSuccess(uploadNewBlogType, response.data));
    } else {
        dispatch(isDispatchFailed(uploadNewBlogType, error));
    }
}

const getListBlogType = { prefix: BLOG, type: LIST_BLOG };

export const getListBlog = (params) => async (dispatch) => {
    const { options } = params;
    const api = API_URLS.BLOG.getListBlog(options);
    dispatch(isDispatchCalling(getListBlogType));

    const { response, error } = await apiCall({ ...api });

    if (response) {
        dispatch(isDispatchSuccess(getListBlogType, response));
    } else {
        dispatch(isDispatchFailed(getListBlogType, error));
    }
}

const getInfoBlogType = { prefix: BLOG, type: INFO_BLOG };

export const getInfoBlog = (id) => async (dispatch) => {
    const api = API_URLS.BLOG.getInfoBlog(id);
    dispatch(isDispatchCalling(getInfoBlogType));

    const { response, error } = await apiCall({ ...api });

    if (response) {
        dispatch(isDispatchSuccess(getInfoBlogType, response.data));
    } else {
        dispatch(isDispatchFailed(getListBlogType, error));
    }
}

const updateBlogType = { prefix: BLOG, type: UPDATE_BLOG };

export const updateBlog = (id, payload) => async (dispatch) => {
    const api = API_URLS.BLOG.updateBlog(id);

    dispatch(isDispatchCalling(updateBlogType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        dispatch(isDispatchSuccess(updateBlogType, response.data));
    } else {
        dispatch(isDispatchFailed(updateBlogType, error));
    }
}

const deleteBlogType = { prefix: BLOG, type: DELETE_BLOG };

export const deleteBlog = (id) => async (dispatch) => {
    const api = API_URLS.BLOG.deleteBlog(id);

    dispatch(isDispatchCalling(deleteBlogType));
    const { response, error } = await apiCall({ ...api });

    if (response) {
        dispatch(isDispatchSuccess(deleteBlogType, response.data));
    } else {
        dispatch(isDispatchFailed(deleteBlogType, error));
    }
}