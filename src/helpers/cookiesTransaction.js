const parseCookies = () => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    const cookieObject = {};

    cookies.forEach((cookie) => {
        const [name, value] = cookie.split('=');
        cookieObject[name] = decodeURIComponent(value);
    });

    return cookieObject;
}

const cookiesObjectify = (cookieObject) => {
    for (const key in cookieObject) {
        if (key != undefined && key != 'undefined' && key != '' && Object.prototype.hasOwnProperty.call(cookieObject, key)) {
            const value = encodeURIComponent(cookieObject[key]);
            document.cookie = `${key}=${value}; path=/;`;
        }
    }
}

const setCookie = (name, value) => {
    const cookieObject = parseCookies();
    cookieObject[name] = value;

    cookiesObjectify(cookieObject);

    return null;
}

const getCookie = (name) => {
    const cookieObject = parseCookies();

    return cookieObject[name];
}

const deleteCookie = (name) => {
    const cookieObject = parseCookies();
    cookieObject[name] = '';

    cookiesObjectify(cookieObject);

    return null;
}

export default {
    setCookie,
    getCookie,
    deleteCookie,
};