// reading from/writing to JSON
// functions for saving the data
// and reading it from a JSON file

let jsonFile = require('jsonfile');

for (i = 0; i < 11; i++) {
    jsonFile.writeFile('loop.json', "id :" + i + " square :" + i * i);
}
// read data



// write data