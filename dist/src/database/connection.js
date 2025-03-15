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
    constructor({ DATABASE_HOST = process.env.DATABASE_HOST || "localhost", DATABASE_USER_NAME = process.env.DATABASE_USER || "root", DATABASE_PASS_WORD = process.env.DATABASE_PASSWORD || "", DATABASE_NAME = process.env.DATABASE_NAME || "ttcsn", DATABASE_PORT = Number(process.env.DATABASE_PORT) || 3306, } = {}) {
        this.DATABASE_HOST = DATABASE_HOST;
        this.DATABASE_USER_NAME = DATABASE_USER_NAME;
        this.DATABASE_PASS_WORD = DATABASE_PASS_WORD;
        this.DATABASE_NAME = DATABASE_NAME;
        this.DATABASE_PORT = DATABASE_PORT;
        this.connection = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                return "Already connected to database";
            }
            try {
                this.connection = yield promise_1.default.createConnection({
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
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection)
                return;
            try {
                yield this.connection.end();
                console.log("Disconnect success database name " + this.DATABASE_NAME);
                this.connection = null;
            }
            catch (error) {
                console.error("Error when disconnecting from database name " +
                    this.DATABASE_NAME +
                    " err: " +
                    error.message);
            }
        });
    }
    executeQuery(statement_1) {
        return __awaiter(this, arguments, void 0, function* (statement, placeholders = []) {
            if (!this.connection) {
                throw new Error("Database connection is not established.");
            }
            try {
                const [results] = yield this.connection.query(statement, placeholders);
                console.log("Execute success statement");
                return results;
            }
            catch (error) {
                console.error("Execute fail statement: ", statement, " placeholders: ", placeholders.join("  "), "error: ", error);
            }
        });
    }
}
exports.Connection = Connection;
