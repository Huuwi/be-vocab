import express, { Express, Request, Response, Router } from "express"
import authController from "@controllers/authController"
import middleWare from "src/middleware/middleware"
import userController from "@controllers/userController"

const api: Router = express.Router()

//test
api.get("/ping", (req: Request, res: Response) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )

})

//middleware
api.use("/auth", middleWare.checkInforAccessToken as express.RequestHandler);
api.use("/admin", middleWare.checkIsAdmin as express.RequestHandler);

//common

api.post("/register", (req, res) => { authController.register(req, res) })
api.post("/login", (req, res) => { authController.login(req, res) })

//auth api
api.post("/auth/getAllWords", userController.getAllWords as express.RequestHandler)
api.post("/auth/getWordById", userController.getWordById as express.RequestHandler)
api.post("/auth/getRandomWord", userController.getRandomWord as express.RequestHandler)
api.post("/auth/addWordToFavorite", userController.addWordToFavorite as express.RequestHandler)
api.post("/auth/getFavorite", userController.getFavorite as express.RequestHandler)
api.post("/auth/addWordMyWord", userController.addWordMyWord as express.RequestHandler)
api.post("/auth/getMyWord", userController.getMyWord as express.RequestHandler)
api.post("/auth/addNewBag", userController.addNewBag as express.RequestHandler)
api.post("/auth/getAllBags", userController.getAllBags as express.RequestHandler)



//admin api


export default api