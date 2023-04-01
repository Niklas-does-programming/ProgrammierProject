// data management
// functions for editing the existing database 
// of questions

import { exit, blue, green, warning, black, yellow, underline } from './design.js';
import {programmState, question, select, multipleChoice, prompt} from './utils.js';


// String definitions
let managementString = underline("Sie befinden sich im Verwaltungsmenü, was möchten Sie tun?\n") + 
                   blue("[1]") + " Eine neue Kategorie hinzufügen\n" + 
                   blue("[2]") + " Eine vorhandene Kategorie bearbeiten (Namen/Fragen)\n" +
                   blue("[3]") + " Eine vorhandene Kategorie löschen\n" +
                   exit + " zurück zum Hauptmenü\n";
/////////////////////


export async function handleManagement(ps){
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
    if(questionText.trimStart().trimEnd() === "" || questionText.trimStart().trimEnd() == "Enter"){
        console.log(warning("Bitte geben Sie etwas ein!"));
        await addQuestion(questionArray, category);
    }else{
        let finished = false;
        while(!finished){
            let answerText = await prompt("Wie soll die Antwort lauten?");
            if(answerText.trimStart().trimEnd() === "" || answerText.trimStart().trimEnd() == "Enter"){
                console.log(warning("Bitte geben Sie etwas ein"))
            }else{
                finished = true;
                let newQuestion = new question("Frage", questionText, answerText, category, 0, 0, 0);
                questionArray.push(newQuestion);
                console.clear();
            }
        }
    }
}

