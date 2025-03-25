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
api.post("/auth/getAllWords", userController.getAllWords as unknown as express.RequestHandler)
api.post("/auth/getWordById", userController.getWordById as unknown as express.RequestHandler)
api.post("/auth/getRandomWord", userController.getRandomWord as unknown as express.RequestHandler)
api.post("/auth/addWordToFavorite", userController.addWordToFavorite as unknown as express.RequestHandler)
api.post("/auth/getFavorite", userController.getFavorite as unknown as express.RequestHandler)
api.post("/auth/addWordMyWord", userController.addWordMyWord as unknown as express.RequestHandler)
api.post("/auth/getMyWord", userController.getMyWord as unknown as express.RequestHandler)
api.post("/auth/addNewBag", userController.addNewBag as unknown as express.RequestHandler)
api.post("/auth/getAllBags", userController.getAllBags as unknown as express.RequestHandler)
api.post("/auth/getWordOfBagId", userController.getWordOfBagId as unknown as express.RequestHandler)
api.post("/auth/addWordToBagId", userController.addWordToBagId as unknown as express.RequestHandler)
api.post("/auth/searchWords", userController.searchWords as unknown as express.RequestHandler)
api.post("/auth/getAllReadings", userController.getAllReadings as unknown as express.RequestHandler)
api.post("/auth/getDesReadingById", userController.getDesReadingById as unknown as express.RequestHandler)



//admin api


export default api