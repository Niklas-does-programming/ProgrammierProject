// main file
// here the main programm loop will take place 
// and the inputs will be forwarded to the
// responsible functions
import {programmState, question, multipleChoice} from './utils.js';
import { saveData } from './readwrite.js';

import psp from 'prompt-sync-plus';
const prompt = psp();

import {handleManagement} from './management.js';
import {handleTraining} from './training.js';

// String def
let mainString = "Sie befinden sich im Hauptmenü, was möchten Sie tun?\n" + 
                   "[1] Zum Verwaltungsmenü\n" + 
                   "[2] Zum Anwendungsmenü\n" +
                   "[exit] Beenden der App\n";
//////////////

let ps = new programmState("main",[],[]); //[]dummy

// const dic = {"deshalb" : true,"weil" : true, "Baum" : false};

let q1 = new question("Frage", "warum", "darum", "Mathe", 0, 0);
let q2 = new question("Frage", "waru", "daru", "Mathe", 0, 0);
let q3 = new question("Frage", "weshalb", "deshalb", "Deutsch", 0, 0);
let q4 = new multipleChoice("Mult-Frage", "weshalb", {"deshalb" : true,"weil" : true, "Baum" : false}, "Deutsch", 0, 0);


let ps2 = new programmState("main", [q1, q2, q3, q4], ["Mathe", "Deutsch"]);

// Start of Programm
console.log("Wilkommen zu der Lernapp");
console.log("Mit exit kommt man zurück zum Hauptmenü bzw. beendet das Programm");

let input = prompt(mainString);

// programm loop

while(input !== "exit"){

    switch(input){
        case "1":
            ps.menu = "ver";
            console.clear();
            handleManagement(ps2);
            break;
        case "2":
            ps.menu = "anw";
            console.clear();
            handleTraining(ps2);
            break;
        default:
            console.log("Ungültige Eingabe");
            break;

    }
    input = prompt(mainString);
}   
//console.log(ps2);/////////////////////////////////////////////
saveData("defaultPS", ps2)