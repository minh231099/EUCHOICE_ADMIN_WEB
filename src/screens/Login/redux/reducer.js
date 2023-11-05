import { fromJS } from 'immutable';

const initialState = fromJS({
});

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
export default loginReducer;