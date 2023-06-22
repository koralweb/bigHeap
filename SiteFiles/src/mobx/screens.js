import {action, makeObservable, observable} from 'mobx';

class Screens {
    login = false;
    content = false
    error = false

    show(screen) {
        this.login = false;
        this.content = false;
        this.error = false;
        this[screen] = true
    }

    constructor() {
        makeObservable(this, {
            login: observable,
            content: observable,
            error: observable,
            show: action,
        });
    }
}

const screens = new Screens();

export default screens;
