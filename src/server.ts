import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { Connection } from "./database/connection"
import api from "./api/api";
import { configApp } from "./configServer";

declare global {
    var connection: Connection
}
globalThis.connection = new Connection()
globalThis.connection.connect()

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
configApp(app)

app.use("/api", api)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});