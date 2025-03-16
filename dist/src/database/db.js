"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const fs_1 = __importDefault(require("fs"));
// let r = fs.readFileSync("./r.json", "utf-8")
// let rs: rW[] = JSON.parse(r)
// console.log(rs);
// let data = fs.readFileSync("../../data/1.json", "utf-8")
// let data1: any = JSON.parse(data)
// let wordData = fs.readFileSync("../../newdata.json", "utf-8")
// let ws: word[] = JSON.parse(wordData)
// console.log(ws);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new connection_1.Connection();
    yield connection.connect();
    // let res: any[] = []
    // for (let e of Object.keys(data1)) {
    //     res.push({
    //         hWrite: e,
    //         type: data1[e].MEANINGS[0][0],
    //         synonymous: data1[e].SYNONYMS.join("___"),
    //         antonym: data1[e].ANTONYMS.join("___"),
    //         definition: data1[e].MEANINGS[0][1]
    //     })
    // }
    // fs.writeFileSync("../../newdata.json", JSON.stringify(res))
    //-----------------------------------------------------------------------------------------------------------------------------------------
    // await connection.executeQuery(`create table Users(
    //         userId int primary key not null AUTO_INCREMENT,
    //         username varchar(30),
    //         password varchar(100),
    //         role boolean default 0
    //     )`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // await connection.executeQuery(`create table Word(
    //     wordId int primary key not null AUTO_INCREMENT,
    //     hwrite varchar(50),
    //     type varchar(50),
    //     synonymous text CHARACTER SET utf8mb4,
    //     antonym text CHARACTER SET utf8mb4,
    //     definition text CHARACTER SET utf8mb4
    //     )`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // await connection.executeQuery(`create table Word(
    //     wordId int primary key not null AUTO_INCREMENT,
    //     hwrite varchar(50),
    //     type varchar(50),
    //     synonymous text CHARACTER SET utf8mb4,
    //     antonym text CHARACTER SET utf8mb4,
    //     definition text CHARACTER SET utf8mb4
    //     )`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // await connection.executeQuery(`create table MyWord(
    //     myWordId int primary key not null AUTO_INCREMENT,
    //     wordId int ,
    //     userId int 
    //     )`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // await connection.executeQuery(`create table Favorite(
    //     favoriteId int primary key not null AUTO_INCREMENT,
    //     wordId int ,
    //     userId int 
    //     )`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // await connection.executeQuery(`create table Bag(
    //     bagId int primary key not null AUTO_INCREMENT,
    //     userId int ,
    //     bagName text CHARACTER SET utf8mb4
    //     )`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // await connection.executeQuery(`create table BagWord(
    //     bagwordId int primary key not null AUTO_INCREMENT,
    //     bagId int,
    //     wordId int
    //     )`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // await connection.executeQuery(`create table Reading(
    //     readingId int primary key not null AUTO_INCREMENT,
    //     content text CHARACTER SET utf8mb4,
    //     name text CHARACTER SET utf8mb4,
    //     requirement text CHARACTER SET utf8mb4)`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // await connection.executeQuery(`create table QA(
    //     QAId int primary key not null AUTO_INCREMENT,
    //     readingId int,
    //     question text CHARACTER SET utf8mb4,
    //     answer text CHARACTER SET utf8mb4
    //     )`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    //--------------------------------------------------------------------------------------------------------------------
    // await connection.executeQuery(`drop table Users`).then((res) => {
    //     console.log(res);
    // }).catch((e) => {
    //     console.log(e);
    // })
    // for (let e of ws) {
    //     await connection.executeQuery(`insert into Word (hWrite , type , synonymous, antonym, definition) values ('${e.hWrite}' , '${e.type}' , '${e.synonymous}' , '${e.antonym}' , '${e.definition}')`)
    //         .then((res) => {
    //             console.log(res);
    //         }).catch((e) => {
    //             console.log(e);
    //         })
    // }
    yield connection.executeQuery(`select * from Word`).then((res) => {
        fs_1.default.writeFileSync("./test.json", JSON.stringify(res));
    });
    // for (let i = 0; i < rs.length; i++) {
    // await connection.executeQuery(`insert into Reading (readingId , content , name, requirement) values (${i + 1} , '${rs[i].content}' , '${rs[i].name}' , '${rs[i].requirement}')`)
    //     .then((res) => {
    //         console.log(res);
    //     }).catch((e) => {
    //         console.log(e);
    //     })
    // console.log(rs[i]);
    // for (let j = 0; j < rs[i].question.length; j++) {
    //     await connection.executeQuery(`insert into QA (readingId , question , answer) values (${i + 1} , '${rs[i].question[j]}' , '${rs[i].answer[j]}')`)
    //         .then((res) => {
    //             console.log(res);
    //         }).catch((e) => {
    //             console.log(e);
    //         })
    //     // console.log(rs[i].question[j]);
    //     // console.log(rs[i].answer[j]);
    //     // console.log("____________________________");
    //     // console.log(rs[i].question[j] + "_____________" + rs[i].answer[j]);
    // }
    // }
    yield connection.disconnect();
});
main().catch((err) => console.error("Error in main function:", err));
