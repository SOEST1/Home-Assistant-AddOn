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
        // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI4YzEzZjkxNWZlZjE0Y2I2YmUzOWFlNGU1ZDdkNmM0OCIsImlhdCI6MTYxNzAxMzM1MywiZXhwIjoxOTMyMzczMzUzfQ.LIt9lJFjPz3klYqExdMGcMkFEqMXzJufAwjPwY3WjSU';
        // Docker
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmNzg3MmU3YWQyMDc0NTYwOTNiNWRmZThkYTQzMjBiMyIsImlhdCI6MTYxODgwMzc5MiwiZXhwIjoxOTM0MTYzNzkyfQ.DWxtVwZSmkGAduClF41VqNu1XIyK8gdGRXRXQqfdjHw';
}
else {
    if (config_1.isSupervisor) {
        exports.HaToken = auth = dataUtil_1.getDataSync('options.json', ['auth']);
    }
    else {
        exports.HaToken = auth = process.env.AUTH;
    }
}
if (!auth) {
    throw new Error('you have to input the "Auth"');
}
