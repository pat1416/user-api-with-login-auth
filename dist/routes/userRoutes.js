"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
//@ts-ignore
const User_js_1 = __importStar(require("../models/User.js"));
const auth_1 = require("../middleware/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Use `import` instead of `require`
const transformResponse_js_1 = require("../transformers/transformResponse.js"); // Ensure proper ES module syntax
// Create a new user
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, User_js_1.validate)(req.body);
        if (error)
            res.status(400).send((0, transformResponse_js_1.transformResponse)(null, error.details[0].message, 400, false));
        const { name, email, age, password } = req.body;
        const newUser = new User_js_1.default({ name, email, age, password });
        const salt = yield bcrypt_1.default.genSalt(Number(process.env.SALT));
        newUser.password = yield bcrypt_1.default.hash(newUser.password, salt);
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Authenticated
router.get("/me", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findById(req.user._id).select("-password -__v");
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.send("An error occured");
    }
}));
// Get all users
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_js_1.default.find();
        res.status(200).json((0, transformResponse_js_1.transformResponse)(users, "sucess", 200, true));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get a user by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update a user by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Delete a user by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(200).json({ message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
