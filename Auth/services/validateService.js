const db = require('../config/db')

class ValidateService{
    async validationUserData(login, password) {
        try {
            const newReq = await db.query(`SELECT id, login, password, access FROM users WHERE login = $1`, [login])
            if (!newReq.rows[0]) {
                return {error: 'Пользователь не существует', status: 403}
            }
            const user = newReq.rows[0]
            if (user.password !== password) {
                return {error: 'Пароль не совпадает', status: 403}
            }
            return {error: null, status: 200, user }
        } catch (e) {
            return {error: 'Ошибка соединения с базой данных', status: 500}
        }
    }
    async validationRefreshTokenFromDB(refreshToken, userData) {
        try {
            const newReq = await db.query(`SELECT userId, token FROM tokens WHERE userId = $1`, [userData.id])
            if (!newReq.rows[0]) {
                return {error: 'Токен отсутствует в базе данных', status: 477}
            }
            const userId = newReq.rows[0].userId
            const token = newReq.rows[0].token

            return {error: null, userId, token }
        } catch (e) {
            return {error: 'Ошибка соединения с базой данных', status: 500}
        }
    }
}


module.exports = new ValidateService()
