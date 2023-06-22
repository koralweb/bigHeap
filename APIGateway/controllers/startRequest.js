import updateTokensOnAuth from "../services/updateTokensOnAuth.js";
import ApiError from "../exceptions/apiError.js";
import tokensServise from "../services/tokensServise.js";

const startRequest = async (req, res, next) => {

  try{
    const result = await updateTokensOnAuth(req, next)
    if(result.error !== null) {
      throw ApiError.BadRequest(result.status, result.error)
    }

    tokensServise.updateTokensOnSite(res, result.refreshToken, result.accessToken)

  }catch (e) {
    next(e)
  }

};

export default startRequest;
