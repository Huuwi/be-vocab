import express, { Express, Request, Response, Router } from "express"
import authController from "@controllers/authController"
import middleWare from "src/middleware/middleware"
import userController from "@controllers/userController"

const api: Router = express.Router()

api.get("/ping", (req: Request, res: Response) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )

})

api.use("/auth", middleWare.checkInforAccessToken as express.RequestHandler);
api.use("/admin", middleWare.checkIsAdmin as express.RequestHandler);


api.post("/auth/test", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
})

api.post("/register", (req, res) => { authController.register(req, res) })
api.post("/login", (req, res) => { authController.login(req, res) })

//auth api
api.post("/auth/getAllWords", userController.getAllWords as express.RequestHandler)


export default api