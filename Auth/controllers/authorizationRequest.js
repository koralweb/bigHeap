const validateService = require("../services/validateService");
const tokenServise = require('../services/tokenService')
const UserDto = require('../dtos/userDto')

const authorizationRequest = async (requestFromAPIGateway, responseToAPIGateway) => {
  const responseError = (error, status= 500) => {
    responseToAPIGateway.status(500).json({error})
  }
  try {
    const {login, password} = requestFromAPIGateway.body
    const validate = await validateService.validationUserData(login, password)
    if (validate.error !== null) {
      responseError(validate.error, validate.status)
      return
    }

    const userDto = new UserDto(validate.user)

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

module.exports = authorizationRequest;
