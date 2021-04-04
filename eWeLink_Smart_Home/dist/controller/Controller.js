"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var CloudSwitchController_1 = __importDefault(require("./CloudSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("./CloudTandHModificationController"));
var DiyDeviceController_1 = __importDefault(require("./DiyDeviceController"));
var dataUtil_1 = require("../utils/dataUtil");
var LanDeviceController_1 = __importDefault(require("./LanDeviceController"));
var CloudRGBLightController_1 = __importDefault(require("./CloudRGBLightController"));
var CloudDimmingController_1 = __importDefault(require("./CloudDimmingController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("./CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("./CloudMultiChannelSwitchController"));
var CloudRGBLightStripController_1 = __importDefault(require("./CloudRGBLightStripController"));
var formatLanDevice_1 = __importDefault(require("../utils/formatLanDevice"));
var LanSwitchController_1 = __importDefault(require("./LanSwitchController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("./LanMultiChannelSwitchController"));
var uiid_1 = require("../config/uiid");
var CloudDoubleColorLightController_1 = __importDefault(require("./CloudDoubleColorLightController"));
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.getDevice = function (id) {
        if (id) {
            // 删除switch.等前缀
            var tmp = id.replace(/.*(?=\.)\./, '');
            return Controller.deviceMap.get(tmp);
        }
        return null;
    };
    Controller.getDeviceName = function (id) {
        // 删除switch.等前缀
        var tmp = id.replace(/.*(?=\.)\./, '');
        return Controller.deviceMap.get(tmp).deviceName || '';
    };
    /**
     *
     *
     * @static
     * @param {id} 设备ID
     * @param {type} 1->DIY 2->LAN 4->CLOUD
     * @param {data} 设备数据
     * @memberof Controller
     */
    Controller.setDevice = function (params) {
        var id = params.id, type = params.type, data = params.data, lanType = params.lanType;
        if (lodash_1.default.isEmpty(id)) {
            return null;
        }
        var disabled = dataUtil_1.getDataSync('disabled.json', [id]) || false;
        // DIY
        if (type === 1) {
            var tmp = data;
            if (tmp.a) {
                return;
            }
            var diyDevice = new DiyDeviceController_1.default({
                ip: tmp.a,
                port: tmp.srv.port,
                deviceId: id,
                disabled: disabled,
                txt: tmp.txt,
            });
            Controller.deviceMap.set(id, diyDevice);
            return diyDevice;
        }
        // LAN
        if (type === 2) {
            var params_1 = formatLanDevice_1.default(data);
            // 如果ip不存在说明该设备可能不支持局域网
            if (!params_1 || !params_1.ip) {
                console.log('该设备不支持局域网', params_1);
                return;
            }
            var old = Controller.getDevice(id);
            if (old instanceof LanDeviceController_1.default) {
                old.iv = params_1 === null || params_1 === void 0 ? void 0 : params_1.iv;
                old.encryptedData = params_1 === null || params_1 === void 0 ? void 0 : params_1.encryptedData;
                return old;
            }
            if (lanType === 'plug') {
                var lanDevice = new LanSwitchController_1.default(__assign(__assign({}, params_1), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            if (lanType === 'strip') {
                var lanDevice = new LanMultiChannelSwitchController_1.default(__assign(__assign({}, params_1), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
        }
        // CLOUD
        if (type === 4) {
            if (uiid_1.switchUiidSet.has(data.extra.uiid)) {
                var tmp = data;
                var switchDevice = new CloudSwitchController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, switchDevice);
                return switchDevice;
            }
            if (uiid_1.multiChannelSwitchUiidSet.has(data.extra.uiid)) {
                var tmp = data;
                var device = new CloudMultiChannelSwitchController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            // 恒温恒湿改装件
            if (data.extra.uiid === 15) {
                var tmp = data;
                var thmDevice = new CloudTandHModificationController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, thmDevice);
                return thmDevice;
            }
            // RGB灯球
            if (data.extra.uiid === 22) {
                var tmp = data;
                var rgbLight = new CloudRGBLightController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, rgbLight);
                return rgbLight;
            }
            // 功率检测告警开关
            if (data.extra.uiid === 32) {
                var tmp = data;
                var switchDevice = new CloudPowerDetectionSwitchController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, switchDevice);
                return switchDevice;
            }
            // 调光开关
            if (data.extra.uiid === 36) {
                var tmp = data;
                var dimming = new CloudDimmingController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, dimming);
                return dimming;
            }
            // RGB灯带
            if (data.extra.uiid === 59) {
                var tmp = data;
                var device = new CloudRGBLightStripController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            // 双色冷暖灯
            if (data.extra.uiid === 103) {
                var tmp = data;
                var device = new CloudDoubleColorLightController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
        }
    };
    Controller.deviceMap = new Map();
    return Controller;
}());
exports.default = Controller;
