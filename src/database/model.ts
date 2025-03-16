
//----------------------------------------interface model of database --------------------------------------------

interface Users {
    userId: number;
    username: string;
    password: string;
    role: number
}

interface Word {
    wordId: number;
    hWrite: string;
    type: string;
    synonymous: string;
    antonym: string
    definition: string;
}

interface MyWord {
    myWordId: number;
    wordId: number;
    userId: number
}


interface Favorite {
    favoriteId: number;
    wordId: number;
    userId: number
}

interface Bag {
    bagId: number;
    userId: number;
    bagName: string;
}

interface BagWord {
    bagwordId: number;
    bagId: number;
    wordId: number;
}

interface Reading {
    readingId: number;
    content: string;
    readingName: string;
    requirement: string;
}

interface QA {
    QAId: number;
    readingId: number;
    question: string;
    answer: string;
}








//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++