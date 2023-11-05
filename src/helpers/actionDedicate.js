import PREFIX from '../redux/frefix';

export const isCallingApi = (action) =>
  action.meta.prefix && action.meta.prefix.includes(PREFIX.API_CALLING);

export const isSuccessfulApiCall = (action) =>
  action.meta.prefix && action.meta.prefix.includes(PREFIX.API_CALLED_SUCCESS);

export const isFailedApiCall = (action) =>
  action.meta.prefix && action.meta.prefix.includes(PREFIX.API_CALLED_FAILURE);
