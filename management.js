// data management
// functions for editing the existing database 
// of questions

import { exit, blue, green, warning, black, yellow, underline } from './design.js';
import { saveData } from './readwrite.js';
import {programmState, question, select, multipleChoice, prompt} from './utils.js';


// String definitions
let managementString = underline("Sie befinden sich im Verwaltungsmenü, was möchten Sie tun?\n") + 
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
            console.log(warning("Ungültige Eingabe"));
            await handleManagement(ps);
            break;
    }
}

// add question
// takes a temporary array and the category, 
// this question will be added to and adds 
// the question to the array of existing questions
async function addQuestion(questionArray, category){
    let questionText = await prompt("Wie soll die Frage lauten?");
    let answerText = await prompt("Wie soll die Antwort lauten?");
    let newQuestion = new question("Frage", questionText, answerText, category, 0, 0, 0);
    questionArray.push(newQuestion);
    console.clear()
}

async function addMultiQuestion(questionArray, category){
    let questionText = await prompt("Wie soll die Frage lauten?\n");
    let answer;
    let answerDict = {};
    let finished = false;
    let truthVal;
    let newAnswerPos;
    answer = await prompt("Geben Sie bitte Ihre erste Antwortmöglichkeit ein:\n")
    while(!((truthVal == "1") || (truthVal == "2"))){
        truthVal = await prompt("Ist diese Antwortmöglichkeit richtig?\n"+ blue("[1]")+ "Ja\n" + blue("[2]")+ "Nein\n");
        if(truthVal === "1"){
            answerDict[answer] = true;
        }else if (truthVal === "2"){
            answerDict[answer] = false;
        }else{
            console.log(warning("ungültige Eingabe"));
        }
    }
    while (!finished){
        answer = await prompt("Möchten Sie eine weitere Antwortmöglichkeit hinzufügen?\n"+ blue("[1]")+ "Ja\n" + blue("[2]")+ "Nein\n")
        if(answer === "1"){
            newAnswerPos = await prompt("Wie soll diese lauten?\n");
            truthVal = await prompt("Ist diese Antwortmöglichkeit richtig?\n"+ blue("[1]")+ "Ja\n" + blue("[2]")+ "Nein\n");
            if(truthVal === "1"){
                answerDict[newAnswerPos] = true;
            }else if (truthVal === "2"){
                answerDict[newAnswerPos] = false;
            }else{
                console.log(warning("ungültige Eingabe"));
            }
        }else if (answer === "2"){
            finished = true;
        }else if (answer === "exit"){
            return;
        }else{
            console.log(warning("ungültige Eingabe"));
        }
    }
    let question = new multipleChoice("Mult-Frage", questionText, answerDict, category, 0, 0, 0);
    questionArray.push(question);
    console.clear()
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
    questionString = "Welche Frage möchten Sie löschen?\n" + questionString + exit;
    let index = parseFloat(await prompt(questionString))-1;
    if (isNaN(index)){
        console.log(warning("Ungültige Eingabe"));
        return;
    }
    if((0<= index < array.length)){
        array.splice(index, 1);
    }
    console.clear()
}

// edit question
// takes an array, an index at which to change
// the question and the edited question
async function editQuestion(questionArray, category){
    let questionString = "";
    for(let i = questionArray.length - 1; i>=0;i--){
        if (questionArray[i].type === "Frage"){
            questionString = blue(`[${i+1}]`) + ` ${questionArray[i].questionText}, ${questionArray[i].answerText}\n` + questionString;
        }else if(questionArray[i].type === "Mult-Frage"){
            let answers = "";
            for (let key in questionArray[i].answerDic){
                answers = key + ":" + questionArray[i].answerDic[key] + ", " + answers;
            }
            questionString = blue(`[${i+1}]`) + `${questionArray[i].questionText}, ${answers}\n` + questionString;
        }
    }
    questionString = "Welche Frage möchten Sie bearbeiten?\n" + questionString;
    let index = parseFloat(await prompt(questionString))-1;
    if(index === "exit"){return}
    else if (isNaN(index)){
        console.log(warning("Ungültige Eingabe"));
        return;
    }
    if (questionArray[index].type === "Frage"){
        await addQuestion(questionArray,category)
    }else if (questionArray[index].type === "Mult-Frage"){
        await addMultiQuestion(questionArray,category)
    }
    console.clear()
}

// add category
// adds a new category to the category array
// (as string)
async function addCategory(ps){
    let input;
    let newCategory = await prompt("Wie soll die neue Kategorie heißen?\n");
    ps.categoryArray.push(newCategory);
    console.clear();
    console.log(underline("Sie haben eine neue Kategorie: " + yellow(newCategory) +" hinzugefügt"));
    while(!(input == "1") || (input == "2")){
        input = await prompt("Welche Art von Frage möchten Sie dieser Kategorie hinzugfügen?\n" + blue("[1]") +"Frage\n" + blue("[2]") +"Multiple-Choice-Frage\n" );
        if(input === "1"){
            await addQuestion(ps.questionArray,newCategory)
        }else if (input === "2"){
            await addMultiQuestion(ps.questionArray,newCategory)
        }else{
            console.log(warning("Ungültige Eingabe"));
        }
    }
    console.clear()
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
        categoryString = blue(`[${i+1}]`) + `${ps.categoryArray[i]}\n` + categoryString;
    }
    categoryString = "Welche Kategorie möchten Sie löschen?\n" + categoryString;
    let category = ps.categoryArray[parseFloat(await prompt(categoryString))-1];
    select(ps, category);
    let isCategory = element => element === category;
    let index = ps.categoryArray.findIndex(isCategory);
    ps.categoryArray.splice(index,1);
    console.clear()
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
    let categoryArray = select(ps, category);
    console.clear();
    let input = await prompt(underline("Was möchten Sie mit dieser Kategorie tun?\n") + blue("[1]") +" Eine Frage löschen\n" + blue("[2]") +" Eine Frage bearbeiten\n" + blue("[3]") +" Eine Frage hinzufügen\n" + blue("[4]") + " Eine Multiple Choice Frage hinzufügen\n" + blue("[5]") + " Den Namen ändern\n" + exit + " Zurück zum Hauptmenü\n");
    switch(input){
        case "1":
            await deleteQuestion(categoryArray);
            break;
        case "2":
            await editQuestion(categoryArray, category);
            break;
        case "3":
            await addQuestion(categoryArray, category);
            break;
        case "4":
            await addMultiQuestion(categoryArray, category);
            break;
        case "5":
            let newName = await prompt("Wie soll der neue Name lauten?\n");
            let isCategory = element => element === category;
            let index = ps.categoryArray.findIndex(isCategory);
            ps.categoryArray[index] = newName;
            
            for(let i = 0; i < categoryArray.length; i++){
                // TODO index der kategorie 
                categoryArray[i].category = newName;
            }
            console.clear()
            break;  
        case "exit":
            break;
        default:
            console.log(warning("Ungültiger Input"));
            break;
    }
    for(let i = categoryArray.length-1; i >= 0; i--){
        ps.questionArray.push(categoryArray[i]);
    }
}