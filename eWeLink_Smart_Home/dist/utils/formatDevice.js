"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedDeviceList = exports.formatDevice = void 0;
var CloudDeviceController_1 = __importDefault(require("../controller/CloudDeviceController"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var lodash_1 = __importDefault(require("lodash"));
var LanDeviceController_1 = __importDefault(require("../controller/LanDeviceController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var dataUtil_1 = require("./dataUtil");
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanPowerDetectionSwitchController_1 = __importDefault(require("../controller/LanPowerDetectionSwitchController"));
var CloudDW2WiFiController_1 = __importDefault(require("../controller/CloudDW2WiFiController"));
var ZigbeeDeviceController_1 = __importDefault(require("../controller/ZigbeeDeviceController"));
var ghostManufacturer = function (manufacturer) {
    if (manufacturer === void 0) { manufacturer = 'eWeLink'; }
    if (~manufacturer.indexOf('松诺') || ~manufacturer.toLocaleUpperCase().indexOf('SONOFF')) {
        return 'SONOFF';
    }
    return 'eWeLink';
};
var formatDevice = function (data) {
    var _a, _b, _c, _d;
    if (data instanceof DiyDeviceController_1.default) {
        return {
            key: data.deviceId,
            uiid: data.uiid,
            deviceId: data.deviceId,
            deviceName: data.deviceName,
            disabled: data.disabled,
            ip: data.ip,
            port: data.port,
            type: data.type,
            rssi: (_a = data.txt.data1) === null || _a === void 0 ? void 0 : _a.rssi,
            params: data.txt,
            online: true,
        };
    }
    if (data instanceof LanDeviceController_1.default) {
        var tags = void 0, unit = void 0, rate = void 0;
        if (data instanceof LanMultiChannelSwitchController_1.default) {
            tags = data.channelName;
        }
        if (data instanceof LanTandHModificationController_1.default) {
            unit = data.unit;
        }
        if (data instanceof LanDualR3Controller_1.default || data instanceof LanPowerDetectionSwitchController_1.default) {
            rate = data.rate;
        }
        return {
            key: data.deviceId,
            deviceId: data.deviceId,
            disabled: data.disabled,
            ip: data.ip,
            uiid: (_b = data.extra) === null || _b === void 0 ? void 0 : _b.uiid,
            port: data.port,
            type: data.type,
            manufacturer: ghostManufacturer((_c = data.extra) === null || _c === void 0 ? void 0 : _c.manufacturer),
            deviceName: data.deviceName,
            model: (_d = data.extra) === null || _d === void 0 ? void 0 : _d.model,
            apikey: data.selfApikey,
            params: data.params,
            online: data.online,
            index: data.index,
            tags: tags,
            unit: unit,
            rate: rate,
        };
    }
    if (data instanceof CloudDeviceController_1.default) {
        var tags = void 0, unit = void 0, rate = void 0, lowVolAlarm = void 0;
        if (data instanceof CloudMultiChannelSwitchController_1.default) {
            tags = data.channelName;
        }
        if (data instanceof CloudTandHModificationController_1.default) {
            unit = data.unit;
        }
        if (data instanceof CloudPowerDetectionSwitchController_1.default || data instanceof CloudDualR3Controller_1.default) {
            rate = data.rate;
        }
        if (data instanceof CloudDW2WiFiController_1.default) {
            lowVolAlarm = data.lowVolAlarm;
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
            online: data.online,
            index: data.index,
            tags: tags,
            unit: unit,
            rate: rate,
            lowVolAlarm: lowVolAlarm,
        };
    }
    if (data instanceof ZigbeeDeviceController_1.default) {
        return {
            key: data.deviceId,
            deviceId: data.deviceId,
            disabled: data.disabled,
            uiid: data.uiid,
            type: data.type,
            manufacturer: ghostManufacturer(data.extra.manufacturer),
            deviceName: data.deviceName,
            model: data.extra.model,
            apikey: data.apikey,
            params: data.params,
            online: data.online,
            index: data.index,
        };
    }
};
exports.formatDevice = formatDevice;
var formatUnsupportDevice = function (data) {
    return {
        key: data.deviceId,
        deviceId: data.deviceId,
        uiid: data.uiid,
        deviceName: data.deviceName,
        params: data.params,
        online: data.online,
    };
};
var getFormattedDeviceList = function () {
    var e_1, _a, e_2, _b;
    var result = [];
    try {
        for (var _c = __values(Controller_1.default.deviceMap.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var item = _d.value;
            result.push(formatDevice(item));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var _e = __values(Controller_1.default.unsupportDeviceMap.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
            var item = _f.value;
            result.push(formatUnsupportDevice(item));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var oldDiyDevices = dataUtil_1.getDataSync('diy.json', []);
    for (var key in oldDiyDevices) {
        try {
            if (!Controller_1.default.getDevice(key)) {
                result.push({
                    online: false,
                    type: 1,
                    deviceId: key,
                    deviceName: lodash_1.default.get(oldDiyDevices, [key, 'deviceName']),
                });
            }
        }
        catch (error) {
            if (!Controller_1.default.getDevice(key)) {
                result.push({
                    online: false,
                    type: 1,
                    deviceId: key,
                });
            }
        }
    }
    result.sort(function (a, b) {
        if (!a.index) {
            return 1;
        }
        if (!b.index) {
            return -1;
        }
        return a.index - b.index;
    });
    return result;
};
exports.getFormattedDeviceList = getFormattedDeviceList;
