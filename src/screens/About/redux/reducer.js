import { fromJS } from 'immutable';
import TYPE from './type';
import {
    isCallingApi,
    isSuccessfulApiCall,
    isFailedApiCall,
} from '../../../helpers/actionDedicate';

const {
    EDIT_PROFILE,
    GET_PROFILE,
} = TYPE;

const initialState = fromJS({
    successEdit: false,
    htmlString: '',
});

const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        successEdit: false,
                    })
                )
            }
            if (isSuccessfulApiCall(action)) {
                return state.merge(
                    fromJS({
                        successEdit: true,
                    })
                )
            }
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        successEdit: false,
                    })
                )
            }

        case GET_PROFILE:
            if (isCallingApi(action)) {
                return state.merge(
                    fromJS({
                        htmlString: ''
                    })
                )
            }
            if (isSuccessfulApiCall(action)) {
                const { htmlString } = action.payload;
                return state.merge(
                    fromJS({
                        htmlString: htmlString,
                    })
                )
            }
            if (isFailedApiCall(action)) {
                return state.merge(
                    fromJS({
                        htmlString: '',
                    })
                )
            }
        default:
            return state;
    };
}

export default aboutReducer;