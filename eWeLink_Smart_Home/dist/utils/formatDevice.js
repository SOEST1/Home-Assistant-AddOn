"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CloudDeviceController_1 = __importDefault(require("../controller/CloudDeviceController"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanDeviceController_1 = __importDefault(require("../controller/LanDeviceController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var ghostManufacturer = function (manufacturer) {
    if (manufacturer === void 0) { manufacturer = 'eWeLink'; }
    if (~manufacturer.indexOf('松诺') || ~manufacturer.toLocaleUpperCase().indexOf('SONOFF')) {
        return 'SONOFF';
    }
    return 'eWeLink';
};
exports.default = (function (data) {
    var _a, _b, _c;
    if (data instanceof DiyDeviceController_1.default) {
        return {
            key: data.deviceId,
            deviceId: data.deviceId,
            disabled: data.disabled,
            ip: data.ip,
            port: data.port,
            type: data.type,
            rssi: (_a = data.txt.data1) === null || _a === void 0 ? void 0 : _a.rssi,
            params: data.txt,
        };
    }
    if (data instanceof LanDeviceController_1.default) {
        var tags = void 0;
        if (data instanceof LanMultiChannelSwitchController_1.default) {
            tags = data.channelName;
        }
        return {
            key: data.deviceId,
            deviceId: data.deviceId,
            disabled: data.disabled,
            ip: data.ip,
            port: data.port,
            type: data.type,
            manufacturer: ghostManufacturer((_b = data.extra) === null || _b === void 0 ? void 0 : _b.manufacturer),
            deviceName: data.deviceName,
            model: (_c = data.extra) === null || _c === void 0 ? void 0 : _c.model,
            apikey: data.selfApikey,
            params: data.params,
            tags: tags,
        };
    }
    if (data instanceof CloudDeviceController_1.default) {
        var tags = void 0;
        if (data instanceof CloudMultiChannelSwitchController_1.default) {
            tags = data.channelName;
        }
        return {
            key: data.deviceId,
            deviceId: data.deviceId,
            disabled: data.disabled,
            uiid: data.uiid,
            type: data.type,
            manufacturer: ghostManufacturer(data.extra.manufacturer),
            deviceName: data.deviceName,
            model: data.extra.model,
            rssi: data.rssi,
            apikey: data.apikey,
            params: data.params,
            tags: tags,
        };
    }
});