// data management
// functions for editing the existing database 
// of questions

import {programmState, question, select} from './utils.js';

import psp from 'prompt-sync-plus';
const prompt = psp();


// String definitions
let managementString = "Sie befinden sich im Verwaltungsmenü, was möchten Sie tun?\n" + 
                   "[1] Eine neue Kategorie hinzufügen\n" + 
                   "[2] Eine vorhandene Kategorie bearbeiten (Namen/Fragen)\n" +
                   "[3] Eine vorhandene Kategorie löschen\n" +
                   "[exit] zurück zum Hauptmenü\n";
/////////////////////


export function handleManagement(ps){
    // TODO menustruktur ausgeben und exit abfragen
    let input = prompt(managementString);
    switch(input){
        case "1":
            addCategory(ps);
            break;
        case "2":
            editCategory(ps);
            break;
        case "3":
            deleteCategory(ps);
            break;
        case "exit":
            break;
        default:
            console.log("ungültige Eingabe");
            handleManagement(ps);
            break;
    }
}

// add question
// takes a question and programstate and adds 
// the question to the array of existing questions
function addQuestion(tmp, category){
    let questionText = prompt("Wie soll die Frage lauten?");
    let answerText = prompt("Wie soll die Antwort lauten?");
    let answer;
    let finished = false;
    while(!finished){
        answer = prompt(`Ist das so okay?\n Frage: ${questionText}\n Antwort: ${answerText}\n Ja/Nein/exit\n`);
        if(answer === "Ja"){
            let newQuestion = new question("Frage", questionText, answerText, category, 0, 0);
            tmp.push(newQuestion);
            finished = true;
        }else if(answer === "Nein"){
            addQuestion(tmp, category);
            finished = true;
        }else if(answer === "exit"){
            return;
        }else{
            console.log("ungültige Eingabe\n");
        }
    }
}

// delete question
// takes an array and an index on which the 
// element to be deleted lies and deletes it
function deleteQuestion(array){
    // TODO namen des arrays
    let questionString = "";
    for(let i = array.length - 1; i>=0;i--){
        questionString = `[${i+1}] ${array[i].questionText}, ${array[i].answerText}\n` + questionString;
    }
    questionString = "Welche Frage möchten Sie löschen?\n" + questionString;
    let index = parseFloat(prompt(questionString))-1;
    if((0<= index < array.length) && !(isNaN(index))){
        array.splice(index, 1);
    }
}

// edit question
// takes an array, an index at which to change
// the question and the edited question
function editQuestion(array, category){
    let questionString = "";
    for(let i = array.length - 1; i>=0;i--){
        questionString = `[${i+1}] ${array[i].questionText}, ${array[i].answerText}\n` + questionString;
    }
    questionString = "Welche Frage möchten Sie bearbeiten?\n" + questionString;
    let index = parseFloat(prompt(questionString))-1;
    let questionText = prompt("Wie soll die Frage lauten?\n");
    let answerText = prompt("Wie soll die Antwort lauten?\n");
    let answer;
    let finished = false;
    while(!finished){
        answer = prompt(`Ist das so okay?\n Frage: ${questionText}\n Antwort: ${answerText}\n Ja/Nein/exit\n`);
        if(answer === "Ja"){
            let newQuestion = new question("Frage", questionText, answerText, category, 0, 0);
            array[index] = newQuestion;
            finished = true;
        }else if(answer === "Nein"){
            editQuestion(array, category);
            finished = true;
        }else if(answer === "exit"){
            return;
        }else{
            console.log("ungültige Eingabe\n");
        }
    }
}



// add category
// adds a new category to the category array
// (as string)
function addCategory(ps){
    let newCategory = prompt("Wie soll die neue Kategorie heißen?\n");
    ps.categoryArray.push(newCategory);
    console.log(`neue Kategorie '${newCategory}' hinzugefügt`);
}

// delete category
// deletes all questions with the given 
// category
// TODO ///////////////
function deleteCategory(ps){
    // using the select function splices elements
    // from the question array
    // TODO categories auflisten und fragen welche gelöscht werden soll
    let categoryString = "";
    for(let i = ps.categoryArray.length - 1; i>=0;i--){
        categoryString = `[${i+1}] ${ps.categoryArray[i]}\n` + categoryString;
    }
    categoryString = "Welche Kategorie möchten Sie löschen?\n" + categoryString;
    let category = ps.categoryArray[parseFloat(prompt(categoryString))-1];
    select(ps, category);
    let isCategory = element => element === category;
    let index = ps.categoryArray.findIndex(isCategory);
    ps.categoryArray.splice(index,1);
}

// edit category
// edits the name of the category anywhere it is used

function editCategory(ps){
    let categoryString = "";
    for(let i = ps.categoryArray.length - 1; i>=0;i--){
        categoryString = `[${i+1}] ${ps.categoryArray[i]}\n` + categoryString;
    }
    categoryString = "Welche Kategorie möchten Sie bearbeiten?\n" + categoryString;
    let category = ps.categoryArray[parseFloat(prompt(categoryString))-1];
    let tmp = select(ps, category);
    let input = prompt("Was möchten Sie mit dieser Kategorie tun?\n[1] Eine Frage löschen\n[2] Eine Frage bearbeiten\n[3] Eine Frage hinzufügen\n[4] Den Namen ändern\n[exit] Zurück zum Hauptmenü\n")
    switch(input){
        case "1":
            deleteQuestion(tmp);
            break;
        case "2":
            editQuestion(tmp, category);
            break;
        case "3":
            addQuestion(tmp, category);
            break;
        case "4":
            let isCategory = element => element === category;
            let index = ps.categoryArray.findIndex(isCategory);
            ps.categoryArray[index] = newName;
            
            for(let i = 0; i < tmp.length; i++){
                // TODO index der kategorie 
                tmp[i].category = newName;
            }
            break;          
        case "exit":
            break;
        default:
            console.log("ungültiger Input");
            break;
    }
    for(let i = tmp.length-1; i >= 0; i--){
        ps.questionArray.push(tmp[i]);
    }

}