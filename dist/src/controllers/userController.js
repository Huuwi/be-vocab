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
const getAllWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userId = (_a = req.decodeAccessToken) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            });
            return;
        }
        let words = yield globalThis.connection.executeQuery(`select * from Word`)
            .then((r) => {
            return r;
        });
        res.status(200).json({
            message: "ok",
            dataWords: words
        });
    }
    catch (error) {
        console.log("err when getAllWords : ", error);
        res.status(500).json({
            message: "have wrong"
        });
    }
});
const userController = {
    getAllWords
};
exports.default = userController;
