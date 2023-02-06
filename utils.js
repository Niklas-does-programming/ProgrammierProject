// utilitiy functions
// neccessary functions and classes

export class question{
    constructor(type,question,answer,category,asked,wrong){
        this.type = type;         // what type of question
        this.question = question; // the question as string
        this.answer = answer;     // the answer as string
        this.category = category; // what subject/category
        this.asked = asked;       // how often the question got asked
        this.wrong = wrong;       // how often the question got answered wrong
    }
}

export class programmState{
    constructor(menu ,questionArray, categoryArray){
        this.menu = menu;
        this.questionArray = questionArray;
        this.categoryArray = categoryArray;
    }
};


// sort questions