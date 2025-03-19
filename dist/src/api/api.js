"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const middleware_1 = __importDefault(require("../../src/middleware/middleware"));
const userController_1 = __importDefault(require("../controllers/userController"));
const api = express_1.default.Router();
api.get("/ping", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip;
    res.cookie("test", "test");
    res.status(200).json({
        message: "your ip address : " + forwardedIp
    });
});
api.use("/auth", middleware_1.default.checkInforAccessToken);
api.use("/admin", middleware_1.default.checkIsAdmin);
api.post("/auth/test", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip;
    res.cookie("test", "test");
    res.status(200).json({
        message: "your ip address : " + forwardedIp
    });
});
api.post("/register", (req, res) => { authController_1.default.register(req, res); });
api.post("/login", (req, res) => { authController_1.default.login(req, res); });
//auth api
api.post("/auth/getAllWords", userController_1.default.getAllWords);
api.post("/auth/getWordById", userController_1.default.getWordById);
api.post("/auth/getRandomWord", userController_1.default.getRandomWord);
api.post("/auth/addWordToFavorite", userController_1.default.addWordToFavorite);
api.post("/auth/getFavorite", userController_1.default.getFavorite);
api.post("/auth/addWordMyWord", userController_1.default.addWordMyWord);
api.post("/auth/getMyWord", userController_1.default.getMyWord);
//admin api
exports.default = api;
