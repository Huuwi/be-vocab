import { generateToken, verifyToken } from "./src/helpers/Token";

console.log(generateToken({
    userId: 1
}));



console.log(verifyToken("eyJ1c2VySWQiOjEsInRpbWVFeHByaWVkIjoxNzQyMTQ1Njk2MzIyfQ.90bf08682e5dea3810805d317c75caed617760b83ac34c29e69dea4a040b36e8"));
