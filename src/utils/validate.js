// import moment from 'moment';
import moment from 'moment-timezone';

export const localeDate = (date) => {
  if (date) {
    return moment(date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
  }
  return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
};

export const localeDateTime = (date) => {
  if (date) {
    return moment(date).tz('Asia/Ho_Chi_Minh').format('HH:mm:ss ~ YYYY-MM-DD');
  }
  return moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss ~ YYYY-MM-DD');
};

export const phoneNumberFomart = (phoneNumber) => {
  if (phoneNumber && phoneNumber.length === 10) {
    return phoneNumber.slice(1);
  }
  if (phoneNumber && phoneNumber.length === 11) {
    return phoneNumber.substr(2);
  }
  if (phoneNumber && phoneNumber.length === 12) {
    return phoneNumber.substr(3);
  }
  return phoneNumber;
};

export const phoneNumberRender = (phoneNumber = null) => {
  if (phoneNumber && phoneNumber.length === 9) {
    return '0' + phoneNumber;
  }
  if (phoneNumber && phoneNumber.length === 11) {
    return '0' + phoneNumber.substr(2);
  }
  return phoneNumber;
};
