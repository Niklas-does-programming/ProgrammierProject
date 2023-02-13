// utilitiy functions
// neccessary functions and classes

export class question{
    constructor(type,questionText,answerText,category,asked,wrong){
        this.type = type;                 // what type of question
        this.questionText = questionText; // the question as string
        this.answerText = answerText;     // the answer as string
        this.category = category;         // what subject/category
        this.asked = asked;               // how often the question got asked
        this.wrong = wrong;               // how often the question got answered wrong
    }
}

export class multChoice{
    constructor(type,questionText,answerDic,category,asked,wrong){
        this.type = type;                 // what type of question
        this.questionText = questionText; // the question as string
        this.answerDic = answerDic;     // the answer as string
        this.category = category;         // what subject/category
        this.asked = asked;               // how often the question got asked
        this.wrong = wrong;               // how often the question got answered wrong
    }
}

export class programmState{
    constructor(menu ,questionArray, categoryArray){
        this.menu = menu;
        this.questionArray = questionArray;
        this.categoryArray = categoryArray;
    }
};

// statistics
export function stats(questionArray){
    let statArray;
    for(let i = 0;i < questionArray.length;i++){
        let ask = questionArray.asked[i];
        let wrg = questionArray.wrong[i];
        statArray[i][0] = questionArray.questionText[i];
        if(wrg === 0){
            statArray[i][1] = ask; //geg ändern wegen gewichtung mit anz gefragt
        }
        else{
            statArray[i][1] = ask / wrg;
        }
    }
    return statArray;
};

// sort questions
export function sortQuestions(questionArray){
    let sortArray;
    for(let i = questionArray.length;i > 0;i++){
        let rand = Math.floor(Math.random() * questionArray.length);
        sortArray.push(questionArray[rand]);
        questionArray.splice(rand,1);
    }
    return sortArray;
};

export function select(ps, criteria){
    let tmp = [];
    console.log(ps);
    for(let i = ps.questionArray.length-1; i >= 0; i--){
        let index = Object.values(ps.questionArray[i]).indexOf(criteria);
        if(index > -1){
            let element = ps.questionArray.splice(i,1);
            tmp.push(element);
        }
    }
    return(tmp);
}