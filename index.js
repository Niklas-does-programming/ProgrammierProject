// main file
// here the main programm loop will take place 
// and the inputs will be forwarded to the
// responsible functions
import {programmState, question} from './utils.js';

import psp from 'prompt-sync-plus';
const prompt = psp();

import {handleManagement} from './management.js';

let ps = new programmState("main",[],[]); //[]dummy

let q1 = new question("Frage", "warum", "darum", "Mathe", 0, 0);
let q2 = new question("Frage", "waru", "daru", "Mathe", 0, 0);
let q3 = new question("Frage", "weshalb", "deshalb", "Deutsch", 0, 0);


let ps2 = new programmState("main", [q1, q2, q3], ["Mathe", "Deutsch"]);

// read data from file+
console.log("Wilkommen zu der Lernapp");
console.log("Mit exit kommt man zurück zum Hauptmenü bzw. beendet das Programm");

let input = prompt('Eingabe(ver für Verwaltungsmodus, anw für Anwendungsmodus, exit): ');

// programm loop

while(input !== "exit"){

    switch(input){
        case "ver":
            ps.menu = "ver";
            handleManagement(ps2);
            break;
        case "anw":
            ps.menu = "anw";
            break;
        default:
            console.log("Ungültige Eingabe");
            break;

    }
    input = prompt('Eingabe(ver für Verwaltungsmodus, anw für Anwendungsmodus, exit): ');
}   
console.log(ps2);/////////////////////////////////////////////