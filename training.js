// training with questions
// functions for the application mode
// of the software

import { programmState, question, select, selectQuestion,prompt, multiPrompt, compareMult, stats } from "./utils.js";
import { blue, warning, exit, yellow, underline, wrong, right } from "./design.js";


//String Def
let trainingString =
  underline("Sie befinden sich im Anwendungsmenü, was möchten Sie tun?\n") +
  blue("[1]") + " Eine Kategorie für Fragen Auswählen\n" +
  blue("[2]") + " Fragen aus allen Kategorie\n" +
  exit + " zurück zum Hauptmenü\n";
////////////////////

export async function handleTraining(ps) {
  let input = await prompt(trainingString);
  switch (input) {
    case "1":
      console.clear();
      let category = await chooseCategory(ps.categoryArray);
      let questionFromSpecificCategory = await getQuestions(ps, category);
      await askQuestion(selectQuestion(questionFromSpecificCategory, await numQuestions(questionFromSpecificCategory, category)));
      break;
    case "2":
      let allCategoryQuest = ps.questionArray;
      
      await askQuestion(selectQuestion(allCategoryQuest, await numQuestions(allCategoryQuest, "aller Fragen")));
      break;
    case "exit":
      break;
    default:
      console.log("Ungültige Eingabe");
      await handleTraining(ps);
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
async function askQuestion(questionArray_) {
  let questionArray = questionArray_;
  let type;
  let end
  console.clear()
  for (let k = 0; k < questionArray.length; k++) {
    type = questionArray[k].type;
    let ans = "";
    switch (type) {
      case "Frage":
        console.log(underline("Frage:"));
        ans = await prompt(`${questionArray[k].questionText}\n`);
        if(ans === "exit"){return} ;
        if (ans === questionArray[k].answerText) {
          questionArray[k].asked += 1;
          stats(questionArray);
          console.log(right("Die Anwort war richtig"));
        }
        else {
          questionArray[k].asked += 1;
          questionArray[k].wrong += 1;
          stats(questionArray);
          console.log(wrong("Die Anwort war nicht richtig"));
          console.log("Die richtige Anwort wäre: " + questionArray[k].answerText);
        }
        console.log() 
        break;
      case "Mult-Frage":
        let choicesList = []
        let promptAnswers = []
        let rightAnswers = []
        for (const [key, val] of Object.entries(questionArray[k].answerDic)) {
          let dict = {name: key, value: val };
          choicesList.push(dict);
          if(val){rightAnswers.push(key)}
        }
        console.log(underline("Multiple-Choice Frage:"));
        console.log(yellow("Auswahl mit Pfeiltasten und Leertaste, Eingabe mit Enter"));
        promptAnswers = await multiPrompt(choicesList,questionArray[k].questionText)
        if (compareMult(promptAnswers,rightAnswers)== true) {
          questionArray[k].asked += 1;
          stats(questionArray);
          console.log(right("Die Anwort war richtig"));
        } 
        else {
          questionArray[k].asked += 1;
          questionArray[k].wrong += 1;
          stats(questionArray);
          console.log(wrong("Die Anwort war nicht richtig"));
          console.log("Die richtigen Anworten wären: " + rightAnswers);
        }
        console.log();
        break    
      }
    }
    end = await prompt("Sie haben alle Fragen dieser Kategorie beantwortet!\n" + " Durch drücken einer Taste landen Sie im Hauptmenü");
}
