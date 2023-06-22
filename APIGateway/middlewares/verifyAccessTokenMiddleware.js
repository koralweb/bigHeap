import ApiError from "../exceptions/apiError.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

const excludeRoutes = [
    '/api/startRequest',
    '/api/updateTokensRequest',
    '/api/authorizationRequest'
]
export default function (req, res, next) {
    try{
        if(excludeRoutes.includes(req.url)) {
            return next()
        }

        if(!req.headers['authorization']) return next(ApiError.BadRequest(466, 'Токена нет'))
        const token = req.headers['authorization'].split(' ')[1]
        const userData = jwt.verify(token, config.JWT_ACCESS_SECRET)

        if(!userData) return next(ApiError.BadRequest(466, 'Токен протух'))

        next();
    }catch (e) {
        next(ApiError.BadRequest(466, 'Токен протух'))
    }
}
