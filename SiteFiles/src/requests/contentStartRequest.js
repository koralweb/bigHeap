import error from "../mobx/error";
import $api from "../http";
import screens from "../mobx/screens";

const contentStartRequest = async () => {
    try {
        const response = await $api.get('/contentStartRequest')
    }catch (e) {
        console.log(e)
    }
}

export default contentStartRequest
