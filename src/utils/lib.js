import { grey, green, blue, red, orange } from '@ant-design/colors';
import moment from 'moment';

const priorityLevel = {
  GET: 0,
  POST: 1,
  PUT: 2,
  DELETE: 3,
};

export function colorMethod(method) {
  switch (method) {
    case 'POST':
      return green[6];
    case 'PUT':
      return orange[6];
    case 'GET':
      return blue[6];
    case 'DELETE':
      return red[6];
    default:
      return grey[10];
  }
}

export function convertFilter(filter) {
  Object.keys(filter).forEach((keys) => {
    if (filter[keys] === '') {
      filter[keys] = undefined;
    }
  });
  return filter;
}

export const splitAPICategory = (listAPI) => {
  const categories = {};

  if (listAPI) {
    listAPI
      .sort(function (a, b) {
        return (
          priorityLevel[a.permission.method] -
          priorityLevel[b.permission.method]
        );
      })
      .forEach(function (item) {
        const temp = item.permission.path.split('/');
        const category = temp[1];
        if (!categories[category]) {
          categories[category] = {};
          categories[category].listAPI = [];
        }
        categories[category].listAPI.push(item);
      });
  }
  return categories;
};

export const splitAPICategoryAdd = (listAPI) => {
  const categories = {};

  if (listAPI) {
    listAPI
      .sort(function (a, b) {
        return priorityLevel[a.method] - priorityLevel[b.method];
      })
      .forEach(function (item) {
        const temp = item.path.split('/');
        const category = temp[1];
        if (!categories[category]) {
          categories[category] = {};
          categories[category].listAPI = [];
        }
        categories[category].listAPI.push(item);
      });
  }
  return categories;
};

export const dateRangeValidate = (dateRange) => {
  if (!dateRange) return undefined;

  var startDate = new Date(dateRange[0]);
  var endDate = new Date(dateRange[1]);
  endDate.setDate(endDate.getDate() + 1);
  startDate.setHours(startDate.getHours() - 7);
  endDate.setHours(endDate.getHours() - 7);
  return [startDate, endDate];
};

export const formatCurrency = (currency) => {
  if (!currency) return 0;
  if (typeof currency === 'number') return currency;
  return Number(currency.replace(/[^0-9.-]+/g, ''));
};

export const uidAndName = (uid, name) => {
  if (!uid) return '';
  if (!name) return uid;
  return `${uid} - ${name}`;
};


export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const numberWithDots = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

/* 
nFormatter(0, 1) = 0
nFormatter(12, 1) = 12
nFormatter(1234, 1) = 1.2k
nFormatter(100000000, 1) = 100M
nFormatter(299792458, 1) = 299.8M
nFormatter(759878, 1) = 759.9k
nFormatter(759878, 0) = 760k
nFormatter(123, 1) = 123
nFormatter(123.456, 1) = 123.5
nFormatter(123.456, 2) = 123.46
nFormatter(123.456, 4) = 123.456
*/
export const nFormatterThousand = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

/*
https://stackoverflow.com/a/5365036
*/
export const getRandomColor = () => {
  return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
}

export const listDefineColorChart = ["#a80069", "#00b3ea", "#f5aa1a", "#1f3e95", "#057df7", "#0098f7", "#3d298f", "#d8d4e9", "#8b7fbc", "#c895f5"];

export const getColorChartById = (id) => {
  if (!id || id < 0 || id >= 10000) return getRandomColor();
  if (id >= 0 && id < 1000) return listDefineColorChart[0];
  if (id >= 1000 && id < 2000) return listDefineColorChart[1];
  if (id >= 2000 && id < 3000) return listDefineColorChart[2];
  if (id >= 3000 && id < 4000) return listDefineColorChart[3];
  if (id >= 4000 && id < 5000) return listDefineColorChart[4];
  if (id >= 5000 && id < 6000) return listDefineColorChart[5];
  if (id >= 6000 && id < 7000) return listDefineColorChart[6];
  if (id >= 7000 && id < 8000) return listDefineColorChart[7];
  if (id >= 8000 && id < 9000) return listDefineColorChart[8];
  if (id >= 9000 && id < 10000) return listDefineColorChart[9];
}

export const deepCopyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export const generateRandomCode = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters[randomIndex];
  }

  return randomCode;
}

export const generateKey = () => {
  const randomCode1 = generateRandomCode(8);
  const randomCode2 = generateRandomCode(8);
  return `${randomCode1 + randomCode2}_${new Date().getTime()}`;
}

export const convertToDate = (str) => {
  return moment(str).format('DD/MM/YYYY').toString();
}

export const convertToDateTime = (str) => {
  return moment(str).format('DD/MM/YYYY HH:mm').toString();
}

export const convertNumberToMoney = (n) => {
  return n.toLocaleString('vi-VN');
}

export const randomStringGenerator = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const randomFileName = () => {
  const y = moment().year();
  const d = moment().date();
  const m = moment().month() + 1;
  const h = moment().hours();
  const mm = moment().minutes();
  const s = moment().seconds();

  return randomStringGenerator(15) + '_' + h + mm + s + d + m + y;
}