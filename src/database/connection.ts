import mysql2, { Connection as MySqlConnection } from "mysql2/promise";

import dotenv from "dotenv";
// dotenv.config({ path: "./.env" })

dotenv.config({ path: "E:/BE-Khanh/.env" })


type DatabaseConfig = {
    DATABASE_HOST?: string;
    DATABASE_USER_NAME?: string;
    DATABASE_PASS_WORD?: string;
    DATABASE_NAME?: string;
    DATABASE_PORT?: number;
};

class Connection {
    private DATABASE_HOST: string;
    private DATABASE_USER_NAME: string;
    private DATABASE_PASS_WORD: string;
    private DATABASE_NAME: string;
    private DATABASE_PORT: number;
    private connection: MySqlConnection | null;

    constructor({
        DATABASE_HOST = process.env.DATABASE_HOST || "localhost",
        DATABASE_USER_NAME = process.env.DATABASE_USER || "root",
        DATABASE_PASS_WORD = process.env.DATABASE_PASSWORD || "",
        DATABASE_NAME = process.env.DATABASE_NAME || "ttcsn",
        DATABASE_PORT = Number(process.env.DATABASE_PORT) || 3306,
    }: DatabaseConfig = {}) {
        this.DATABASE_HOST = DATABASE_HOST;
        this.DATABASE_USER_NAME = DATABASE_USER_NAME;
        this.DATABASE_PASS_WORD = DATABASE_PASS_WORD;
        this.DATABASE_NAME = DATABASE_NAME;
        this.DATABASE_PORT = DATABASE_PORT;
        this.connection = null;
    }

    async connect(): Promise<string | void> {
        if (this.connection) {
            return "Already connected to database";
        }
        try {
            this.connection = await mysql2.createConnection({
                host: this.DATABASE_HOST,
                user: this.DATABASE_USER_NAME,
                password: this.DATABASE_PASS_WORD,
                database: this.DATABASE_NAME,
                port: this.DATABASE_PORT,
            });
            console.log("Connected successfully to the database: " + this.DATABASE_NAME);
        } catch (err: any) {
            console.error(
                "Error when connecting to database " +
                this.DATABASE_NAME +
                " err: " +
                err.message
            );
        }
    }

    async disconnect(): Promise<void> {
        if (!this.connection) return;
        try {
            await this.connection.end();
            console.log("Disconnect success database name " + this.DATABASE_NAME);
            this.connection = null;
        } catch (error: any) {
            console.error(
                "Error when disconnecting from database name " +
                this.DATABASE_NAME +
                " err: " +
                error.message
            );
        }
    }

    async executeQuery(statement: string, placeholders: any[] = []): Promise<any> {
        if (!this.connection) {
            throw new Error("Database connection is not established.");
        }
        try {
            const [results] = await this.connection.query(statement, placeholders);
            console.log("Execute success statement");
            return results;
        } catch (error: any) {
            console.error(
                "Execute fail statement: ",
                statement,
                " placeholders: ",
                placeholders.join("  "),
                "error: ",
                error
            );
        }
    }
}


export { Connection };