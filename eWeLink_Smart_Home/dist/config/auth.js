"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaToken = void 0;
var dataUtil_1 = require("../utils/dataUtil");
var config_1 = require("./config");
var auth;
exports.HaToken = auth;
if (config_1.debugMode) {
    exports.HaToken = auth =
        // Pi
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI4YzEzZjkxNWZlZjE0Y2I2YmUzOWFlNGU1ZDdkNmM0OCIsImlhdCI6MTYxNzAxMzM1MywiZXhwIjoxOTMyMzczMzUzfQ.LIt9lJFjPz3klYqExdMGcMkFEqMXzJufAwjPwY3WjSU';
}
else {
    exports.HaToken = auth = dataUtil_1.getDataSync('options.json', ['auth']);
}
if (!auth) {
    throw new Error('you have to input the "Auth"');
}
