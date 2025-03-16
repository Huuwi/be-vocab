import crypto from "crypto"

import base64url from "base64url"

function generateToken(data: any, secrectKey: string = process.env.TOKEN_SECRECT_KEY || "nguyenhuuduc", options: any = { expiresIn: 99999999 }): any {
    data.timeExpried = Date.now() + Number(options.expiresIn)
    let payload = base64url(JSON.stringify(data))
    let signature = base64url(payload + secrectKey)
    let hashFun = crypto.createHash('sha256')
    signature = hashFun.update(signature).digest('hex')
    return payload + "." + signature
}

function verifyToken(token: string, secrectKey: string = process.env.TOKEN_SECRECT_KEY || "nguyenhuuduc") {
    let [payload, signature] = token.split('.')
    let data = JSON.parse(base64url.decode(payload))

    if (data.timeExpried < Date.now()) {
        return {
            state: false,
            message: "expriedTime"
        }
    }
    let hashFun = crypto.createHash('sha256')
    let sigServer = base64url(payload + secrectKey)
    sigServer = hashFun.update(sigServer).digest('hex')
    if (sigServer != signature) {
        return {
            state: false,
            message: "invalid!"
        }
    }

    return {
        state: true,
        message: "valid",
        data
    }
}

export { generateToken, verifyToken }