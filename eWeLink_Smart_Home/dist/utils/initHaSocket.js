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
var HASocketClass_1 = __importDefault(require("../class/HASocketClass"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanSwitchController_1 = __importDefault(require("../controller/LanSwitchController"));
var CloudSwitchController_1 = __importDefault(require("../controller/CloudSwitchController"));
var CloudRGBLightController_1 = __importDefault(require("../controller/CloudRGBLightController"));
var CloudDimmingController_1 = __importDefault(require("../controller/CloudDimmingController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudRGBLightStripController_1 = __importDefault(require("../controller/CloudRGBLightStripController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudDoubleColorLightController_1 = __importDefault(require("../controller/CloudDoubleColorLightController"));
/**
 *
 *
 * @param {string} entity_id 实体id
 * @param {string} state // on | off
 * @param {*} res socket 返回的信息主体
 * @param {{ outlet: number; switch: string }[]} [mutiSwitchState] 可选，控制多通道的全开/全关
 * @return {*}
 */
var handleDeviceByEntityId = function (entity_id, state, res, mutiSwitchState) {
    var device = Controller_1.default.getDevice(entity_id.replace(/_\d+$/, ''));
    // DIY
    if (device instanceof DiyDeviceController_1.default) {
        device.setSwitch(state);
    }
    // LAN
    if (device instanceof LanSwitchController_1.default) {
        device.setSwitch(state);
    }
    // LAN
    if (device instanceof LanMultiChannelSwitchController_1.default) {
        if (mutiSwitchState) {
            device.setSwitch(mutiSwitchState);
        }
        else {
            var _a = __read(entity_id.split('_'), 2), id = _a[0], outlet = _a[1];
            device.setSwitch([
                {
                    outlet: +outlet - 1,
                    switch: state,
                },
            ]);
        }
    }
    // Cloud
    if (device instanceof CloudSwitchController_1.default) {
        device.updateSwitch(state);
    }
    if (device instanceof CloudRGBLightController_1.default) {
        if (state === 'off') {
            device.updateLight({
                state: state,
            });
            return;
        }
        var _b = res.service_data, hs_color = _b.hs_color, _c = _b.brightness_pct, brightness_pct = _c === void 0 ? 0 : _c;
        var params = device.parseHaData2Ck({ hs_color: hs_color, brightness_pct: brightness_pct, state: state });
        device.updateLight(params);
    }
    if (device instanceof CloudDimmingController_1.default) {
        var brightness_pct = res.service_data.brightness_pct;
        device.updateLight({
            switch: state,
            bright: brightness_pct,
        });
    }
    if (device instanceof CloudPowerDetectionSwitchController_1.default) {
        device.updateSwitch(state);
    }
    if (device instanceof CloudTandHModificationController_1.default) {
        device.updateSwitch(state);
    }
    if (device instanceof CloudMultiChannelSwitchController_1.default) {
        if (mutiSwitchState) {
            device.updateSwitch(mutiSwitchState);
        }
        else {
            var _d = __read(entity_id.split('_'), 2), id = _d[0], outlet = _d[1];
            device.updateSwitch([
                {
                    outlet: +outlet - 1,
                    switch: state,
                },
            ]);
        }
    }
    if (device instanceof CloudRGBLightStripController_1.default) {
        if (state === 'off') {
            device.updateLight({
                switch: state,
            });
            return;
        }
        var _e = res.service_data, hs_color = _e.hs_color, color_temp = _e.color_temp, _f = _e.brightness_pct, brightness_pct = _f === void 0 ? 0 : _f;
        var params = device.parseHaData2Ck({ hs_color: hs_color, brightness_pct: brightness_pct, state: state });
        device.updateLight(params);
    }
    if (device instanceof CloudDoubleColorLightController_1.default) {
        if (state === 'off') {
            device.updateLight({
                switch: state,
            });
            return;
        }
        var _g = res.service_data, color_temp = _g.color_temp, brightness_pct = _g.brightness_pct;
        device.updateLight({
            switch: state,
            ct: color_temp,
            br: brightness_pct,
        });
    }
};
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, HASocketClass_1.default.init()];
            case 1:
                res = _a.sent();
                if (res === 0) {
                    HASocketClass_1.default.subscribeEvents('call_service');
                    HASocketClass_1.default.handleEvent('call_service', function (res) {
                        var e_1, _a;
                        console.log('HA触发call_service事件', res);
                        var entity_id = res.service_data.entity_id, service = res.service;
                        var state = service === 'turn_off' ? 'off' : 'on';
                        if (Array.isArray(entity_id)) {
                            // 暂存多通道设备
                            var tmpMap_1 = new Map();
                            entity_id.forEach(function (item) {
                                var _a = __read(item.split('_'), 2), deviceid = _a[0], outlet = _a[1];
                                var device = Controller_1.default.getDevice(deviceid);
                                // 一次性控制多通道设备多个通道
                                if (device instanceof LanMultiChannelSwitchController_1.default || device instanceof CloudMultiChannelSwitchController_1.default) {
                                    if (tmpMap_1.has(deviceid)) {
                                        tmpMap_1.get(deviceid).push({
                                            outlet: outlet - 1,
                                            switch: state,
                                        });
                                    }
                                    else {
                                        tmpMap_1.set(deviceid, [
                                            {
                                                outlet: outlet - 1,
                                                switch: state,
                                            },
                                        ]);
                                    }
                                }
                                else {
                                    handleDeviceByEntityId(item, state, res);
                                }
                            });
                            try {
                                for (var _b = __values(tmpMap_1.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var _d = __read(_c.value, 2), id = _d[0], mutiSwitchState = _d[1];
                                    handleDeviceByEntityId(id, state, res, mutiSwitchState);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        if (typeof entity_id === 'string') {
                            handleDeviceByEntityId(entity_id, state, res);
                        }
                    });
                    HASocketClass_1.default.subscribeEvents('state_changed');
                    // todo
                    // HASocket.handleEvent('state_changed', (res: TypeHaSocketStateChangedData) => {
                    //     try {
                    //         const { entity_id, new_state } = res;
                    //         console.log('Jia ~ file: initHaSocket.ts ~ line 33 ~ HASocket.handleEvent ~ new_state', new_state);
                    //         if (entity_id) {
                    //             const data = Controller.getDevice(entity_id);
                    //             if (data && data.type === 1) {
                    //                 (data as DiyDeviceController).updateState(new_state.state);
                    //                 // (data as DiyDeviceController).setSwitch(new_state.state);
                    //             }
                    //             if (data && data.type === 4) {
                    //                 (data as CloudSwitchController).updateSwitch(new_state.state);
                    //             }
                    //         }
                    //     } catch (error) {
                    //         console.log('Jia ~ file: initHaSocket.ts ~ line 45 ~ HASocket.handleEvent ~ error', error);
                    //     }
                    // });
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log('Jia ~ file: initHaSocket.ts ~ line 28 ~ err', err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
