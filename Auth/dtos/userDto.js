module.exports = class UserDto{
    login;
    id;
    access;

    constructor(user) {
        this.login = user.login;
        this.id = user.id;
        this.access = user.access
    }
}
