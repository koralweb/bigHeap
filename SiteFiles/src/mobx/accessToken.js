import {action, makeObservable, observable} from 'mobx';

class AccessToken {
    token = '';

    change(token) {
        this.token = token;
    }

    constructor() {
        makeObservable(this, {
            token: observable,
            change: action,
        });
    }
}

const accessToken = new AccessToken();

export default accessToken;
