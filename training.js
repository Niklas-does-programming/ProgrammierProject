// training with questions
// functions for the application mode
// of the software

import { programmState, question, select, selectQuestion,prompt, multiPrompt, compareMult, stats,selectRandomQuestion } from "./utils.js";
import { blue, warning, exit, yellow, underline, wrong, right } from "./design.js";


//String Def
let trainingString =
  underline("Sie befinden sich im Anwendungsmenü, was möchten Sie tun?\n") +
  blue("[1]") + " Eine Kategorie für Fragen Auswählen\n" +
  blue("[2]") + " Fragen aus allen Kategorie\n" +
  exit + " zurück zum Hauptmenü\n";
////////////////////

// main training function
export async function handleTraining(ps) {
  let input = await prompt(trainingString);
  input.trimEnd().trimStart()
  let randomized;
  switch (input) {
    // Question from specific category
    case "1":
      console.clear();
      let category = await chooseCategory(ps.categoryArray);
      if (category == ""){
        console.clear();
      }else{
        let questionFromSpecificCategory = await getQuestions(ps, category);
        if(questionFromSpecificCategory == []){
          console.log(warning("Keine Fragen zu dieser Kategorie vorhanden"));
        }else{
          randomized = await randomize();
          //randomized order of questions
          if(randomized){
            await askQuestion(selectRandomQuestion(questionFromSpecificCategory,await numQuestions(questionFromSpecificCategory,category)));
          }
          //questions sorted by how often they were answered wrong in relation to the amount they were asked
          else{
            await askQuestion(selectQuestion(questionFromSpecificCategory,await numQuestions(questionFromSpecificCategory,category)));
          }
          if(ps.questionArray == undefined){
            let newArray = questionFromSpecificCategory;
            ps.questionArray = newArray;
          }
          else{ questionFromSpecificCategory.forEach(element => ps.questionArray.push(element) )}
          console.clear();
        }
      }
      break;
    // Question from all categorys
    case "2":
      let allCategoryQuest = ps.questionArray;
      if(allCategoryQuest.length == 0){
        console.log(warning("Keine Fragen vorhanden"))
      }else{
        randomized = await randomize();
        if(randomized){
          await askQuestion(selectRandomQuestion(allCategoryQuest, await numQuestions(allCategoryQuest, "aller Fragen")));
        }else{
          await askQuestion(selectQuestion(allCategoryQuest, await numQuestions(allCategoryQuest, "aller Fragen")));
        }
      console.clear();
      }
      break;
    case "exit":
      console.clear();
      break;
    default:
      console.log("Ungültige Eingabe");
      await handleTraining(ps);
      console.clear();
      break;
  }
}

// get questions
function getQuestions(ps, category) {
  let temp = select(ps, category);
  return temp;
}

//ask if the questions should be in random order
async function randomize(){
  while(true){
    let randomized = await prompt("Sollen die Fragen in einer Zufälligen Reihenfolge gefragt werden?\n" + 
      blue("[1]") + "Ja\n" + 
      blue("[2]") + "Nein\n");
    if(randomized.trimStart().trimEnd() === "1"){
      return true;
    }
    else if(randomized.trimStart().trimEnd() === "2"){
      return false;
    }
    console.log(warning("Ungültige Eingabe"));
  }
}

// number of questions to be asked
async function numQuestions(array, category) {
  let num = await prompt(
    `Welche Anzahl an Fragen aus dem Bereich ${category} wollen Sie gefragt werden? (${array.length} sind maximal möglich): \n`
  );
  //exception handler
  while(parseInt(num)> array.length || parseInt(num) <= 0 || isNaN(parseInt(num))){ 
    console.log(warning("Ungültige Eingabe"))
    num = await prompt(
      `Welche Anzahl an Fragen aus dem Bereich ${category} wollen Sie gefragt werden? (${array.length} sind maximal möglich): \n`
    );
  }
  console.clear();
  return parseInt(num);
}

// choose category
async function chooseCategory(array) {
  let categoryString = "";
  for (let i = 0; i < array.length; i++) {
    categoryString = categoryString + blue(`[${i + 1}]`) + `${array[i]}\n`;
  }
  categoryString = "Welche Kategorie möchten Sie auswählen?\n" + categoryString + exit + "\n";
  let returnString = await prompt(categoryString);
  let index = parseFloat(returnString) - 1;
  //exeption handler
  if(returnString.toLowerCase() == "exit"){
    return "";
  }
  while(parseInt(index)> array.length || parseInt(index) < 0 || isNaN(parseInt(index))){ 
    console.log(warning("Ungültige Eingabe"))
    index = parseFloat(await prompt(categoryString)) - 1;
  }
  return array[index];
}

// ask questions
async function askQuestion(questionArray_) {
  let questionArray = questionArray_;
  let type;
  let end
  console.clear()
  // asking all Questions
  for (let k = 0; k < questionArray.length; k++) {
    type = questionArray[k].type;
    let ans = "";
    switch (type) {
      // normal Question
      case "Frage":
        console.log(underline("Frage:"));
        ans = await prompt(`${questionArray[k].questionText}\n`);
        if(ans === "exit"){return} ;
        //answered right
        if (ans.trimStart().trimEnd() === questionArray[k].answerText) {
          questionArray[k].asked += 1;
          stats(questionArray);
          console.log(right("Die Anwort war richtig"));
        }
        //answered wrong
        else {
          questionArray[k].asked += 1;
          questionArray[k].wrong += 1;
          stats(questionArray);
          console.log(wrong("Die Anwort war nicht richtig"));
          console.log("Die richtige Anwort wäre: " + questionArray[k].answerText);
        }
        console.log() 
        break;
      // multiple choice questions
      case "Mult-Frage":
        let choicesList = [];
        let promptAnswers = [];
        let rightAnswers = [];
        for (const [key, val] of Object.entries(questionArray[k].answerDic)) {
          let dict = {name: key, value: val };
          choicesList.push(dict);
          if(val){rightAnswers.push(key)}
        }
        console.log(underline("Multiple-Choice Frage:"));
        console.log(yellow("Auswahl mit Pfeiltasten und Leertaste, Eingabe mit Enter"));
        promptAnswers = await multiPrompt(choicesList,questionArray[k].questionText);
        //answered right
        if (compareMult(promptAnswers,rightAnswers)== true) {
          questionArray[k].asked += 1;
          stats(questionArray);
          console.log(right("Die Anwort war richtig"));
        } 
        //answered wrong
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
