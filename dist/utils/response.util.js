"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSuccess = void 0;
const ResponseSuccess = (res, data = {}, message = 'OK') => {
    return res.json({
        data,
        message,
    });
};
exports.ResponseSuccess = ResponseSuccess;
