import ApiError from "../exceptions/apiError.js";
import tokensServise from "../services/tokensServise.js";
import updateTokensOnAuth from "../services/updateTokensOnAuth.js";

const updateTokensRequest = async (requestFromSite, responseToSite, next) => {
    try {
        const result = await updateTokensOnAuth(requestFromSite, next)
        if(result.error !== null) {
            throw ApiError.BadRequest(result.status, result.error)
        }

        tokensServise.updateTokensOnSite(responseToSite, result.refreshToken, result.accessToken)

    } catch (error) {
        next(error);
    }

};

export default updateTokensRequest;
