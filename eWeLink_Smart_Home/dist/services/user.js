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
exports.logout = exports.login = void 0;
var coolkit_open_api_1 = __importDefault(require("coolkit-open-api"));
var dataUtil_1 = require("../utils/dataUtil");
var getThings_1 = __importDefault(require("../utils/getThings"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var app_1 = require("../config/app");
var lodash_1 = __importDefault(require("lodash"));
/**
 * @param {string} lang
 * @param {string} email
 * @param {string} password
 * @param {string} countryCode
 * @param {string} phoneNumber
 */
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, countryCode, phoneNumber, lang, password, email, result, at, apikey, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, countryCode = _a.countryCode, phoneNumber = _a.phoneNumber, lang = _a.lang, password = _a.password, email = _a.email;
                return [4 /*yield*/, coolkit_open_api_1.default.user.login({
                        countryCode: countryCode,
                        phoneNumber: phoneNumber,
                        lang: lang,
                        password: password,
                        email: email,
                    })];
            case 1:
                result = _b.sent();
                console.log('Jia ~ file: user.ts ~ line 26 ~ login ~ result', result);
                if (!(result.error === 0)) return [3 /*break*/, 4];
                dataUtil_1.saveData('user.json', JSON.stringify(__assign(__assign({}, result.data), { login: __assign({}, req.body) })));
                at = lodash_1.default.get(result, ['data', 'at']);
                apikey = lodash_1.default.get(result, ['data', 'user', 'apikey']);
                return [4 /*yield*/, coolkit_ws_1.default.init({
                        appid: app_1.appId,
                        secret: app_1.appSecret,
                        at: at,
                        apikey: apikey,
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, getThings_1.default()];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                res.json(result);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, ckRes, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, dataUtil_1.clearData('user.json')];
            case 1:
                result = _a.sent();
                console.log('Jia ~ file: user.ts ~ line 37 ~ logout ~ result', result);
                dataUtil_1.clearData('disabled.json');
                Controller_1.default.deviceMap.clear();
                return [4 /*yield*/, coolkit_open_api_1.default.user.logout()];
            case 2:
                ckRes = _a.sent();
                console.log('Jia ~ file: user.ts ~ line 41 ~ logout ~ ckRes', ckRes);
                res.json({
                    error: 0,
                    data: null,
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                res.json({
                    error: 500,
                    data: err_2,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logout = logout;
