import moment from 'moment-timezone';

export const localeDate = (date) => {
    if (date) {
        return moment(date).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY');
    }
    return moment().tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY');
};

export const localeDateTime = (date) => {
    if (date) {
        return moment(date).tz('Asia/Ho_Chi_Minh').format('HH:mm DD-MM-YYYY');
    }
    return moment().tz('Asia/Ho_Chi_Minh').format('HH:mm DD-MM-YYYY');
};