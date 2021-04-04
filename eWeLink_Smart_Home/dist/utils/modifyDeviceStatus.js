"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataUtil_1 = require("./dataUtil");
var modifyDeviceStatus = function (id, status) {
    return dataUtil_1.appendData('disabled.json', [id], status);
};
exports.default = modifyDeviceStatus;
