import accessToken from "../mobx/accessToken";

export default function (url, config) {
    config = config || {};
    const headers = config.headers || {};

    config.headers = {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.token}`
    };
    config.credentials = 'include'

    return [url, config];
}

