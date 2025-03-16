import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@helpers/Token";
interface DecodedAccessToken {
    userId?: string;
    role?: boolean;
    [key: string]: any;
}

interface CustomRequest extends Request {
    decodeAccessToken?: DecodedAccessToken;
}

const checkInforAccessToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        req.decodeAccessToken = {};
        const at: string | undefined = req.cookies?.at;

        if (!at || at.length === 0) {
            return res.status(400).json({
                message: "Not found token!"
            });
        }

        const validAccessToken = verifyToken(at);

        if (!validAccessToken?.state) {
            return res.status(400).json({
                message: validAccessToken.message
            });
        }

        req.decodeAccessToken = validAccessToken.data;
        next();
    } catch (error) {
        console.error("Error when decoding access token:", error);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
};

const checkIsAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        req.decodeAccessToken = {};
        const at: string | undefined = req.cookies?.at;

        if (!at || at.length === 0) {
            return res.status(400).json({
                message: "Not found token!"
            });
        }

        const validAccessToken = verifyToken(at);

        if (!validAccessToken?.state) {
            return res.status(400).json({
                message: validAccessToken.message
            });
        }

        req.decodeAccessToken = validAccessToken.data;

        if (!req.decodeAccessToken?.role) {
            res.cookie("at", "");
            return res.status(400).json({
                message: "You are not admin!"
            });
        }

        next();
    } catch (error) {
        console.error("Error when decoding access token:", error);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
};




const middleWare = {
    checkInforAccessToken, checkIsAdmin
}

export default middleWare