import { Response, Request } from "express"
import { createHash } from "crypto"
import { generateToken } from "@helpers/Token"

async function register(req: Request, res: Response) {
    try {

        let { username, password, repassword } = req.body

        if (!username || !password || !repassword) {
            return res.status(400).json({
                message: "missing data!"
            })
        }

        if (repassword != password) {
            return res.status(400).json({
                message: "repassword not equal password"
            })
        }

        let invalidChars = "`'\""
        for (let c of invalidChars) {
            if (username.includes(c) || password.includes(c)) {
                return res.status(400).json({
                    message: "can't include invalid character"
                })
            }
        }

        let userFound = await connection.executeQuery(`select * from Users where username = '${username}' `)
            .then((r) => {
                return r[0]
            })
            .catch((e) => {
                throw new Error(e)
            })

        if (userFound) {
            return res.status(400).json({
                message: "account exsited!"
            })
        }

        let hashPass = createHash('sha256').update('bacon').digest('base64');
        await connection.executeQuery(`insert into Users (username , password ) values ('${username}' , '${hashPass}')`)
            .catch((e) => {
                throw new Error(e)
            })

        return res.status(200).json({
            message: "ok"
        })

    } catch (error) {
        return res.status(500).json({
            message: "have wrong!"
        })
    }

}


async function login(req: Request, res: Response) {
    try {

        let { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                message: "missing data!"
            })
        }

        let invalidChars = "`'\""
        for (let c of invalidChars) {
            if (username.includes(c) || password.includes(c)) {
                return res.status(400).json({
                    message: "can't include invalid character"
                })
            }
        }
        let hashPass = createHash('sha256').update('bacon').digest('base64');

        let userFound = await connection.executeQuery(`select * from Users where username = '${username}' and password = '${hashPass}' `)
            .then((r) => {
                return r[0]
            })
            .catch((e) => {
                throw new Error(e)
            })

        if (!userFound) {
            return res.status(400).json({
                message: "username or account incorrect"
            })
        }

        res.cookie("at", generateToken({ userId: userFound.userId }))

        return res.status(200).json({
            message: "ok",
            userData: {
                userId: userFound.userId,
                role: userFound.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "have wrong!"
        })
    }

}


const authController = {
    register, login

}


export default authController