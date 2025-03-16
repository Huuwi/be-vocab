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
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const Token_1 = require("../helpers/Token");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { username, password, repassword } = req.body;
            if (!username || !password || !repassword) {
                return res.status(400).json({
                    message: "missing data!"
                });
            }
            if (repassword != password) {
                return res.status(400).json({
                    message: "repassword not equal password"
                });
            }
            let invalidChars = "`'\"";
            for (let c of invalidChars) {
                if (username.includes(c) || password.includes(c)) {
                    return res.status(400).json({
                        message: "can't include invalid character"
                    });
                }
            }
            let userFound = yield connection.executeQuery(`select * from Users where username = '${username}' `)
                .then((r) => {
                return r[0];
            })
                .catch((e) => {
                throw new Error(e);
            });
            if (userFound) {
                return res.status(400).json({
                    message: "account exsited!"
                });
            }
            let hashPass = (0, crypto_1.createHash)('sha256').update('bacon').digest('base64');
            yield connection.executeQuery(`insert into Users (username , password ) values ('${username}' , '${hashPass}')`)
                .catch((e) => {
                throw new Error(e);
            });
            return res.status(200).json({
                message: "ok"
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "have wrong!"
            });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    message: "missing data!"
                });
            }
            let invalidChars = "`'\"";
            for (let c of invalidChars) {
                if (username.includes(c) || password.includes(c)) {
                    return res.status(400).json({
                        message: "can't include invalid character"
                    });
                }
            }
            let hashPass = (0, crypto_1.createHash)('sha256').update('bacon').digest('base64');
            let userFound = yield connection.executeQuery(`select * from Users where username = '${username}' and password = '${hashPass}' `)
                .then((r) => {
                return r[0];
            })
                .catch((e) => {
                throw new Error(e);
            });
            if (!userFound) {
                return res.status(400).json({
                    message: "username or account incorrect"
                });
            }
            res.cookie("at", (0, Token_1.generateToken)({ userId: userFound.userId }));
            return res.status(200).json({
                message: "ok",
                userData: {
                    userId: userFound.userId,
                    role: userFound.role
                }
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "have wrong!"
            });
        }
    });
}
const authController = {
    register, login
};
exports.default = authController;
