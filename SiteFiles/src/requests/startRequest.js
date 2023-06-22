import error from "../mobx/error";
import accessToken from "../mobx/accessToken";
import screens from "../mobx/screens";
import $api from "../http";

const startRequest = async () => {
    try {
        const response = await $api.get('/startRequest')
        const {data} = response

        if (data.error !== null) {
            screens.show('error')
            error.setErrorText(data.error)
            return
        }

        if(!data.result) {
            screens.show('login')
            return
        }

        accessToken.change(data.accessToken)
        screens.show('content')
    }catch (e) {
        console.log(e)
    }
}

export default startRequest
