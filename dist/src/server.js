"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./database/connection");
const api_1 = __importDefault(require("./api/api"));
const configServer_1 = require("./configServer");
globalThis.connection = new connection_1.Connection();
globalThis.connection.connect();
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
(0, configServer_1.configApp)(app);
app.use("/api", api_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
