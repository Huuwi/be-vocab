import { CustomRequest } from "@database/connection";
import { Bag, Word } from "@database/model";
import { Request, Response } from "express";


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
        let wordId = (req?.body as unknown as Word | undefined)?.wordId;
        if (userId === undefined) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (wordId === undefined) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery<Array<Word>>(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
                return r[0]
            })

        if (words === undefined) {
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

        if (userId === undefined) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery<Array<Word>>(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
                return r[0]
            })

        if (words === undefined) {
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
        let wordId = (req?.body as unknown as Word | undefined)?.wordId;
        if (userId === undefined) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (wordId === undefined) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery<Array<Word>>(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
                return r[0]
            })

        if (words === undefined) {
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
        console.error("err when addWordToFavorite : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}

const getFavorite = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        if (userId === undefined) {
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
        console.error("err when getFavorite : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }
}

const addWordMyWord = async (req: CustomRequest, res: Response) => {
    try {
        let userId = req.decodeAccessToken?.userId;
        let wordId = (req?.body as unknown as Word | undefined)?.wordId;
        if (userId === undefined) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (wordId === undefined) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery<Array<Word>>(`select * from Word where wordId = ${wordId}`)
            .then((r) => {
                return r[0]
            })

        if (words === undefined) {
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
        console.error("err when addWordMyWord : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}


const getMyWord = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        if (userId === undefined) {
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
        console.error("err when getMyWord : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }
}

const addNewBag = async (req: CustomRequest, res: Response) => {
    try {

        let userId = req.decodeAccessToken?.userId;
        let bagName = (req?.body as unknown as Bag | undefined)?.bagName;
        if (userId === undefined) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (bagName === undefined) {
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
        if (userId === undefined) {
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


const getWordOfBagId = async (req: CustomRequest, res: Response) => {

    try {

        let userId = req.decodeAccessToken?.userId;
        let bagId = (req?.body as unknown as Bag | undefined)?.bagId;
        if (userId === undefined) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (bagId === undefined) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery(
            `SELECT BagWord.wordId, Word.hwrite, Word.type, Word.synonymous, Word.antonym, Word.definition 
             FROM BagWord
             INNER JOIN Word ON BagWord.wordId = Word.wordId
             WHERE BagWord.bagId = ?`,
            [bagId]
        ).then((r) => {
            return r
        });

        res.status(200).json({
            message: "ok",
            dataWords: words
        })


    } catch (error) {
        console.error("err when getWordOfBagId : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }


}


const addWordToBagId = async (req: CustomRequest, res: Response) => {

    try {

        let userId = req.decodeAccessToken?.userId;
        let bagId = (req?.body as unknown as Bag | undefined)?.bagId;
        let wordId = (req?.body as unknown as Word | undefined)?.wordId;
        if (userId === undefined) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (bagId === undefined || wordId === undefined) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }

        await globalThis.connection.executeQuery(`insert into BagWord (bagId,wordId) values (${bagId},${wordId})`)
            .catch((e) => {
                throw new Error(e)
            })

        res.status(200).json({
            message: "ok",
        })


    } catch (error) {
        console.error("err when addWordToBagId : ", error);
        res.status(500).json({
            message: "have wrong"
        })
    }

}

const searchWords = async (req: CustomRequest, res: Response) => {

    try {

        let userId = req.decodeAccessToken?.userId;
        let word = (req?.body as unknown as Word | undefined)?.hWrite;
        if (userId === undefined) {
            res.status(400).json({
                message: "not found token!"
            })
            return
        }

        if (word === undefined) {
            res.status(400).json({
                message: "missing data!"
            })
            return
        }
        let words = await globalThis.connection.executeQuery<Array<Word>>(`select * from Word where hwrite like '%${word}%'`)
            .then((r) => {
                return r
            })

        res.status(200).json({
            message: "ok",
            dataWords: words
        })


    } catch (error) {
        console.error("err when searchWords : ", error);
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
    getAllBags,
    getWordOfBagId,
    addWordToBagId,
    searchWords
}




export default userController