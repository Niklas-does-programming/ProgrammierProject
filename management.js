// data management
// functions for editing the existing database 
// of questions

import {programmState} from './utils.js';

// add question
// takes a question and programstate and adds 
// the question to the array of existing questions
function addQuestion(ps){
    // TODO namen des arrays
    ps.questionArray.push(question);
}

// delete question
// takes an array and an index on which the 
// element to be deleted lies and deletes it
function deleteQuestion(index, array){
    // TODO namen des arrays
    array.splice(index, 1);
}

// edit question
// takes an array, an index at which to change
// the question and the edited question
function editQuestion(index, array, question){
    array[index] = question;
}



// add category
// adds a new category to the category array
// (as string)
function addCategory(category, ps){
    ps.categoryArray.push(category);
}

// delete category
// deletes all questions with the given 
// category
function deleteCategory(category, ps){
    // using the select function splices elements
    // from the question array
    // TODO select funktion anpassen
    utils.select(category);
    let isCategory = element => element === category;
    let index = ps.categoryArray.findIndex(isCategory);
    ps.categoryArray.splice(index,1);
}

// edit category
// edits the name of the category anywhere it is used
function editCategory(category, newName, ps){
    tmp = utils.select(category);
    for(let i = 0; i < tmp.length; i++){
        // TODO index der kategorie 
        tmp[i][1] = newName;
        ps.questionarray.push(tmp[i]);
    }
    let isCategory = element => element === category;
    let index = ps.categoryArray.findIndex(isCategory);
    ps.categoryArray[index] = newName;
}