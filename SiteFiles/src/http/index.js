import axios from "axios";
import accessToken from "../mobx/accessToken";
import screens from "../mobx/screens";

const API_URL = 'http://localhost:9990/api'

const $api = axios.create({
    withCredentials:true,
    baseURL: API_URL,
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${accessToken.token}`;
    config.validateStatus = (status) => {
        return status < 450;
    }

    return config
})

$api.interceptors.response.use(config => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status === 477) {
        screens.show('login')
        console.log('token not valid')
    }
    if(error.response.status === 466) {
        const response = await fetch('http://localhost:9990/api/updateTokensRequest')
        const data = await response.json()
        accessToken.change(data.accessToken)
        return $api.request(originalRequest)
    }
})

export default $api
