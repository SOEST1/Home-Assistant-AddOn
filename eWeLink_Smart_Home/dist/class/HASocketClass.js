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
var ws_1 = __importDefault(require("ws"));
var config_1 = require("../config/config");
var auth_1 = require("../config/auth");
var HaSocket = /** @class */ (function () {
    function HaSocket() {
        this.count = 1;
        this.client = new ws_1.default(config_1.HaSocketURL);
    }
    HaSocket.createInstance = function () {
        if (!HaSocket.instance) {
            HaSocket.instance = new HaSocket();
        }
        return HaSocket.instance;
    };
    HaSocket.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handler;
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.client.on('open', function () {
                            _this.client.send(JSON.stringify({
                                type: 'auth',
                                access_token: auth_1.HaToken,
                            }));
                        });
                        _this.client.on('message', (handler = function (res) {
                            try {
                                var data = JSON.parse(res);
                                console.log('Jia ~ file: HASocketClass.ts ~ line 37 ~ HaSocket ~ init ~ data', data);
                                if (data.type === 'auth_ok') {
                                    resolve(0);
                                    _this.client.removeEventListener('message', handler);
                                }
                            }
                            catch (error) {
                                console.log('Jia ~ file: HaSocketClass.ts ~ line 42 ~ HaSocket ~ init ~ error', error);
                                resolve(-1);
                            }
                        }));
                    })];
            });
        });
    };
    HaSocket.prototype.subscribeEvents = function (eventType) {
        this.client.send(JSON.stringify({
            id: this.count++,
            type: 'subscribe_events',
            event_type: eventType,
        }));
    };
    HaSocket.prototype.handleEvent = function (eventType, handler) {
        this.client.on('message', function (res) {
            try {
                var data = JSON.parse(res);
                if (data.type === 'event' && data.event.event_type === eventType) {
                    handler(data.event.data);
                }
            }
            catch (err) {
                console.log('Jia ~ file: HaSocketClass.ts ~ line 65 ~ HaSocket ~ handleEvent ~ err', err);
            }
        });
    };
    HaSocket.prototype.query = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var cur, handler;
            var _this = this;
            return __generator(this, function (_a) {
                cur = this.count++;
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.client.send(JSON.stringify(__assign({ id: cur }, data)));
                        _this.client.on('message', (handler = function (res) {
                            console.log('Jia ~ file: HASocketClass.ts ~ line 86 ~ HaSocket ~ returnnewPromise ~ res', res);
                            try {
                                var data_1 = JSON.parse(res);
                                if (data_1.id === cur) {
                                    resolve(data_1.result);
                                    _this.client.removeEventListener('message', handler);
                                }
                            }
                            catch (error) {
                                console.log('Jia ~ file: HASocketClass.ts ~ line 92 ~ HaSocket ~ query ~ error', error);
                                resolve(-1);
                            }
                        }));
                    })];
            });
        });
    };
    HaSocket.prototype.getStates = function () {
        this.client.send(JSON.stringify({
            id: this.count++,
            type: 'get_states',
        }));
    };
    HaSocket.prototype.getConfig = function () {
        this.client.send(JSON.stringify({
            id: this.count++,
            type: 'get_config',
        }));
    };
    return HaSocket;
}());
var instance = HaSocket.createInstance();
exports.default = instance;
