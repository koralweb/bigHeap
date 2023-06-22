import screens from "../mobx/screens";
import updateTokensRequest from "./functions/updateTokensRequest";
import accessToken from "../mobx/accessToken";
import login from "../components/login/Login";

export default async function (response) {
    // 477 - Refresh токен отсутствует или не валиден
    if (response.status === 477) {
        screens.show('login')
        return;
    }
    // 466 - Access токен отсутствует или не валиден
    if(response.status === 466) {
        console.log('Токен протух, перехватываем управление')
        const update = await updateTokensRequest()
        if (update.error !== null) {
            console.log('some error')
        }
        accessToken.change(update.accessToken)
        fetch(response.request.url, {...response.request})
            .then(res => res.json())
            .then(data => console)
    }
    console.log(response)
    return response;
}
