// utilitiy functions
// neccessary functions and classes

export class question {
  constructor(type, questionText, answerText, category, asked, wrong, questionValue) {
    this.type = type; // what type of question
    this.questionText = questionText; // the question as string
    this.answerText = answerText; // the answer as string
    this.category = category; // what subject/category
    this.asked = asked; // how often the question got asked
    this.wrong = wrong; // how often the question got answered wrong
    this.questionValue = questionValue; // asked/wrong 
  }
}

export class multipleChoice {
  constructor(type, questionText, answerDic, category, asked, wrong, questionValue) {
    this.type = type; // what type of question
    this.questionText = questionText; // the question as string
    this.answerDic = answerDic; // the answer as dictionary
    this.category = category; // what subject/category
    this.asked = asked; // how often the question got asked
    this.wrong = wrong; // how often the question got answered wrong
    this.questionValue = questionValue; // asked/wrong 
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
  for (let i = 0; i < questionArray.length; i++) {
    let ask = questionArray[i].asked;
    let wrg = questionArray[i].wrong;
    if (wrg === 0) {
      questionArray[i].questionValue = ask;
      //statArray[i][1] = ask;
    } else {
      questionArray[i].questionValue = ask / wrg;
      //statArray[i][1] = ask / wrg;
    }
  }
}

// sort questions
export function randomizeQuestions(questionArray) {
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

export function selectQuestion(questionArray, amountOfQuestions) {
  let assortedArray = questionArray.sort((a,b) => a.questionValue - b.questionText)
  assortedArray = assortedArray.slice(0, amountOfQuestions-1);
  return assortedArray
}

//choose Question
//Funktioniert Aktuell nicht!!!
// export function selectQuestion(number, array, ps) {
//   let temp = [];
//   let arr = array;
//   let statarr = stats(array);
//   statarr = statarr.splice(0, number);
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < statarr.length; j++) {
//       if (arr[i].questionText === statarr[j][0]) {
//         temp.push(array[i]);
//         arr.splice(i, 1);
//       }
//     }
//   }
//   for (let z = 0; z < arr.length; z++) {
//     ps.questionArray.push(arr[z]);
//   }
//   return temp;
// }

import pkg from "enquirer";
const { Input } = pkg;
import { underline, yellow } from './design.js';

export async function prompt(m) {
  const prompt = new Input({
  message: underline(m),
  initial: 'Enter',
  });
  return await prompt.run();
}


const { MultiSelect } = pkg;

export async function multiPrompt(choicesList,questionText){
const multiprompt = new MultiSelect({
  name: 'value',
  message: questionText,
  choices: choicesList,
  });
  return await multiprompt.run();
}

export function compareMult(promptAnswers,rightAnswers){
  for(let i= 0;  i<= rightAnswers.length; i++){
    if(promptAnswers[i] != rightAnswers[i])
    {
      return false
    }
  }
  return true
}

