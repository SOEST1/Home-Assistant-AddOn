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
var lodash_1 = __importDefault(require("lodash"));
var HASocketClass_1 = __importDefault(require("../class/HASocketClass"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var generateLovelace = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, title, views, lovelace, tmp, _loop_1, _a, _b, device;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, HASocketClass_1.default.getLovelace()];
            case 1:
                res = _d.sent();
                if (!Array.isArray(res.views)) return [3 /*break*/, 3];
                title = res.title, views = res.views;
                lovelace = { path: '', title: 'eWeLink Smart Home', badges: [], cards: [] };
                tmp = lodash_1.default.findIndex(views, { title: 'eWeLink Smart Home' });
                if (~tmp) {
                    lovelace = views[tmp];
                }
                _loop_1 = function (device) {
                    if (device instanceof CloudMultiChannelSwitchController_1.default || device instanceof LanMultiChannelSwitchController_1.default) {
                        console.log('Jia ~ file: generateLovelace.ts ~ line 24 ~ generateLovelace ~ device', device);
                        if (!device.maxChannel || device.maxChannel === 1 || !device.deviceName) {
                            return "continue";
                        }
                        var entities = Array.from({ length: device.maxChannel }, function (v, k) {
                            return device.entityId + "_" + (k + 1);
                        });
                        var tmpCard = {
                            type: 'entities',
                            entities: entities,
                            title: device.deviceName,
                            state_color: true,
                        };
                        var index = lodash_1.default.findIndex(lovelace.cards, { title: device.deviceName });
                        if (~index) {
                            lovelace.cards[index] = tmpCard;
                        }
                        else {
                            lovelace.cards.push(tmpCard);
                        }
                    }
                };
                try {
                    for (_a = __values(Controller_1.default.deviceMap.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        device = _b.value;
                        _loop_1(device);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (~tmp) {
                    views[tmp] = lovelace;
                }
                else {
                    views.push(lovelace);
                }
                console.log('Jia ~ file: generateLovelace.ts ~ line 53 ~ generateLovelace ~ lovelace', lovelace);
                return [4 /*yield*/, HASocketClass_1.default.query({
                        type: 'lovelace/config/save',
                        config: {
                            title: title,
                            views: views,
                        },
                    })];
            case 2: return [2 /*return*/, _d.sent()];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = generateLovelace;
