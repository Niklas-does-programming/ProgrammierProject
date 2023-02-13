// training with questions
// functions for the application mode 
// of the software 

import {programmState,question,select} from "./utils.js";

import psp from 'prompt-sync-plus';
const prompt = psp();

//String Def
let trainingString = "Sie befinden sich im Anwendungsmenü, was möchten Sie tun?\n" + 
                   "[1] Eine Kategorie für Fragen Auswählen\n" + 
                   "[2] Fragen aus allen Kategorie\n" +
                   "[exit] zurück zum Hauptmenü\n";
////////////////////

export function handleTraining(ps){
    let input = prompt(trainingString);
    switch(input){
        case "1":
            let cat = chooseCategory(ps.categoryArray);
            let question = getQuestions(ps,cat);

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
}

// get questions
function getQuestions(ps,category){
    let temp = select(ps,category);
    return temp;
}

// choose category
function chooseCategory(array){
    let categoryString = "";
    for(let i = 0;i<array.length;i++){
        categoryString = categoryString + `[${i+1}] ${array[i]}\n`;
    }
    categoryString = "Welche Kategorie möchten Sie auswählen?\n" + categoryString;
    let index = parseFloat(prompt(categoryString))-1;
    return array[index];
}

// ask questions
function askQuestion(array){
    for(let i = 0;i<array.length;i++){
        let ans = prompt(array[i].questionText);
        if(ans === array[i].answerText){
            array[i].asked =+ 1;
        }
        else{
            array[i].asked =+ 1;
            array[i].wrong =+ 1;
        }
    }
    
}