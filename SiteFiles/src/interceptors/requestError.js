import error from "../mobx/error";

export default function (err) {
    error.change(true)
    error.setErrorText()
    return Promise.reject(err);
}
