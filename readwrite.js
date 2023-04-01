// reading from/writing to JSON
// functions for saving the data
// and reading it from a JSON file
import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage('./database'); //creates new Localstorage

//reads data from localstorage
export function readData(keyToFile){
    let file = localStorage.getItem(keyToFile); //get JSON File from Localstorage
    const data = JSON.parse(file); // parse to usable data
    return data
}

//save data in localstorage
export function saveData(fileToBeSaved){
    const data = JSON.stringify(fileToBeSaved); //parse obj to str in Jsonformat
    localStorage.setItem("ProgramState", data); //set JSON File in Localstorage
}
 



