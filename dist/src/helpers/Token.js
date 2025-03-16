"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const crypto_1 = __importDefault(require("crypto"));
const base64url_1 = __importDefault(require("base64url"));
function generateToken(data, secrectKey = process.env.TOKEN_SECRECT_KEY || "nguyenhuuduc", options = { expiresIn: 99999999 }) {
    data.timeExpried = Date.now() + Number(options.expiresIn);
    let payload = (0, base64url_1.default)(JSON.stringify(data));
    let signature = (0, base64url_1.default)(payload + secrectKey);
    let hashFun = crypto_1.default.createHash('sha256');
    signature = hashFun.update(signature).digest('hex');
    return payload + "." + signature;
}
function verifyToken(token, secrectKey = process.env.TOKEN_SECRECT_KEY || "nguyenhuuduc") {
    let [payload, signature] = token.split('.');
    let data = JSON.parse(base64url_1.default.decode(payload));
    if (data.timeExpried < Date.now()) {
        return {
            state: false,
            message: "expriedTime"
        };
    }
    let hashFun = crypto_1.default.createHash('sha256');
    let sigServer = (0, base64url_1.default)(payload + secrectKey);
    sigServer = hashFun.update(sigServer).digest('hex');
    if (sigServer != signature) {
        return {
            state: false,
            message: "invalid!"
        };
    }
    return {
        state: true,
        message: "valid",
        data
    };
}
