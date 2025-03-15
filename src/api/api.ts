import express, { Express, Request, Response, Router } from "express"


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


export default api