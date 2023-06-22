import {action, makeObservable, observable} from 'mobx';

class MyError {
    errorText = ''

    setErrorText(text) {
        if (!text) return
        this.errorText = typeof text == 'string' ? text : text.toString()
    }

    constructor() {
        makeObservable(this, {
            errorText: observable,
            setErrorText: action,
        });
    }
}

const error = new MyError();

export default error;
