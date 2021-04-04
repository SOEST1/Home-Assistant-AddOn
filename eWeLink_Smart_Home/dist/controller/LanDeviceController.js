"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lanControlAuthenticationUtils_1 = __importDefault(require("../utils/lanControlAuthenticationUtils"));
var LanDeviceController = /** @class */ (function () {
    function LanDeviceController() {
        this.type = 2;
    }
    return LanDeviceController;
}());
LanDeviceController.prototype.parseEncryptedData = function () {
    try {
        if (this.iv && this.devicekey && this.encryptedData) {
            var res = lanControlAuthenticationUtils_1.default.decryptionData({
                iv: this.iv,
                key: this.devicekey,
                data: this.encryptedData,
            });
            return JSON.parse(res);
        }
        return null;
    }
    catch (error) {
        console.log('Jia ~ file: LanDeviceController.ts ~ line 82 ~ error', error);
        return null;
    }
};
exports.default = LanDeviceController;
