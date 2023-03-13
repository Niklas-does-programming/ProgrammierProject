// data management
// functions for editing the existing database 
// of questions

import chalk from 'chalk';
import { exit, blue, green, warning, black } from './design.js';
import {programmState, question, select, multipleChoice, prompt} from './utils.js';


// String definitions
let managementString = "Sie befinden sich im Verwaltungsmenü, was möchten Sie tun?\n" + 
                   blue("[1]") + " Eine neue Kategorie hinzufügen\n" + 
                   blue("[2]") + " Eine vorhandene Kategorie bearbeiten (Namen/Fragen)\n" +
                   blue("[3]") + " Eine vorhandene Kategorie löschen\n" +
                   exit + " zurück zum Hauptmenü\n";
/////////////////////


export async function handleManagement(ps){
    // TODO menustruktur ausgeben und exit abfragen
    let input = await prompt(managementString);
    console.clear();
    switch(input){
        case "1":
            await addCategory(ps);
            break;
        case "2":
            await editCategory(ps);
            break;
        case "3":
            await deleteCategory(ps);
            break;
        case "exit":
            break;
        default:
            console.log(warning("ungültige Eingabe"));
            await handleManagement(ps);
            break;
    }
}

// add question
// takes a temporary array and the category, 
// this question will be added to and adds 
// the question to the array of existing questions
async function addQuestion(tmp, category){
    let questionText = await prompt("Wie soll die Frage lauten?");
    let answerText = await prompt("Wie soll die Antwort lauten?");
    let answer;
    let finished = false;
    while(!finished){
        answer = await prompt("Ist das so okay?\nFrage:" + black(questionText) + " \nAntwort:" + green(answerText) + "\n" + blue("[Ja][Nein]") + exit + "\n")
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
            console.log(warning("ungültige Eingabe"));        }
    }
}

async function addMultiQuestion(tmp, category){
    let questionText = await prompt("Wie soll die Frage lauten?\n");
    let answer;
    let answerDict = {};
    let finished = false;
    while (!finished){
        answer = await prompt("Möchten Sie eine weitere Antwortmöglichkeit hinzufügen?"+ blue("[Ja][Nein]") + exit + "\n")
        if(answer === "Ja"){
            let newAnswerPos = await prompt("Wie soll diese lauten?\n");
            let truthVal = await prompt("Ist diese Antwort richtig?"+ blue("[Ja][Nein]")+ "\n");
            if(truthVal === "Ja"){
                answerDict[newAnswerPos] = true;
            }else if (truthVal === "Nein"){
                answerDict[newAnswerPos] = false;
            }else{
                console.log(warning("ungültige Eingabe"));
            }
        }else if (answer === "Nein"){
            finished = true;
        }else if (answer === "exit"){
            return;
        }else{
            console.log(warning("ungültige Eingabe"));
        }
    }
    let question = new multipleChoice("Mult-Frage", questionText, answerDict, category, 0, 0);
    tmp.push(question);
}

// delete question
// takes an array and an index on which the 
// element to be deleted lies and deletes it
async function deleteQuestion(array){
    // TODO namen des arrays
    let questionString = "";
    for(let i = array.length - 1; i>=0;i--){
        if (array[i].type === "Frage"){
            questionString = blue(`[${i+1}]`) + ` ${array[i].questionText}, ${array[i].answerText}\n` + questionString;
        }else if(array[i].type === "Mult-Frage"){
            let answers = "";
            for (let key in array[i].answerDic){
                answers = key + ":" + array[i].answerDic[key] + ", " + answers;
            }
            questionString = blue(`[${i+1}]`) + `${array[i].questionText}, ${answers}\n` + questionString;
        }
    }
    questionString = "Welche Frage möchten Sie löschen?\n" + questionString + "[exit]\n";
    let index = parseFloat(await prompt(questionString))-1;
    if (isNaN(index)){
        console.log(warning("ungültige Eingabe"));
        return;
    }
    if((0<= index < array.length)){
        array.splice(index, 1);
    }
}

