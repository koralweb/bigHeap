const validateService = require("../services/validateService");
const tokenServise = require('../services/tokenService')
const UserDto = require('../dtos/userDto')

const updateTokens = async (requestFromAPIGateway, responseToAPIGateway) => {
    const responseError = (error, status= 500) => {
        responseToAPIGateway.status(status).json({error})
    }
    try {
        const {refreshToken} = requestFromAPIGateway.body

        const userData = tokenServise.validateRefreshToken(refreshToken)
        if(!userData) {
            responseError('Токен не валиден', 477)
            return
        }

        const validateDB = await validateService.validationRefreshTokenFromDB(refreshToken, userData)
        if (validateDB.error !== null) {
            responseError(validateDB.error, validateDB.status)
            return
        }

        const userDto = new UserDto(userData)

        const tokens = tokenServise.generateTokens({...userDto})
        if(tokens.error !== null) {
            responseError(tokens.error)
            return
        }

        const saveTokenToDB = await tokenServise.saveTokenToDB(userDto.id, tokens.refreshToken)
        if(saveTokenToDB.error !== null) {
            responseError(saveTokenToDB.error)
            return
        }

        responseToAPIGateway.status(200).json({
            error:null,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        })
    }catch (e) {
        responseError('Непредвиденная ошибка на сервере аутентификации')
    }
};

module.exports = updateTokens;
