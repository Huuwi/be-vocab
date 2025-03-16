import { Request, Response } from "express";

interface Word {
    wordId: number;
    hWrite: string;
    type: string;
    synonymous: string;
    antonym: string
    definition: string;
}

interface DecodedAccessToken {
    userId?: string;
    role?: boolean;
    [key: string]: any;
}

interface CustomRequest extends Request {
    decodeAccessToken?: DecodedAccessToken;
}

const getAllWords = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery(`select * from Word`)
            .then((r) => {
                return r
            })
        res.status(200).json({
            message: "ok",
            dataWords: words
        })


    } catch (error) {
        console.log("err when getAllWords : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}


const userController = {
    getAllWords
}




export default userController