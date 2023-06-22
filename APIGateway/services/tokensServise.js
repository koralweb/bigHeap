import jwt from 'jsonwebtoken'
import config from "../config.js";
import ApiError from "../exceptions/apiError.js";
import fetch from "node-fetch";

class tokenServise{
    updateTokensOnSite(responseToSite, refreshToken, accessToken){
        responseToSite.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 30*24*60*60*1000,
            sameSite:'none',
            secure:true
        });
        responseToSite.status(200).json({
            error: null,
            result:true,
            accessToken
        });
    }

    async updateTokensOnAuth (requestFromSite,next) {
        try {
            const refreshToken = requestFromSite.cookies.refreshToken

            const response = await fetch('http://localhost:9991/validationRefreshTokenRequest', {
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
}

export default new tokenServise()
