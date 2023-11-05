import { combineReducers } from 'redux-immutable';
import layoutReducer from '../screens/Layout/redux/reducer';
import authReducer from '../screens/Auth/redux/reducer';
import loginReducer from '../screens/Login/redux/reducer';
import categoryReducer from '../screens/Category/redux/reducer';
import accountsReducer from '../screens/Accounts/redux/reducer';
import productReducer from '../screens/Product/redux/reducer';
import warehouseReducer from '../screens/Warehouse/redux/reducer';
import providerReducer from '../screens/Provider/redux/reducer';
import orderReducer from '../screens/Order/redux/reducer';
import bannersReducer from '../screens/Banner/redux/reducer';
import aboutReducer from '../screens/About/redux/reducer';
import blogReducer from '../screens/Blogs/redux/reducer';

export default combineReducers({
  layoutReducer,
  authReducer,
  loginReducer,
  categoryReducer,
  accountsReducer,
  productReducer,
  warehouseReducer,
  providerReducer,
  orderReducer,
  bannersReducer,
  aboutReducer,
  blogReducer,
});
