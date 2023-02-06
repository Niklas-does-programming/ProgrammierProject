// main file
// here the main programm loop will take place 
// and the inputs will be forwarded to the
// responsible functions
class programmState{
    constructor(menu ,questionArray, categoryArray){
        this.menu = menu;
        this.questionArray = questionArray;
        this.categoryArray = categoryArray;
    }
};

const prompt = require("prompt-sync")();
// import * as fs from 'fs'; // importiere Methoden aus 'fs'
// const file = fs.readFileSync('./data.json'); // JSON-Datei einlesen
// const data = JSON.parse(file); // JSON-Daten --> JS Array/Objekte

let ps = new programmState("main",[],[]); //[]dummy

// read data from file
console.log("Wilkommen zu der Lernapp");
console.log("Mit exit kommt man zurück zum main menu bzw. beendet das Programm");

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