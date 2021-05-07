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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var coolkit_open_api_1 = __importDefault(require("coolkit-open-api"));
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var app_1 = require("../config/app");
var dataUtil_1 = require("../utils/dataUtil");
var Controller_1 = __importDefault(require("../controller/Controller"));
var restApi_1 = require("../apis/restApi");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var at, apikey, region, result, _a, error, data, thingList;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                at = dataUtil_1.getDataSync('user.json', ['at']);
                apikey = dataUtil_1.getDataSync('user.json', ['user', 'apikey']);
                region = dataUtil_1.getDataSync('user.json', ['region']);
                return [4 /*yield*/, coolkit_ws_1.default.init({
                        appid: app_1.appId,
                        at: at,
                        apikey: apikey,
                        region: region,
                        userAgent: 'app',
                    })];
            case 1:
                result = _b.sent();
                console.log('连接的结果: ', result);
                coolkit_ws_1.default.on('message', function (ws) {
                    try {
                        var type = ws.type, data_1 = ws.data;
                        if (type === 'message' && data_1 !== 'pong') {
                            var tmp = JSON.parse(data_1);
                            var deviceName = Controller_1.default.getDeviceName(tmp.deviceid);
                            restApi_1.updateStates("switch." + tmp.deviceid, {
                                entity_id: "switch." + tmp.deviceid,
                                state: tmp.params.switch,
                                attributes: {
                                    restored: true,
                                    supported_features: 0,
                                    friendly_name: deviceName,
                                },
                            });
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
                coolkit_open_api_1.default.init({
                    appId: app_1.appId,
                    appSecret: app_1.appSecret,
                });
                return [4 /*yield*/, coolkit_open_api_1.default.user.login({
                        countryCode: '+86',
                        phoneNumber: '+8618875224960',
                        lang: 'cn',
                        password: 'coolkit666',
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, coolkit_open_api_1.default.device.getThingList({
                        lang: 'cn',
                    })];
            case 3:
                _a = _b.sent(), error = _a.error, data = _a.data;
                if (error === 0) {
                    thingList = data.thingList;
                    thingList.map(function (item) {
                        if (item.itemType < 3) {
                            var _a = item.itemData, extra = _a.extra, deviceid = _a.deviceid, name_1 = _a.name, params = _a.params;
                            if ((extra === null || extra === void 0 ? void 0 : extra.uiid) === 1) {
                                Controller_1.default.setDevice({
                                    id: deviceid,
                                    type: 4,
                                    data: item.itemData,
                                });
                                restApi_1.updateStates("switch." + deviceid, {
                                    entity_id: "switch." + deviceid,
                                    state: params.switch,
                                    attributes: {
                                        restored: true,
                                        supported_features: 0,
                                        friendly_name: name_1,
                                    },
                                });
                            }
                        }
                    });
                }
                return [2 /*return*/];
        }
    });
}); })();
