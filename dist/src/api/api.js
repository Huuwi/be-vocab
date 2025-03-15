"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api = express_1.default.Router();
api.get("/ping", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip;
    res.cookie("test", "test");
    res.status(200).json({
        message: "your ip address : " + forwardedIp
    });
});
exports.default = api;
