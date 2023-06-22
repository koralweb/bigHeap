import ApiError from "../exceptions/apiError.js";
export default function (err,req,res,next){
    if(err instanceof ApiError) {
        return res.status(err.status).json({error: err.message})
    }
    return res.status(500).json({error: 'Непредвиденная ошибка на сервере'})
}
