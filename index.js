// main file
// here the main programm loop will take place
// and the inputs will be forwarded to the
// responsible functions
import {programmState, question, multipleChoice} from './utils.js';
import { saveData, readData } from './readwrite.js';
import chalk from 'chalk';
import psp from 'prompt-sync-plus';
import {red, blue, warning} from './design.js';

const prompt = psp();

import { handleManagement } from "./management.js";
import { handleTraining } from "./training.js";

// String def
let mainString = "Sie befinden sich im Hauptmenü, was möchten Sie tun?\n" + 
                   blue("[1]") + " Zum Verwaltungsmenü\n" + 
                   blue("[2]") + " Zum Anwendungsmenü\n" +
                   red("[exit]") + " Beenden der App\n";
//////////////

let ps = new programmState("main",[],[]); //[]dummy
let ps2 = readData("defaultPS")

// Start of Programm
console.log(blue("Willkommen") + " in der Lernapp!");
console.log("Mit" + red(" [exit}") + " kommt man zurück zum Hauptmenü bzw. beendet das Programm");

let input = prompt(mainString);

// programm loop

while (input !== "exit") {
  switch (input) {
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
  console.clear();
  input = prompt(mainString);
}
//console.log(ps2); /////////////////////////////////////////////
