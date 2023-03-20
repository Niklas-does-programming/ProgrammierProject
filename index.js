// main file
// here the main programm loop will take place
// and the inputs will be forwarded to the
// responsible functions
import {programmState, question, multipleChoice} from './utils.js';
import { saveData, readData } from './readwrite.js';
import {exit, blue, green, warning, black, yellow, underline} from './design.js';
import { handleManagement } from "./management.js";
import { handleTraining } from "./training.js";
import { prompt } from './utils.js'


// String def
let mainString = "Sie befinden sich im Hauptmenü, was möchten Sie tun?\n" + 
                   blue("[1]") + " Zum Verwaltungsmenü\n" + 
                   blue("[2]") + " Zum Anwendungsmenü\n" +
                   exit + " Beenden der App\n";

let start =  yellow("Willkommen") + " in der Lernapp!\n"+
             "Mit " + exit + " kommt man zurück zum Hauptmenü bzw. beendet das Programm" + "\n";      //nice to have: bild in terminal (geht recht einfach mit enquirer)            
//////////////

                  
let ps = new programmState("main",[],[]); //[]dummy
let ps2 = readData("defaultPS")

// Start of Programm
console.clear();
console.log(start)
let input = await prompt(mainString);

// programm loop
while (input !== "exit") {
  switch (input) {
    case "1":
      ps.menu = "ver";
      console.clear();
      await handleManagement(ps2);
      break;
    case "2":
      ps.menu = "anw";
      console.clear();
      await handleTraining(ps2);
      break;
    default:
      console.log(warning("Ungültige Eingabe"));
      break;
  }
  console.clear();
  input = await prompt(mainString);
}
//console.log(ps2); /////////////////////////////////////////////
