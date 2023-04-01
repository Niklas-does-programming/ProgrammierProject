// utilitiy functions
// neccessary functions and classes
import { underline, yellow } from './design.js';
import pkg from "enquirer";
import { readData } from './readwrite.js';
import { blue, warning } from './design.js';
const { Input } = pkg;
const { MultiSelect } = pkg;

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
    let ask = questionArray[i].asked; //get how often the question was asked
    let wrg = questionArray[i].wrong; //get how often the question was answered wrong
    if (wrg === 0) {
      questionArray[i].questionValue = ask;
    } else {
      questionArray[i].questionValue = ask / wrg;
    }
  }
}

// randomizes questions array
export function randomizeQuestions(questionArray) {
  let sortArray = [];
  for (let i = questionArray.length; i > 0; i--) {
    let rand = Math.floor(Math.random() * questionArray.length);
    sortArray.push(questionArray[rand]);
    questionArray.splice(rand, 1);
  }
  questionArray = sortArray
  return questionArray;
}

//select questions by criteria (category)
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

//select amount of questions sorted by questionvalue (often wrong answered questions first)
export function selectQuestion(questionArray, amountOfQuestions) { 
  let assortedArray = questionArray.sort((a,b) => a.questionValue - b.questionText);
  assortedArray = assortedArray.slice(0, amountOfQuestions);
  return assortedArray
}

//select amount of questions sorted randomly
export function selectRandomQuestion(questionArray, amountOfQuestions) { 
  let assortedArray = randomizeQuestions(questionArray);
  assortedArray = assortedArray.slice(0, amountOfQuestions);
  return assortedArray
}

//prompt function
export async function prompt(questionText) { 
  const prompt = new Input({
  message: underline(questionText), //question = questiontext
  initial: 'Enter',
  });
  return await prompt.run();
}

//prompt mulitple-choice-prompt function
export async function multiPrompt(choicesList,questionText){
const multiprompt = new MultiSelect({
  name: 'value',
  message: questionText, //question = questiontext
  choices: choicesList, //possible answers = choicesList
  });
  return await multiprompt.run();
}

 //checks Multiple Choice Answers
export function compareMult(promptAnswers,rightAnswers){ 
  for(let i= 0;  i<= rightAnswers.length; i++){
    if(promptAnswers[i] != rightAnswers[i]) //if promptanswer value is not equal the rightanswer value -> return false
    {
      return false 
    }
  }
  return true
}

export async function userHandling(){
  let userString = ("Welche Benutzer möchten Sie laden?\n" +
  blue("[1]") + " Benutzer 1\n" +
  blue("[2]") + " Benutzer 2\n" +
  blue("[3]") + " Benutzer 3\n");
  let user;
  let ps;
  while(true){
    user = await prompt(userString);
    user.trimStart().trimEnd()
    switch (user) {
      case "1":
        ps = readData("ProgramState");
        console.clear();
        return ps;
      case "2":
        ps = readData("ProgramState2");
        console.clear();
        return ps;
      case "3":
        ps = readData("ProgramState3");
        console.clear();
        return ps;
      default:
        console.log(warning("Ungültige Eingabe"));
        break;
    }
  }
}

