export default class ApiError extends Error {
    status;

    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static UnauthorizedError(){
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(status, message) {
        return new ApiError(status, message)
    }

}