//adds a question of the Multiple Choice type
async function addMultiQuestion(questionArray, category){
    let questionText = await prompt("Wie soll die Frage lauten?\n");
    let answer;
    let answerDict = {};
    let finished = false;
    let truthVal;
    let newAnswerPos;
    //first check if the input isnt empty
    if(questionText.trimStart().trimEnd() === "" || questionText.trimStart().trimEnd() == "Enter"){
        console.log(warning("Bitte geben Sie etwas ein!"));
        await addMultiQuestion(questionArray, category);
    }else{
        //then add the first answer possibilitie
        while(!finished){
            answer = await prompt("Geben Sie bitte Ihre erste Antwortmöglichkeit ein:\n");
            if(answer.trimStart().trimEnd() === "" || answer.trimStart().trimEnd() == "Enter"){
                console.log(warning("Bitte geben Sie etwas ein"))
            }else{
                finished = true;
            }
        }
        finished = false;
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
        // add however many more answer possibilities as are desired
        while (!finished){
            answer = await prompt("Möchten Sie eine weitere Antwortmöglichkeit hinzufügen?\n"+ blue("[1]")+ "Ja\n" + blue("[2]")+ "Nein\n")
            if(answer === "1"){
                newAnswerPos = await prompt("Wie soll diese lauten?\n");
                if(newAnswerPos.trimStart().trimEnd() === "" || answer.trimStart().trimEnd()){
                    console.log(warning("Bitte etwas eingeben"));
                }else{
                    truthVal = await prompt("Ist diese Antwortmöglichkeit richtig?\n"+ blue("[1]")+ "Ja\n" + blue("[2]")+ "Nein\n");
                    if(truthVal === "1"){
                        answerDict[newAnswerPos] = true;
                    }else if (truthVal === "2"){
                        answerDict[newAnswerPos] = false;
                    }else{
                        console.log(warning("ungültige Eingabe"));
                    }
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
    
}

// delete question
// takes an array and an index on which the 
// element to be deleted lies and deletes it
async function deleteQuestion(array){
    let questionString = "";
    //dynamically building up a string containing all current questions
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
    let returnString = await prompt(questionString);
    let index = parseFloat(returnString)-1;
    if(returnString==="exit"){
        console.clear();
    }else if((index===undefined || isNaN(index))|| index + 1 > array.length){//check for valid inpout
        console.log(warning("Bitte einen gültigen Index eingeben"));
        await deleteQuestion(array);
    }else{
        array.splice(index, 1);
    }
    console.clear()
}

// edit question
// takes an array, an index at which to change
// the question and the edited question
async function editQuestion(questionArray, category){
    let questionString = "";
    //dynamically building up a string containing all current questions
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
    questionString = "Welche Frage möchten Sie bearbeiten?\n" + questionString + exit;
    let returnString = await prompt(questionString);
    let index = parseFloat(returnString)-1;
    let temporaryArray=[];
    //check if input is valid and if thats the case then do accordingly
    if(returnString == "exit"){
        console.clear();
        return;
    } else if((index===undefined || isNaN(index))|| index + 1 > questionArray.length){//schauen ob ungültige Eingabe
        console.log(warning("Bitte einen gültigen Index eingeben"));
        await editQuestion(questionArray, category);
    } else if(questionArray[index].type === "Frage"){
        //if an edited question was added put this one at the place of the old question, else just keep the old one
        temporaryArray.push(questionArray[index]);
        await addQuestion(temporaryArray,category);
        questionArray[index]= temporaryArray[temporaryArray.length - 1];
    } else if (questionArray[index].type === "Mult-Frage"){
        //if an edited question was added put this one at the place of the old question, else just keep the old one
        temporaryArray.push(questionArray[index]);
        await addMultiQuestion(temporaryArray,category);
        questionArray[index]= temporaryArray[temporaryArray.length - 1];

    } else{
        console.log(warning("Bitte einen gültigen Kategorieindex eingeben"));
        await editQuestion(questionArray, category);
    }
    console.clear()
}

// add category
// adds a new category to the category array
// (as string)
async function addCategory(ps){
    let newCategory = await prompt("Wie soll die neue Kategorie heißen?\n");
    if(ps.categoryArray.includes(newCategory)){
        console.log(warning("Diese Kategorie existiert schon!"));
        await addCategory(ps);
    } else if(newCategory.trimStart().trimEnd() == "" || newCategory == "Enter"){
        console.log(warning("Bitte etwas eingeben"));
        await addCategory(ps);
    } else if(newCategory.toLowerCase() == "exit"){
        console.clear();
        return;
    }else{
        ps.categoryArray.push(newCategory);
        console.clear();
        console.log(underline("Sie haben eine neue Kategorie: " + yellow(newCategory) +" hinzugefügt"));
    }
}

// delete category
// deletes all questions with the given 
// category
async function deleteCategory(ps){
    // using the select function splices elements
    // from the question array
    // TODO categories auflisten und fragen welche gelöscht werden soll
    let categoryString = "";
    for(let i = ps.categoryArray.length - 1; i>=0;i--){
        categoryString = blue(`[${i+1}]`) + `${ps.categoryArray[i]}\n` + categoryString;
    }
    categoryString = "Welche Kategorie möchten Sie löschen?\n" + categoryString;
    let returnString = await prompt(categoryString);
    let category = ps.categoryArray[parseFloat(returnString)-1];
    if(ps.categoryArray.includes(category)){
        //delete all questions with that category and then the category itself
        select(ps, category);
        let isCategory = element => element === category;
        let index = ps.categoryArray.findIndex(isCategory);
        ps.categoryArray.splice(index,1);
        console.clear()
    } else if(returnString == "exit"){
        console.clear();
        return;
    } else if(category===undefined){//schauen ob ungültige Eingabe
        console.log(warning("Bitte einen gültigen Kategorieindex eingeben"));
        await deleteCategory(ps);
    }else{
        console.log(warning("Bitte einen gültigen Kategorieindex eingeben"));
        await deleteCategory(ps);
    }
}

// edit category
// edits the name of the category anywhere it is used
// or lets you manage the contained questions
async function editCategory(ps){
    let categoryString = "";
    for(let i = ps.categoryArray.length - 1; i>=0;i--){
        categoryString = blue(`[${i+1}]`) + `${ps.categoryArray[i]}\n` + categoryString;
    }
    categoryString = "Welche Kategorie möchten Sie bearbeiten?\n" + categoryString;
    let returnString = await prompt(categoryString);
    let category = ps.categoryArray[parseFloat(returnString)-1];
    if(ps.categoryArray.includes(category)){
        let categoryArray = select(ps, category);
        let keepGoing = true;
        console.clear();
        while(keepGoing){
            let input = await prompt(underline("Was möchten Sie mit dieser Kategorie tun?\n") + blue("[1]") +" Eine Frage löschen\n" + blue("[2]") +" Eine Frage bearbeiten\n" + blue("[3]") +" Eine Frage hinzufügen\n" + blue("[4]") + " Eine Multiple Choice Frage hinzufügen\n" + blue("[5]") + " Den Namen ändern\n" + exit + " Zurück zum Hauptmenü\n");
            switch(input){
                case "1":
                    await deleteQuestion(categoryArray);
                    keepGoing = false;
                    break;
                case "2":
                    await editQuestion(categoryArray, category);
                    keepGoing = false;
                    break;
                case "3":
                    await addQuestion(categoryArray, category);
                    keepGoing = false;
                    break;
                case "4":
                    await addMultiQuestion(categoryArray, category);
                    keepGoing = false;
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
                    console.clear();
                    keepGoing = false;
                    break;  
                case "exit":
                    keepGoing = false;
                    break;
                default:
                    console.log(warning("Ungültiger Input"));
                    break;
            }       
        } 
        for(let i = categoryArray.length-1; i >= 0; i--){
            ps.questionArray.push(categoryArray[i]);
        }
        console.clear();
    } else if(returnString == "exit"){
        console.clear();
        return;
    } else if(category===undefined){//schauen ob ungültige Eingabe
        console.log(warning("Bitte einen gültigen Kategorieindex eingeben"));
        await editCategory(ps);
    }else{
        console.log(warning("Bitte einen gültigen Kategorieindex eingeben"));
        await editCategory(ps);
    }

}