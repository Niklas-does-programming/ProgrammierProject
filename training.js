// training with questions
// functions for the application mode
// of the software

import { programmState, question, select, selectQuestion } from "./utils.js";

import psp from "prompt-sync-plus";
const prompt = psp();

//String Def
let trainingString =
  "Sie befinden sich im Anwendungsmenü, was möchten Sie tun?\n" +
  "[1] Eine Kategorie für Fragen Auswählen\n" +
  "[2] Fragen aus allen Kategorie\n" +
  "[exit] zurück zum Hauptmenü\n";
////////////////////

export function handleTraining(ps) {
  let input = prompt(trainingString);
  switch (input) {
    case "1":
      console.clear();
      let cat = chooseCategory(ps.categoryArray);
      let question = getQuestions(ps, cat);
      selectQuestion(numQuestions(question, cat), question);
      askQuestion(ps, question);
      //console.log(ps);
      break;
    case "2":
      break;
    case "exit":
      break;
    default:
      console.log("Ungültige Eingabe");
      handleTraining(ps);
      break;
  }
  console.clear();
}

// get questions
function getQuestions(ps, category) {
  let temp = select(ps, category);
  return temp;
}

// number of questions to be asked
function numQuestions(array, category) {
  let num = prompt(`Anzahl an Fragen zum Thema ${category}: ${array.length}`);
  console.clear();
  return num;
}

// choose category
function chooseCategory(array) {
  let categoryString = "";
  for (let i = 0; i < array.length; i++) {
    categoryString = categoryString + `[${i + 1}] ${array[i]}\n`;
  }
  categoryString = "Welche Kategorie möchten Sie auswählen?\n" + categoryString;
  let index = parseFloat(prompt(categoryString)) - 1;
  return array[index];
}

// ask questions
function askQuestion(ps, array) {
  let ask = array;
  let type;
  for (let k = 0; k < ask.length; k++) {
    type = ask[k].type;
    let ans = "";
    switch (type) {
      case "Frage":
        ans = prompt(`${ask[k].questionText}\n`);
        if (ans === ask[k].answerText) {
          ask[k].asked += 1;
          console.log("Die Anwort war richtig");
        } else {
          ask[k].asked += 1;
          ask[k].wrong += 1;
          console.log("Die Anwort war nicht richtig");
        }
        break;
      case "Mult-Frage":
        console.log(ask[k].questionText);
        let que = [];
        let answ = [];
        for (let key in ask[k].answerDic) {
          que.push(key);
          answ.push(ask[k].answerDic[key]);
        }
        let quetxt = "";
        for (let i = 0; i < que.length; i++) {
          quetxt = quetxt + que[i] + " ";
        }
        ans = prompt(`${quetxt}\n`);
        let temp = -1;
        for (let j = 0; j < que.length; j++) {
          if (ans === que[j]) {
            temp = j;
          }
        }
        if (temp === -1) {
          ask[k].asked += 1;
          ask[k].wrong += 1;
          console.log("Die Anwort war nicht richtig");
        } else if (answ[temp] === true) {
          ask[k].asked += 1;
          console.log("Die Anwort war richtig");
        } else {
          ask[k].asked += 1;
          ask[k].wrong += 1;
          console.log("Die Anwort war nicht richtig");
        }
        break;
    }
  }

  for (let z = 0; z < ask.length; z++) {
    ps.questionArray.push(ask[z]);
  }
  console.clear();
}
