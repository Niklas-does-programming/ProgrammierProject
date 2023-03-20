// reading from/writing to JSON
// functions for saving the data
// and reading it from a JSON file

// read data
import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage('./database'); //creates new Localstorage

export function readData(keyToFile){
    let file = localStorage.getItem(keyToFile); //sets JSON File in Localstorage
    const data = JSON.parse(file); 
    return data
}

export function saveData(fileToBeSaved){
    const data = JSON.stringify(fileToBeSaved); //parse obj to str in Jsonformat
    localStorage.setItem("ProgramState", data); //sets JSON File in Localstorage
}
 



