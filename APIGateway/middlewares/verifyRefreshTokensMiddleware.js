import jwt from "jsonwebtoken";
import config from "../config.js";
import ApiError from "../exceptions/apiError.js";

const excludeRoutes = [
    '/api/authorizationRequest'
]

export default function (req, res, next) {
    const refreshToken = req.cookies.refreshToken
    try{
        if(excludeRoutes.includes(req.url)) return next()

        if (!refreshToken) return res.status(403).json( { result: false, error: null } )

        const userData = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET)

        next();
    }catch (e) {
        next(ApiError.BadRequest(477, 'Refresh токен не валиден'))
    }
}
