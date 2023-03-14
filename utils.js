// utilitiy functions
// neccessary functions and classes

export class question {
  constructor(type, questionText, answerText, category, asked, wrong) {
    this.type = type; // what type of question
    this.questionText = questionText; // the question as string
    this.answerText = answerText; // the answer as string
    this.category = category; // what subject/category
    this.asked = asked; // how often the question got asked
    this.wrong = wrong; // how often the question got answered wrong
  }
}

export class multipleChoice {
  constructor(type, questionText, answerDic, category, asked, wrong) {
    this.type = type; // what type of question
    this.questionText = questionText; // the question as string
    this.answerDic = answerDic; // the answer as string
    this.category = category; // what subject/category
    this.asked = asked; // how often the question got asked
    this.wrong = wrong; // how often the question got answered wrong
  }
}

export class programmState {
  constructor(menu, questionArray, categoryArray) {
    this.menu = menu;
    this.questionArray = questionArray;
    this.categoryArray = categoryArray;
  }
}

// statistics
export function stats(questionArray) {
  let statArray = [[]];
  for (let i = 0; i < questionArray.length; i++) {
    let ask = questionArray[i].asked;
    let wrg = questionArray[i].wrong;
    let arr = [];
    arr[0] = questionArray[i].questionText;
    if (wrg === 0) {
      arr[1] = ask;
      //statArray[i][1] = ask;
    } else {
      arr[1] = ask / wrg;
      //statArray[i][1] = ask / wrg;
    }
    statArray[i] = arr;
  }
  for (let j = 0; j < statArray.length; j++) {
    for (let k = 0; k < statArray.length - j - 1; k++) {
      let temp = statArray[k][1];
      let temptxt = statArray[k][0];
      if (temp > statArray[k + 1][1]) {
        statArray[k] = statArray[k + 1];
        statArray[k + 1][0] = temptxt;
        statArray[k + 1][1] = temp;
      }
    }
  }
  return statArray;
}

// sort questions
export function sortQuestions(questionArray) {
  let sortArray;
  for (let i = questionArray.length; i > 0; i++) {
    let rand = Math.floor(Math.random() * questionArray.length);
    sortArray.push(questionArray[rand]);
    questionArray.splice(rand, 1);
  }
  return sortArray;
}

export function select(ps, criteria) {
  let tmp = [];
  for (let i = ps.questionArray.length - 1; i >= 0; i--) {
    let index = Object.values(ps.questionArray[i]).indexOf(criteria);
    if (index > -1) {
      let element = ps.questionArray.splice(i, 1);
      tmp.push(element[0]);
    }
  }
  return tmp;
}

//choose Question
//Funktioniert Aktuell nicht!!!
export function selectQuestion(number, array, ps) {
  let temp = [];
  let arr = array;
  let statarr = stats(array);
  statarr = statarr.splice(0, number);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < statarr.length; j++) {
      if (arr[i].questionText === statarr[j][0]) {
        temp.push(array[i]);
        arr.splice(i, 1);
      }
    }
  }
  for (let z = 0; z < arr.length; z++) {
    ps.questionArray.push(arr[z]);
  }
  return temp;
}

import pkg from 'enquirer';
const { Input } = pkg;

export async function prompt(m) {
  const prompt = new Input({
  message: m,
  initial: 'Enter',
  });
  return await prompt.run();
  }


const { MultiSelect } = pkg;


export async function multiPrompt(){
const prompt = new MultiSelect({
  name: 'value',
  message: 'Pick your favorite colors',
  limit: 7,
  choices: [
    { name: 'aqua', value: '#00ffff' },
    { name: 'black', value: '#000000' },
    { name: 'blue', value: '#0000ff' },
    { name: 'fuchsia', value: '#ff00ff' },
    { name: 'gray', value: '#808080' },
    { name: 'green', value: '#008000' },
    { name: 'lime', value: '#00ff00' },
    { name: 'maroon', value: '#800000' },
    { name: 'navy', value: '#000080' },
    { name: 'olive', value: '#808000' },
    { name: 'purple', value: '#800080' },
    { name: 'red', value: '#ff0000' },
    { name: 'silver', value: '#c0c0c0' },
    { name: 'teal', value: '#008080' },
    { name: 'white', value: '#ffffff' },
    { name: 'yellow', value: '#ffff00' }
  ]
});
}

prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(console.error);
