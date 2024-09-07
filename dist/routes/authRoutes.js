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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("Invalid email or password");
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid email or password");
        //@ts-ignore
        const token = user === null || user === void 0 ? void 0 : user.generateAuthToken();
        res.send(token);
    }
    catch (error) {
        console.log(error);
        res.send("An error occured");
    }
}));
const validate = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    });
    return schema.validate(user);
};
exports.default = router;
