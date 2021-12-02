const jwt = require("jsonwebtoken");
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const tokenModel = require("../models/token-model");


class TokenService {
    generateTokens(payload) {
        const token = jwt.sign(payload, JWT_TOKEN_SECRET, {
            expiresIn: "1y",
        });

        return { token };
    }

    async storeToken(token, userId) {
        await tokenModel.create({ token, userId });
    }


    async updateToken(token, userId) {
        await tokenModel.updateOne({ userId }, { token });
    }
}

module.exports = new TokenService();