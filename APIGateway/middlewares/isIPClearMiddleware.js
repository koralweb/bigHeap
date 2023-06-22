import ApiError from "../exceptions/apiError.js";

const ipBlackList = [
    '91.200.84.27',
    '193.124.53.32',
]

const isIPClearMiddleware = async (req, res, next) => {
   try{
       const ip = req.ip.split(":").slice(-1)[0]
       if(ipBlackList.includes(ip)){
           return next( ApiError.BadRequest(403, 'Ваш IP адрес в черном списке') )
       }
       else {
           return next()
       }
   }catch (err) {
       return next( err )
   }
}

export default isIPClearMiddleware
