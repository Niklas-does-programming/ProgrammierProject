// training with questions
// functions for the application mode 
// of the software 

import {programmState,question,select} from "./utils.js";

import psp from 'prompt-sync-plus';
import { red, blue, warning } from "./design.js";
const prompt = psp();

//String Def
let trainingString = "Sie befinden sich im Anwendungsmenü, was möchten Sie tun?\n" + 
                   blue("[1]") + " Eine Kategorie für Fragen Auswählen\n" + 
                   blue("[2]") + " Fragen aus allen Kategorie\n" +
                   red("[exit]") + " zurück zum Hauptmenü\n";
////////////////////

export function handleTraining(ps){
    let input = prompt(trainingString);
    switch(input){
        case "1":
            let cat = chooseCategory(ps.categoryArray);
            let question = getQuestions(ps,cat);
            askQuestion(ps,question);
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
function getQuestions(ps,category){
    let temp = select(ps,category);
    return temp;
}

// number of questions to be asked
function numQuestions(ps,array,category){
    let num = prompt(`Anzahl an Fragen zum Thema ${category}: ${array.length}`);
    // TODO function to choose questions
    return num;
}

// choose category
function chooseCategory(array){
    let categoryString = "";
    for(let i = 0;i<array.length;i++){
        categoryString = categoryString + blue(`[${i+1}]`) + `${array[i]}\n`;
    }
    categoryString = "Welche Kategorie möchten Sie auswählen?\n" + categoryString;
    let index = parseFloat(prompt(categoryString))-1;
    return array[index];
}

// ask questions
function askQuestion(ps,array){
    let ask = array;
    for(let i = 0;i<ask.length;i++){
        let ans = prompt(`${ask[i].questionText}\n`);
        if(ans === ask[i].answerText){
            ask[i].asked += 1;
            console.log("Die Anwort war richtig");
        }
        else{
            ask[i].asked += 1;
            ask[i].wrong += 1;
            console.log("Die Anwort war nicht richtig");
        }
        console.clear();
    }
    
    for(let j = 0;j<ask.length;j++){
        ps.questionArray.push(ask[j]);
    }
}