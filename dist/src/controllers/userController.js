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
const getWordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userId = (_a = req.decodeAccessToken) === null || _a === void 0 ? void 0 : _a.userId;
        let wordId = req.body.wordId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            });
            return;
        }
        if (!wordId) {
            res.status(400).json({
                message: "missing data!"
            });
            return;
        }
        let words = yield globalThis.connection.executeQuery(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
            return r[0];
        });
        if (!words) {
            res.status(400).json({
                message: "not found word!"
            });
            return;
        }
        res.status(200).json({
            message: "ok",
            dataWords: words
        });
    }
    catch (error) {
        console.log("err when getWordById : ", error);
        res.status(500).json({
            message: "have wrong"
        });
    }
});
const getRandomWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userId = (_a = req.decodeAccessToken) === null || _a === void 0 ? void 0 : _a.userId;
        let wordId = Math.floor(Math.random() * 1000);
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            });
            return;
        }
        let words = yield globalThis.connection.executeQuery(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
            return r[0];
        });
        if (!words) {
            res.status(400).json({
                message: "not found word!"
            });
            return;
        }
        res.status(200).json({
            message: "ok",
            dataWords: words
        });
    }
    catch (error) {
        console.log("err when getRandomWord : ", error);
        res.status(500).json({
            message: "have wrong"
        });
    }
});
const addWordToFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userId = (_a = req.decodeAccessToken) === null || _a === void 0 ? void 0 : _a.userId;
        let wordId = req.body.wordId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            });
            return;
        }
        if (!wordId) {
            res.status(400).json({
                message: "missing data!"
            });
            return;
        }
        let words = yield globalThis.connection.executeQuery(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
            return r[0];
        });
        if (!words) {
            res.status(400).json({
                message: "not found word!"
            });
            return;
        }
        yield globalThis.connection.executeQuery(`insert into Favorite (wordId,userId) values (${wordId} , ${userId})`)
            .catch((e) => {
            throw new Error(e);
        });
        res.status(200).json({
            message: "ok",
        });
    }
    catch (error) {
        console.log("err when addWordToFavorite : ", error);
        res.status(500).json({
            message: "have wrong"
        });
    }
});
const getFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userId = (_a = req.decodeAccessToken) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            });
            return;
        }
        let words = yield globalThis.connection.executeQuery(`SELECT Favorite.wordId, Word.hwrite, Word.type, Word.synonymous, Word.antonym, Word.definition 
             FROM Favorite
             INNER JOIN Word ON Favorite.wordId = Word.wordId
             WHERE Favorite.userId = ?`, [userId]).then((r) => {
            return r;
        });
        res.status(200).json({
            message: "ok",
            dataWords: words
        });
    }
    catch (error) {
        console.log("err when getFavorite : ", error);
        res.status(500).json({
            message: "have wrong"
        });
    }
});
const addWordMyWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userId = (_a = req.decodeAccessToken) === null || _a === void 0 ? void 0 : _a.userId;
        let wordId = req.body.wordId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            });
            return;
        }
        if (!wordId) {
            res.status(400).json({
                message: "missing data!"
            });
            return;
        }
        let words = yield globalThis.connection.executeQuery(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
            return r[0];
        });
        if (!words) {
            res.status(400).json({
                message: "not found word!"
            });
            return;
        }
        yield globalThis.connection.executeQuery(`insert into MyWord (wordId,userId) values (${wordId} , ${userId})`)
            .catch((e) => {
            throw new Error(e);
        });
        res.status(200).json({
            message: "ok",
        });
    }
    catch (error) {
        console.log("err when addWordMyWord : ", error);
        res.status(500).json({
            message: "have wrong"
        });
    }
});
const getMyWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userId = (_a = req.decodeAccessToken) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            });
            return;
        }
        let words = yield globalThis.connection.executeQuery(`SELECT MyWord.wordId, Word.hwrite, Word.type, Word.synonymous, Word.antonym, Word.definition 
             FROM MyWord
             INNER JOIN Word ON MyWord.wordId = Word.wordId
             WHERE MyWord.userId = ?`, [userId]).then((r) => {
            return r;
        });
        res.status(200).json({
            message: "ok",
            dataWords: words
        });
    }
    catch (error) {
        console.log("err when getMyWord : ", error);
        res.status(500).json({
            message: "have wrong"
        });
    }
});
const userController = {
    getAllWords,
    getWordById,
    getRandomWord,
    addWordToFavorite,
    getFavorite,
    addWordMyWord,
    getMyWord
};
exports.default = userController;
