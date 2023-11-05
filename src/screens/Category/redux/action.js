import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';

import PREFIX from '../../../redux/frefix';

import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';

import { getFilterListCategory } from '../../Auth/redux/action';

const { CATEGORY } = PREFIX;

const {
    GET_LIST_CATEGORY,
    ADD_NEW_CATEGORY,
    DELETE_CATEGORY,
    DELETE_LIST_CATEGORIES,
    UPDATE_CATEGORY,
} = TYPE;

/**
 * @GetListCategory
 */

const getListCategoryType = { prefix: CATEGORY, type: GET_LIST_CATEGORY };

export const getListCategory = (params) => async (dispatch) => {
    const { current, pageSize } = params.options;
    const payload = params.filter;
    const api = API_URLS.CATEGORY.getListCategory(current, pageSize);

    dispatch(isDispatchCalling(getListCategoryType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        const actionPayload = {
            data: response.data,
            pagination: {
                current: response.pagination.page,
                pageSize: response.pagination.limit,
                total: response.pagination.totalData,
            },
        }
        dispatch(isDispatchSuccess(getListCategoryType, actionPayload));
    }
    else dispatch(isDispatchFailed(getListCategoryType, error));
}

/**
 * @AddNewCategory
 */

const addNewCategoryType = { prefix: CATEGORY, type: ADD_NEW_CATEGORY };

export const addNewCategory = (payload) => async (dispatch) => {
    const api = API_URLS.CATEGORY.addNewCategory();

    dispatch(isDispatchCalling(addNewCategoryType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        dispatch(getFilterListCategory());
        dispatch(isDispatchSuccess(addNewCategoryType, response));
    }
    else dispatch(isDispatchFailed(addNewCategoryType, error));
}

/**
 * @DeleteCategory
 */

const deleteCategoryType = { prefix: CATEGORY, type: DELETE_CATEGORY };

export const deleteCategory = (id) => async (dispatch) => {
    const api = API_URLS.CATEGORY.deleteCategory(id);
    dispatch(isDispatchCalling(deleteCategoryType));
    const { response, error } = await apiCall({ ...api });

    if (response) {
        dispatch(getFilterListCategory());
        dispatch(isDispatchSuccess(deleteCategoryType, response));
    }
    else dispatch(isDispatchFailed(deleteCategoryType, error));
}

/**
 * @DeleteListCategories
 */

const deleteListCategoriesType = { prefix: CATEGORY, type: DELETE_LIST_CATEGORIES };

export const deleteListCategories = (listId) => async (dispatch) => {
    const payload = {
        listId
    }
    const api = API_URLS.CATEGORY.deleteListCategories();
    dispatch(isDispatchCalling(deleteListCategoriesType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        dispatch(getFilterListCategory());
        dispatch(isDispatchSuccess(deleteListCategoriesType, response));
    }
    else dispatch(isDispatchFailed(deleteListCategoriesType, error));
}

const updateCategoryType = { prefix: CATEGORY, type: UPDATE_CATEGORY };

export const updateCategory = (id, payload) => async (dispatch) => {
    const api = API_URLS.CATEGORY.updateCategory(id);
    dispatch(isDispatchCalling(updateCategoryType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        dispatch(getFilterListCategory());
        dispatch(isDispatchSuccess(updateCategoryType, response));
    }
    else dispatch(isDispatchFailed(updateCategoryType, error));
}