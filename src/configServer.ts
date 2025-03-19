import express, { Express } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const urls: string[] = ["http://localhost", process.env.FONT_END_URL || "::ffff:127.0.0.1", "::ffff:127.0.0.1", "http://localhost:8080", "*"]


function configApp(app: Express) {
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.static("./src/public"))
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
        origin: urls,
        credentials: true
    }))
}



export { configApp }