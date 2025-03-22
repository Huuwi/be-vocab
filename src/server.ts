import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { Connection } from "./database/connection"
import api from "./api/api";
import { configApp } from "./configServer";
import { Logger } from "@helpers/Logger";

globalThis.connection = new Connection();
globalThis.connection.connect();

globalThis.logger = new Logger({
    info_file: 'info.txt',
    error_file: 'error.txt',
});

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
configApp(app)

app.use("/api", api);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});