// main file
// here the main programm loop will take place 
// and the inputs will be forwarded to the
// responsible functions
import {programmState} from './utils.js';

import psp from 'prompt-sync-plus';
const prompt = psp();

let ps = new programmState("main",[],[]); //[]dummy

// read data from file+
console.log("Wilkommen zu der Lernapp");
console.log("Mit exit kommt man zurück zum Hauptmenü bzw. beendet das Programm");

let input = prompt('Eingabe(ver für Verwaltungsmodus, anw für Anwendungsmodus, exit): ');

// programm loop

while(input !== "exit"){

    switch(input){
        case "ver":
            ps.menu = "ver";
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
