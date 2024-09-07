"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(403).send("Access denied.");
        const decoded = jsonwebtoken_1.default.verify(token, 'testing1234564');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
};
exports.auth = auth;
