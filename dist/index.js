"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/userbd';
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
// Connect to MongoDB and start server
//@ts-ignore
mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => console.error(err));
