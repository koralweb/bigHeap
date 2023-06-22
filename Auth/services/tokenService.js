const jwt = require('jsonwebtoken')
const db = require('../config/db')
const config = require('../config')

class TokenService{
    generateTokens(payload){
        try {
            const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {expiresIn: '20s'})
            const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {expiresIn: '7d'})
            if(accessToken && refreshToken) {
                return {error: null, accessToken, refreshToken};
            }
            return {error: 'Ошибка при генерации токенов доступа'}
        }catch (e) {
            console.log(e)
            return {error: 'Ошибка при генерации токенов доступа'}
        }
    }

    async saveTokenToDB(userId, refreshToken){
        try {
            const newReq = await db.query(`SELECT token FROM tokens WHERE userId = $1`, [userId])
            if (newReq.rows[0]) {
                const updateToken = await db.query(`update tokens set token = $2 where userId = $1 returning *`, [userId, refreshToken])
                return {error:null}
            }
            const addToken = await db.query(`insert into tokens (userId, refreshToken) values ($1, $2) returning *`, [userId, refreshToken])
            return {error:null}
        }catch (e){
            console.log(e)
            return {error: 'Ошибка добавления токенов в базу данных'}
        }
    }
    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, config.JWT_REFRESH_SECRET)
            return userData
        }catch (e){
            return null
        }
    }
}

module.exports = new TokenService()
