import fetch from 'node-fetch';

const url = 'http://localhost:9991/updateTokens'

const updateTokensOnAuth = async (requestFromSite,next) => {
    try {
        const refreshToken = requestFromSite.cookies.refreshToken

        const response = await fetch(url, {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({refreshToken })
        });

        const data = await response.json();
        data.status = response.status
        return data

    } catch (error) {
        next(error);
    }
};
export default updateTokensOnAuth;
