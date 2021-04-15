"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaRestURL = exports.HaSocketURL = void 0;
var dataUtil_1 = require("../utils/dataUtil");
var config_1 = require("./config");
var port = 8123;
if (!config_1.debugMode) {
    port = dataUtil_1.getDataSync('options.json', ['home_assistant_port']);
}
// const HaSocketURL = `http://172.16.9.22:${port}/api/websocket`;
// const HaRestURL = `http://172.16.9.22:${port}`;
var HaSocketURL = "http://homeassistant:" + port + "/api/websocket";
exports.HaSocketURL = HaSocketURL;
var HaRestURL = "http://homeassistant:" + port;
exports.HaRestURL = HaRestURL;
