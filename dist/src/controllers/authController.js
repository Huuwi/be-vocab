"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const Token_1 = require("@helpers/Token");
async function register(req, res) {
    try {
        let { username, password, repassword } = req.body;
        if (username === undefined || password === undefined || repassword === undefined) {
            return res.status(400).json({
                message: "missing data!"
            });
        }
        if (repassword !== password) {
            return res.status(400).json({
                message: "repassword not equal password"
            });
        }
        if ((0, Token_1.sql_might_has_injection)(username) || (0, Token_1.sql_might_has_injection)(password)) {
            return res.status(400).json({
                message: 'Password or Username might be invalid',
            });
        }
        let userFound = await globalThis.connection.executeQuery(`select * from Users where username = '${username}' `)
            .then((r) => {
            return r[0];
        })
            .catch((e) => {
            throw new Error(e);
        });
        if (userFound !== undefined) {
            return res.status(400).json({
                message: "account exsited!"
            });
        }
        let hashPass = (0, crypto_1.createHash)('sha256').update('bacon').digest('base64');
        await connection.executeQuery(`insert into Users (username , password ) values ('${username}' , '${hashPass}')`)
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
}
async function login(req, res) {
    try {
        let { username, password } = req.body;
        if (username === undefined || password === undefined) {
            return res.status(400).json({
                message: "missing data!"
            });
        }
        if ((0, Token_1.sql_might_has_injection)(username) || (0, Token_1.sql_might_has_injection)(password)) {
            return res.status(400).json({
                message: 'Password or Username might be invalid',
            });
        }
        let hashPass = (0, crypto_1.createHash)('sha256').update('bacon').digest('base64');
        let userFound = await connection.executeQuery(`select * from Users where username = '${username}' and password = '${hashPass}' `)
            .then((r) => {
            return r[0];
        })
            .catch((e) => {
            throw new Error(e);
        });
        if (userFound === undefined) {
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
}
const authController = {
    register, login
};
exports.default = authController;
