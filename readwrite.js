// reading from/writing to JSON
// functions for saving the data
// and reading it from a JSON file

// read data

import * as fs from 'fs'; // import method from 'fs'
export function readData(){
const file = fs.readFileSync('./data.json'); // read JSON-file
const data = JSON.parse(file); 
}

// write data
import { LocalStorage } from 'node-localstorage';
export function writeData(){
const localStorage = new LocalStorage('./database');
const myContacts = [
    {
      id: 1,
      name: "Alice"
    },
    {
      id: 2,
      name: "Bob"
    }
];
const questionArray = JSON.stringify(myContacts); //parse obj to str in Jsonformat
localStorage.setItem("contacts", questionArray);
const dataString = localStorage.getItem("contacts");
const contacts = JSON.parse(dataString);
console.log(contacts)
}

writeData()