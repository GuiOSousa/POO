"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var rent_1 = require("./rent");
var crypto = require("crypto");
var App = /** @class */ (function () {
    function App() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    App.prototype.findUser = function (email) {
        return this.users.find(function (user) { return user.email === email; });
    };
    App.prototype.registerUser = function (user) {
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var rUser = _a[_i];
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.');
            }
        }
        user.id = crypto.randomUUID();
        this.users.push(user);
    };
    App.prototype.removeUser = function (user) {
        var userToBeRemoved = this.findUser(user.email);
        if (userToBeRemoved === undefined) {
            throw new Error('User not found.');
        }
        this.users = this.users.filter(function (object) { return object.id === userToBeRemoved.id; });
    };
    App.prototype.findBike = function (id) {
        return this.bikes.find(function (object) { return object.id === id; });
    };
    App.prototype.registerBike = function (bike) {
        if (bike.id !== undefined) {
            throw new Error('Bike already registered.');
        }
        bike.id = crypto.randomUUID();
        this.bikes.push(bike);
    };
    App.prototype.removeBike = function (bike) {
        if (bike.id === undefined) {
            throw new Error('Bike not registered.');
        }
        this.bikes = this.bikes.filter(function (object) { return object.id !== bike.id; });
    };
    App.prototype.rentBike = function (bike, user, startDate, endDate) {
        if (bike.id === undefined) {
            throw new Error('Bike not registered.');
        }
        if (bike.available === false) {
            throw new Error('Bike not available.');
        }
        this.rents.push(rent_1.Rent.create(this.rents, bike, user, startDate, endDate));
        bike.available = false;
    };
    App.prototype.returnBike = function (bike) {
        if (bike.id === undefined) {
            throw new Error('Bike not registered.');
        }
        bike.available = true;
    };
    App.prototype.showUsers = function () {
        console.log("\n### User list (".concat(this.users.length, ") ###"));
        this.users.forEach(function (user) { return console.log("- ".concat(user.name, ", email: ").concat(user.email)); });
    };
    App.prototype.showBikes = function () {
        console.log("\n### Bike list (".concat(this.bikes.length, ") ###"));
        this.bikes.forEach(function (bike) { return console.log(" - bike name: ".concat(bike.name, "  \u2B50: ").concat(bike.rate, " | available: ").concat((bike.available ? "\u2705" : "\u274C"))); });
    };
    App.prototype.showRents = function () {
        console.log("\n### Rent list (".concat(this.bikes.length, ") ###"));
        this.rents.forEach(function (rent) { return console.log(" - user: ".concat(rent.user, " | bike: ").concat(rent.bike, " | from: ").concat(rent.dateFrom, " to: ").concat(rent.dateTo)); });
    };
    App.prototype.userAuthentication = function (email, password) {
        var user = this.findUser(email);
        if (user === undefined) {
            throw new Error("User not found.");
        }
        return user.password === password;
    };
    return App;
}());
exports.App = App;
