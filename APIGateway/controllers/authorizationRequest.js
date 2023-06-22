import ApiError from "../exceptions/apiError.js";
import fetch from "node-fetch";
import tokensServise from "../services/tokensServise.js";

const authorizationRequest = async (requestFromSite, responseToSite, next) => {
    try {
        const url = 'http://localhost:9991/authorizationRequest'

        const response = await fetch(url, {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestFromSite.body)
        });

        const responseBody = await response.json();
        const status = response.status

        const {error, refreshToken, accessToken} = responseBody
        if(error !== null) {
            next(ApiError.BadRequest(status, error))
            return
        }

        tokensServise.updateTokensOnSite(responseToSite, refreshToken, accessToken)

    } catch (error) {
        next(error);
    }

};

export default authorizationRequest;