// edit question
// takes an array, an index at which to change
// the question and the edited question
async function editQuestion(array, category){
    let questionString = "";
    for(let i = array.length - 1; i>=0;i--){
        if (array[i].type === "Frage"){
            questionString = blue(`[${i+1}]`) + ` ${array[i].questionText}, ${array[i].answerText}\n` + questionString;
        }else if(array[i].type === "Mult-Frage"){
            let answers = "";
            for (let key in array[i].answerDic){
                answers = key + ":" + array[i].answerDic[key] + ", " + answers;
            }
            questionString = blue(`[${i+1}]`) + `${array[i].questionText}, ${answers}\n` + questionString;
        }
    }
    questionString = "Welche Frage möchten Sie bearbeiten?\n" + questionString;
    let index = parseFloat(prompt(questionString))-1;
    if (isNaN(index)){
        console.log(warning("ungültige Eingabe"));
        return;
    }
    let questionText = await prompt("Wie soll die Frage lauten?\n");
    if (array[index].type === "Frage"){
        let answerText = await prompt("Wie soll die Antwort lauten?\n");
        let answer;
        let finished = false;
        while(!finished){
            answer = await prompt("Ist das so okay?\n Frage:" + black(questionText) + " \nAntwort:" + green(answerText) + blue("[Ja][Nein]") + exit + "\n");
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
                console.log(warning("ungültige Eingabe"));
            }
        }
    }else if (array[index].type === "Mult-Frage"){
        let answerDict = {};
        let answer;
        let finished = false;
        while(!finished){
            answer = await prompt("Möchten Sie eine weitere Antwortmöglichkeit hinzufügen?"+ blue("[Ja][Nein]") + exit + "\n");
            if(answer === "Ja"){
                let newAnswerPos = await prompt("Wie soll diese lauten?\n");
                let truthVal = await prompt("Ist diese Antwort richtig?" + blue("[Ja][Nein]\n"));
                if(truthVal === "Ja"){
                    answerDict[newAnswerPos] = true;
                }else if (truthVal === "Nein"){
                    answerDict[newAnswerPos] = false;
                }else{
                    console.log(warning("ungültige Eingabe"));
                }
            }else if (answer === "Nein"){
                finished = true;
                let newMultQuestion = new multipleChoice("Mult-Frage", questionText, answerDict, category, 0, 0);
                array[index] = newMultQuestion;
            }else if (answer === "exit"){
                return;
            }else{
                console.log(warning("ungültige Eingabe"));
            }
        }
    }
}



// add category
// adds a new category to the category array
// (as string)
async function addCategory(ps){
    let newCategory = await prompt("Wie soll die neue Kategorie heißen?\n");
    ps.categoryArray.push(newCategory);
    console.log("neue Kategorie " + black(newCategory)+" hinzugefügt");
}

// delete category
// deletes all questions with the given 
// category
// TODO ///////////////
async function deleteCategory(ps){
    // using the select function splices elements
    // from the question array
    // TODO categories auflisten und fragen welche gelöscht werden soll
    let categoryString = "";
    for(let i = ps.categoryArray.length - 1; i>=0;i--){
        categoryString = `[${i+1}] ${ps.categoryArray[i]}\n` + categoryString;
    }
    categoryString = "Welche Kategorie möchten Sie löschen?\n" + categoryString;
    let category = ps.categoryArray[parseFloat(await prompt(categoryString))-1];
    select(ps, category);
    let isCategory = element => element === category;
    let index = ps.categoryArray.findIndex(isCategory);
    ps.categoryArray.splice(index,1);
}

// edit category
// edits the name of the category anywhere it is used

async function editCategory(ps){
    let categoryString = "";
    for(let i = ps.categoryArray.length - 1; i>=0;i--){
        categoryString = blue(`[${i+1}]`) + `${ps.categoryArray[i]}\n` + categoryString;
    }
    categoryString = "Welche Kategorie möchten Sie bearbeiten?\n" + categoryString;
    let category = ps.categoryArray[parseFloat(await prompt(categoryString))-1];
    let tmp = select(ps, category);
let input = await prompt("Was möchten Sie mit dieser Kategorie tun?\n" + blue("[1]") +" Eine Frage löschen\n" + blue("[2]") +" Eine Frage bearbeiten\n" + blue("[3]") +" Eine Frage hinzufügen\n" + blue("[4]") + " Eine Multiple Choice Frage hinzufügen\n" + blue("[5]") + " Den Namen ändern\n" + exit + " Zurück zum Hauptmenü\n")
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
            addMultiQuestion(tmp, category);
            break;
        case "5":
            let newName = await prompt("Wie soll der neue Name lauten?\n");
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
            console.log(warning("ungültiger Input"));
            break;
    }
    for(let i = tmp.length-1; i >= 0; i--){
        ps.questionArray.push(tmp[i]);
    }

}