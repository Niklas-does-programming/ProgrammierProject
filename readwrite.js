// reading from/writing to JSON
// functions for saving the data
// and reading it from a JSON file

// read data

import * as fs from 'fs'; // import method from 'fs'
export function readData(){
const file = fs.readFileSync('./data.json'); // read JSON-file
const data = JSON.parse(file); 
return data
}

// write data
export function writeData(){
const questionArray = JSON.stringify(jsonArray); //parse obj to str in Json
/// Todo in programm state rein
return questionArray
}