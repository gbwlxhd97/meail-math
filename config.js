import dotenv from "dotenv";
dotenv.config();

function require(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if(value === null) {
        throw new Error(`Key${key} is undefined`)
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: require('JWT_SECRET'),
        expiresInSec: parseInt(require('JWT_EXPIRE_SEC', 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(require('BCRYPT_SALT_ROUNDS',12))
    }
}