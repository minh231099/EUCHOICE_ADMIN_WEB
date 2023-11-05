import { API_URLS } from '../../../config/api';
import { apiCall } from '../../../utils/apiCall';
import PREFIX from '../../../redux/frefix';
import TYPE from './type';
import {
    isDispatchCalling,
    isDispatchSuccess,
    isDispatchFailed,
} from '../../../helpers/dispatchDedicate';

const { ABOUT } = PREFIX;

const { EDIT_PROFILE, GET_PROFILE } = TYPE

const editProfileType = { prefix: ABOUT, type: EDIT_PROFILE };

export const editProfile = (htmlString) => async (dispatch) => {
    const payload = { htmlString }
    const api = API_URLS.ABOUT.editWebProfile();

    dispatch(isDispatchCalling(editProfileType));

    const { response, error } = await apiCall({ ...api, payload });

    if (response) {
        dispatch(isDispatchSuccess(editProfileType, response.data));
    } else {
        dispatch(isDispatchFailed(editProfileType, error));
    }
}

const getProfileType = { prefix: ABOUT, type: GET_PROFILE };

export const getProfile = () => async (dispatch) => {
    const api = API_URLS.ABOUT.getWebProfile();

    dispatch(isDispatchCalling(getProfileType));

    const { response, error } = await apiCall({ ...api });

    if (response) {
        dispatch(isDispatchSuccess(getProfileType, response.data));
    } else dispatch(isDispatchFailed(getProfileType, error));
} 