'use strict';

var User = /** @class */ (function () {
    function User(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    User.prototype.getFullName = function () {
        return this.name + " " + this.surname;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    return User;
}());

exports.User = User;
