"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../helpers/Token");
const checkInforAccessToken = (req, res, next) => {
    var _a;
    try {
        req.decodeAccessToken = {};
        const at = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.at;
        if (!at || at.length === 0) {
            return res.status(400).json({
                message: "Not found token!"
            });
        }
        const validAccessToken = (0, Token_1.verifyToken)(at);
        if (!(validAccessToken === null || validAccessToken === void 0 ? void 0 : validAccessToken.state)) {
            return res.status(400).json({
                message: validAccessToken.message
            });
        }
        req.decodeAccessToken = validAccessToken.data;
        next();
    }
    catch (error) {
        console.error("Error when decoding access token:", error);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
};
const checkIsAdmin = (req, res, next) => {
    var _a, _b;
    try {
        req.decodeAccessToken = {};
        const at = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.at;
        if (!at || at.length === 0) {
            return res.status(400).json({
                message: "Not found token!"
            });
        }
        const validAccessToken = (0, Token_1.verifyToken)(at);
        if (!(validAccessToken === null || validAccessToken === void 0 ? void 0 : validAccessToken.state)) {
            return res.status(400).json({
                message: validAccessToken.message
            });
        }
        req.decodeAccessToken = validAccessToken.data;
        if (!((_b = req.decodeAccessToken) === null || _b === void 0 ? void 0 : _b.role)) {
            res.cookie("at", "");
            return res.status(400).json({
                message: "You are not admin!"
            });
        }
        next();
    }
    catch (error) {
        console.error("Error when decoding access token:", error);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
};
const middleWare = {
    checkInforAccessToken, checkIsAdmin
};
exports.default = middleWare;
