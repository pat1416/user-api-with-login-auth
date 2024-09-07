"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformResponse = void 0;
const transformResponse = (data, message, code, success) => {
    return {
        status: code,
        message: success ? "success" : message,
        success,
        data
    };
};
exports.transformResponse = transformResponse;
