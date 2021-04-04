"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var LanControlAuthenticationUtils = /** @class */ (function () {
    function LanControlAuthenticationUtils() {
    }
    // export default class LanControlAuthenticationUtils {
    LanControlAuthenticationUtils.encryptionData = function (_a) {
        var iv = _a.iv, key = _a.key, data = _a.data;
        //加密
        try {
            //加密
            var cipher = crypto_js_1.default.AES.encrypt(data, crypto_js_1.default.MD5(key), {
                iv: crypto_js_1.default.enc.Utf8.parse(iv),
                mode: crypto_js_1.default.mode.CBC,
                padding: crypto_js_1.default.pad.Pkcs7,
            });
            var base64Cipher = cipher.ciphertext.toString(crypto_js_1.default.enc.Base64);
            return base64Cipher;
        }
        catch (e) {
            console.error(e);
        }
    };
    LanControlAuthenticationUtils.decryptionData = function (_a) {
        var iv = _a.iv, key = _a.key, data = _a.data;
        //解密
        var bytes = crypto_js_1.default.AES.decrypt(data, crypto_js_1.default.MD5(key), {
            iv: crypto_js_1.default.enc.Utf8.parse(iv),
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        var decryptedData = bytes.toString(crypto_js_1.default.enc.Utf8);
        return decryptedData;
    };
    LanControlAuthenticationUtils.encryptionBase64 = function (str) {
        return crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.enc.Utf8.parse(str));
    };
    LanControlAuthenticationUtils.decryptionBase64 = function (base64Str) {
        return crypto_js_1.default.enc.Base64.parse(base64Str).toString(crypto_js_1.default.enc.Utf8);
    };
    return LanControlAuthenticationUtils;
}());
exports.default = LanControlAuthenticationUtils;
