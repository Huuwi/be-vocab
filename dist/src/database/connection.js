"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// dotenv.config({ path: "./.env" })
dotenv_1.default.config({ path: "E:/BE-Khanh/.env" });
class Connection {
    DATABASE_HOST;
    DATABASE_USER_NAME;
    DATABASE_PASS_WORD;
    DATABASE_NAME;
    DATABASE_PORT;
    connection;
    constructor({ DATABASE_HOST = process.env.DATABASE_HOST || "localhost", DATABASE_USER_NAME = process.env.DATABASE_USER || "root", DATABASE_PASS_WORD = process.env.DATABASE_PASSWORD || "", DATABASE_NAME = process.env.DATABASE_NAME || "ttcsn", DATABASE_PORT = Number(process.env.DATABASE_PORT) || 3306, } = {}) {
        this.DATABASE_HOST = DATABASE_HOST;
        this.DATABASE_USER_NAME = DATABASE_USER_NAME;
        this.DATABASE_PASS_WORD = DATABASE_PASS_WORD;
        this.DATABASE_NAME = DATABASE_NAME;
        this.DATABASE_PORT = DATABASE_PORT;
        this.connection = null;
    }
    async connect() {
        if (this.connection) {
            return "Already connected to database";
        }
        try {
            this.connection = await promise_1.default.createConnection({
                host: this.DATABASE_HOST,
                user: this.DATABASE_USER_NAME,
                password: this.DATABASE_PASS_WORD,
                database: this.DATABASE_NAME,
                port: this.DATABASE_PORT,
            });
            console.log("Connected successfully to the database: " + this.DATABASE_NAME);
        }
        catch (err) {
            console.error("Error when connecting to database " +
                this.DATABASE_NAME +
                " err: " +
                err.message);
        }
    }
    async disconnect() {
        if (!this.connection)
            return;
        try {
            await this.connection.end();
            console.log("Disconnect success database name " + this.DATABASE_NAME);
            this.connection = null;
        }
        catch (error) {
            console.error("Error when disconnecting from database name " +
                this.DATABASE_NAME +
                " err: " +
                error.message);
        }
    }
    async executeQuery(statement, placeholders = []) {
        if (!this.connection) {
            throw new Error("Database connection is not established.");
        }
        const [results] = await this.connection.query(statement, placeholders);
        console.log("Execute success statement");
        return results;
    }
}
exports.Connection = Connection;
