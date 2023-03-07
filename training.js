// training with questions
// functions for the application mode
// of the software

import { programmState, question, select, selectQuestion,prompt } from "./utils.js";
import { blue, warning, exit, yellow,whitebg } from "./design.js";


//String Def
let trainingString =
  "Sie befinden sich im Anwendungsmenü, was möchten Sie tun?\n" +
  blue("[1]") +
  " Eine Kategorie für Fragen Auswählen\n" +
  blue("[2]") +
  " Fragen aus allen Kategorie\n" +
  exit +
  " zurück zum Hauptmenü\n";
////////////////////

export async function handleTraining(ps) {
  let input = await prompt(trainingString);
  switch (input) {
    case "1":
      console.clear();
      let cat = chooseCategory(ps.categoryArray);
      let question = getQuestions(ps, cat);
      //selectQuestion(numQuestions(question, cat), question, ps);
      askQuestion(ps, question);
      //console.log(ps);
      break;
    case "2":
      let quest = ps.questionArray;
      //selectQuestion(numQuestions(quest, "Alle"), quest, ps);
      askQuestion(ps, quest);
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
async function numQuestions(array, category) {
  let num = await prompt(
    `Anzahl an Fragen aus dem Bereich ${category}: ${array.length}\n`
  );
  console.clear();
  return parseInt(num);
}

// choose category
async function chooseCategory(array) {
  let categoryString = "";
  for (let i = 0; i < array.length; i++) {
    categoryString = categoryString + blue(`[${i + 1}]`) + `${array[i]}\n`;
  }
  categoryString = "Welche Kategorie möchten Sie auswählen?\n" + categoryString;
  let index = parseFloat(await prompt(categoryString)) - 1;
  return array[index];
}

// ask questions
async function askQuestion(ps, array) {
  let ask = array;
  let type;
  for (let k = 0; k < ask.length; k++) {
    type = ask[k].type;
    let ans = "";
    switch (type) {
      case "Frage":
        console.clear();
        console.log(whitebg("Frage:"));
        ans = await prompt(yellow(`${ask[k].questionText}\n`));
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
        console.clear();
        console.log("mult choice in arbeit")
  //       console.log(whitebg("Dies ist eine Multiple-Choice Frage:"));
  //       console.log(yellow(ask[k].questionText));
  //       let que = [];
  //       let answ = [];
  //       for (let key in ask[k].answerDic) {
  //         que.push(key);
  //         answ.push(ask[k].answerDic[key]);
  //       }
  //       let quetxt = "";
  //       for (let i = 0; i < que.length; i++) {
  //         quetxt = quetxt + que[i] + " ";
  //       }
  //       ans = prompt(`${quetxt}\n`);
  //       let temp = -1;
  //       for (let j = 0; j < que.length; j++) {
  //         if (ans === que[j]) {
  //           temp = j;
  //         }
  //       }
  //       if (temp === -1) {
  //         ask[k].asked += 1;
  //         ask[k].wrong += 1;
  //         console.log("Die Anwort war nicht richtig");
  //       } else if (answ[temp] === true) {
  //         ask[k].asked += 1;
  //         console.log("Die Anwort war richtig");
  //       } else {
  //         ask[k].asked += 1;
  //         ask[k].wrong += 1;
  //         console.log("Die Anwort war nicht richtig");
  //       }
  //       break;
  //   }
   }

  // for (let z = 0; z < ask.length; z++) {
  //   ps.questionArray.push(ask[z]);
   }
  // console.clear();
}
