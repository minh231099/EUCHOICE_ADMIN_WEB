import PREFIX from '../redux/frefix';

export const isDispatchCalling = (prefixType, payload = null) => ({
  type: prefixType.type,
  meta: { prefix: [prefixType.prefix, PREFIX.API_CALLING] },
  payload,
});

export const isDispatchSuccess = (prefixType, payload = null) => ({
  type: prefixType.type,
  meta: { prefix: [prefixType.prefix, PREFIX.API_CALLED_SUCCESS] },
  payload,
});

export const isDispatchFailed = (prefixType, payload = null) => ({
  type: prefixType.type,
  meta: { prefix: [prefixType.prefix, PREFIX.API_CALLED_FAILURE] },
  payload,
});
