"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CloudDeviceController = /** @class */ (function () {
    function CloudDeviceController(data) {
        this.type = 4;
        this.rssi = data.params.rssi;
    }
    return CloudDeviceController;
}());
exports.default = CloudDeviceController;
