// reading from/writing to JSON
// functions for saving the data
// and reading it from a JSON file

// read data

import * as fs from 'fs'; // import method from 'fs'
const file = fs.readFileSync('./data.json'); // read JSON-file
const data = JSON.parse(file); 


// write data
function writeData(){
const questionArray = JSON.parse(jsonArray); //parse obj to str in Json
/// Todo in programm state rein
}