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

const getWordById = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        let wordId = req.body.wordId
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (!wordId) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
                return r[0]
            })

        if (!words) {
            res.status(400).json({
                message: "not found word!"
            })
            return
        }
        res.status(200).json({
            message: "ok",
            dataWords: words
        })


    } catch (error) {
        console.log("err when getWordById : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}

const getRandomWord = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;

        let wordId = Math.floor(Math.random() * 1000)

        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
                return r[0]
            })

        if (!words) {
            res.status(400).json({
                message: "not found word!"
            })
            return
        }
        res.status(200).json({
            message: "ok",
            dataWords: words
        })


    } catch (error) {
        console.log("err when getRandomWord : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }
}

const addWordToFavorite = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        let wordId = req.body.wordId
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (!wordId) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
                return r[0]
            })

        if (!words) {
            res.status(400).json({
                message: "not found word!"
            })
            return
        }

        await globalThis.connection.executeQuery(`insert into Favorite (wordId,userId) values (${wordId} , ${userId})`)
            .catch((e) => {
                throw new Error(e)
            })

        res.status(200).json({
            message: "ok",
        })


    } catch (error) {
        console.log("err when addWordToFavorite : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}

const getFavorite = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery(
            `SELECT Favorite.wordId, Word.hwrite, Word.type, Word.synonymous, Word.antonym, Word.definition 
             FROM Favorite
             INNER JOIN Word ON Favorite.wordId = Word.wordId
             WHERE Favorite.userId = ?`,
            [userId]
        ).then((r) => {
            return r
        });

        res.status(200).json({
            message: "ok",
            dataWords: words
        })


    } catch (error) {
        console.log("err when getFavorite : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }
}

const addWordMyWord = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        let wordId = req.body.wordId
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (!wordId) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
                return r[0]
            })

        if (!words) {
            res.status(400).json({
                message: "not found word!"
            })
            return
        }

        await globalThis.connection.executeQuery(`insert into MyWord (wordId,userId) values (${wordId} , ${userId})`)
            .catch((e) => {
                throw new Error(e)
            })

        res.status(200).json({
            message: "ok",
        })


    } catch (error) {
        console.log("err when addWordMyWord : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}


const getMyWord = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery(
            `SELECT MyWord.wordId, Word.hwrite, Word.type, Word.synonymous, Word.antonym, Word.definition 
             FROM MyWord
             INNER JOIN Word ON MyWord.wordId = Word.wordId
             WHERE MyWord.userId = ?`,
            [userId]
        ).then((r) => {
            return r
        });

        res.status(200).json({
            message: "ok",
            dataWords: words
        })


    } catch (error) {
        console.log("err when getMyWord : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }
}

const addNewBag = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        let bagName = req.body.bagName
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (!bagName) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }

        await globalThis.connection.executeQuery(`insert into Bag (bagName,userId) values ('${bagName}',${userId})`)
            .catch((e) => {
                throw new Error(e)
            })

        res.status(200).json({
            message: "ok",
        })


    } catch (error) {
        console.log("err when addNewBag : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}

const getAllBags = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        if (!userId) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }
        let bags = await globalThis.connection.executeQuery(`select * from Bag`)
            .then((r) => {
                return r
            })
        res.status(200).json({
            message: "ok",
            dataBags: bags
        })


    } catch (error) {
        console.log("err when getAllBags : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}





const userController = {
    getAllWords,
    getWordById,
    getRandomWord,
    addWordToFavorite,
    getFavorite,
    addWordMyWord,
    getMyWord,
    addNewBag,
    getAllBags
}




export default userController