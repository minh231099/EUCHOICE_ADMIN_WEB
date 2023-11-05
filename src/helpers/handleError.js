import { notification } from 'antd';
import { loginWithToken, logOut } from '../screens/Auth/redux/action';

export default (error, action, dispatchFunction) => async (dispatch) => {
  let message = error.message;
  let hasError = true;
  if (error.code === '401') {
    const isValid = await dispatch(loginWithToken());
    hasError = !isValid;
    if (isValid) await dispatchFunction();
    else {
      message = 'Login session has expired';
      await dispatch(logOut());
    }
  } else if (error.code === '403')
    message = `Do not have permission to ${action}`;

  if (hasError) {
    notification.error({
      message: message,
    });
  }
};
