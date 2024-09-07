"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: { type: Number },
    password: {
        type: String,
        unique: true,
        required: true
    }
});
userSchema.methods.generateAuthToken = function () {
    console.log("asgp", process.env.JWTPRIVATEKEY);
    const token = jsonwebtoken_1.default.sign({ _id: this._id }, "testing1234564");
    return token;
};
const validate = (user) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    });
    return schema.validate(user);
};
exports.validate = validate;
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
