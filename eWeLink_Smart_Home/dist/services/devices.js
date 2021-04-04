"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
exports.updateDeviceName = exports.disableDevice = exports.getDevices = void 0;
var coolkit_open_api_1 = __importDefault(require("coolkit-open-api"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var getThings_1 = __importDefault(require("../utils/getThings"));
var sleep_1 = __importDefault(require("../utils/sleep"));
var initMdns_1 = __importDefault(require("../utils/initMdns"));
var modifyDeviceStatus_1 = __importDefault(require("../utils/modifyDeviceStatus"));
var formatDevice_1 = __importDefault(require("../utils/formatDevice"));
var restApi_1 = require("../apis/restApi");
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var mdns = initMdns_1.default();
var getDevices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, refresh, _a, cloud, lan, diy, data, _b, _c, item, err_1;
    var e_1, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                type = req.query.type;
                refresh = req.body.refresh;
                if (type === undefined) {
                    res.json({
                        error: 401,
                        data: null,
                    });
                }
                if (!refresh) return [3 /*break*/, 3];
                mdns.query({
                    questions: [
                        {
                            name: '_ewelink._tcp.local',
                            type: 'PTR',
                        },
                    ],
                });
                return [4 /*yield*/, getThings_1.default()];
            case 1:
                _e.sent();
                return [4 /*yield*/, sleep_1.default(1000)];
            case 2:
                _e.sent();
                _e.label = 3;
            case 3:
                _a = __read((+type).toString(2).padStart(3, '0').split(''), 3), cloud = _a[0], lan = _a[1], diy = _a[2];
                data = [];
                try {
                    for (_b = __values(Controller_1.default.deviceMap.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        item = _c.value;
                        if (item.type === 1 && +diy) {
                            data.push(formatDevice_1.default(item));
                        }
                        if (item.type === 2 && +lan) {
                            data.push(formatDevice_1.default(item));
                        }
                        if (item.type === 4 && +cloud) {
                            data.push(formatDevice_1.default(item));
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                res.json({
                    error: 0,
                    data: data,
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _e.sent();
                console.log('Jia ~ file: devices.ts ~ line 22 ~ getDevices ~ err', err_1);
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getDevices = getDevices;
var disableDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, disabled, id, device, error, i, i, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, disabled = _a.disabled, id = _a.id;
                device = Controller_1.default.getDevice(id);
                if (!device) {
                    res.json({
                        error: 402,
                        msg: 'not such device',
                    });
                }
                device.disabled = disabled;
                return [4 /*yield*/, modifyDeviceStatus_1.default(id, disabled)];
            case 1:
                error = _b.sent();
                if (device && disabled) {
                    if (device instanceof CloudTandHModificationController_1.default) {
                        restApi_1.removeStates(device.entityId);
                        restApi_1.removeStates("sensor." + device.deviceId + "_h");
                        restApi_1.removeStates("sensor." + device.deviceId + "_t");
                    }
                    if (device instanceof CloudMultiChannelSwitchController_1.default) {
                        for (i = 0; i < device.maxChannel; i++) {
                            restApi_1.removeStates(device.entityId + "_" + (i + 1));
                        }
                    }
                    if (device instanceof LanMultiChannelSwitchController_1.default) {
                        if (device.maxChannel) {
                            for (i = 0; i < device.maxChannel; i++) {
                                restApi_1.removeStates(device.entityId + "_" + (i + 1));
                            }
                        }
                    }
                    restApi_1.removeStates(device.entityId);
                }
                if (!!disabled) return [3 /*break*/, 4];
                mdns.query({
                    questions: [
                        {
                            name: '_ewelink._tcp.local',
                            type: 'PTR',
                        },
                    ],
                });
                return [4 /*yield*/, getThings_1.default()];
            case 2:
                _b.sent();
                // todo
                return [4 /*yield*/, sleep_1.default(2000)];
            case 3:
                // todo
                _b.sent();
                _b.label = 4;
            case 4:
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                }
                else {
                    res.json({
                        error: 500,
                        data: null,
                    });
                }
                return [3 /*break*/, 6];
            case 5:
                err_2 = _b.sent();
                console.log('Jia ~ file: devices.ts ~ line 71 ~ disableDevice ~ err', err_2);
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.disableDevice = disableDevice;
var updateDeviceName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, newName, id, device, error, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, newName = _a.newName, id = _a.id;
                device = Controller_1.default.getDevice(id);
                if (!device) {
                    res.json({
                        error: 402,
                        msg: 'not such device',
                    });
                }
                return [4 /*yield*/, coolkit_open_api_1.default.device.updateDeviceInfo({
                        deviceid: id,
                        name: newName,
                    })];
            case 1:
                error = (_b.sent()).error;
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                }
                else {
                    res.json({
                        error: 500,
                        data: null,
                    });
                }
                return [4 /*yield*/, getThings_1.default()];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                console.log('Jia ~ file: devices.ts ~ line 71 ~ disableDevice ~ err', err_3);
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateDeviceName = updateDeviceName;
