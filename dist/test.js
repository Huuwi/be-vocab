"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./src/helpers/Token");
console.log((0, Token_1.generateToken)({
    userId: 1
}));
console.log((0, Token_1.verifyToken)("eyJ1c2VySWQiOjEsInRpbWVFeHByaWVkIjoxNzQyMTQ1Njk2MzIyfQ.90bf08682e5dea3810805d317c75caed617760b83ac34c29e69dea4a040b36e8"));
