"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var devices_1 = require("../services/devices");
var router = express_1.default.Router();
router.get('/', devices_1.getDevices);
router.get('/refresh', function (req, res, next) {
    req.body.refresh = true;
    next();
}, devices_1.getDevices);
router.post('/disabled', devices_1.disableDevice);
router.post('/updateName', devices_1.updateDeviceName);
exports.default = router;
