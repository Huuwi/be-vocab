import { CustomRequest } from "@database/connection";
import { Bag, Reading, Word, QA } from "@database/model";
import { Request, Response } from "express";
import { sql_might_has_injection } from "@helpers/Token";

async function addNewWord(req: CustomRequest, res: Response) {
    let { hWrite, antonym, definition, synonymous, type } = (req.body as unknown as Word);
    let { userId } = req.decodeAccessToken as any;
    //valid sql injection
    if (sql_might_has_injection(hWrite) || sql_might_has_injection(antonym) || sql_might_has_injection(definition) || sql_might_has_injection(synonymous) || sql_might_has_injection(type)) {
        return res.status(400).json({
            message: 'Word might be invalid',
        })
    }
    //check word exist
    let wordFound = await globalThis.connection.executeQuery<Array<Word>>(`select * from Word where hWrite = '${hWrite}' `)
        .then((r) => {
            return r[0];
        })
        .catch((e) => {
            throw new Error(e)
        });
    if (wordFound !== undefined) {
        return res.status(400).json({
            message: "word exsited!"
        })
    }
    //insert word
    await globalThis.connection.executeQuery(`insert into Word (hWrite , antonym , definition , synonymous , type) values ('${hWrite}' , '${antonym}' , '${definition}' , '${synonymous}' , '${type}')`)
        .catch((e) => {
            throw new Error(e)
        })
    return res.status(200).json({
        message: "ok"
    })
}

async function deleteWord(req: CustomRequest, res: Response) {

    let { wordId } = req.body as unknown as Word;

    //check word exist
    let wordFound = await globalThis.connection.executeQuery<Array<Word>>(`select * from Word where id = '${wordId}' `)
        .then((r) => {
            return r[0];
        })
        .catch((e) => {
            throw new Error(e)
        });
    if (wordFound === undefined) {
        return res.status(400).json({
            message: "word not exsited!"
        })
    }
    //delete word
    await globalThis.connection.executeQuery(`delete from Word where id = '${wordId}' `)
        .catch((e) => {
            throw new Error(e)
        })
    return res.status(200).json({
        message: "ok"
    })
}


async function updateWord(req: CustomRequest, res: Response) {

    let { wordId, hWrite, antonym, definition, synonymous, type } = (req.body as unknown as Word);
    let { userId } = req.decodeAccessToken as any;
    //valid sql injection
    if (sql_might_has_injection(hWrite) || sql_might_has_injection(antonym) || sql_might_has_injection(definition) || sql_might_has_injection(synonymous) || sql_might_has_injection(type)) {
        return res.status(400).json({
            message: 'Word might be invalid',
        })
    }
    //check word exist
    let wordFound = await globalThis.connection.executeQuery<Array<Word>>(`select * from Word where id = '${wordId}' `)
        .then((r) => {
            return r[0];
        })
        .catch((e) => {
            throw new Error(e)
        });
    if (wordFound === undefined) {
        return res.status(400).json({
            message: "word not exsited!"
        })
    }
    //update word
    await globalThis.connection.executeQuery(`update Word set hWrite = '${hWrite}' , antonym = '${antonym}' , definition = '${definition}' , synonymous = '${synonymous}' , type = '${type}' where id = '${wordId}' `)
        .catch((e) => {
            throw new Error(e)
        })
    return res.status(200).json({
        message: "ok"
    })

}





const adminController = {
    addNewWord,
    deleteWord,
    updateWord
}

export default adminController