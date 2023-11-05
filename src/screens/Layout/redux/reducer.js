import { fromJS } from 'immutable';

const initialState = fromJS({
  currentPage: [''],
  notifications: [],
  title: '',
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default appReducer;