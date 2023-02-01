<<<<<<< HEAD
=======
function parseOperations(operations, index) {
  //setup
  let numberIndex = 0;
  let term = [];
  let recentOperation = true;
  for (i = index; i < operations.length; i++) {
    if (operations[i] === "(") {
      //neuen unter term erstellen
      let newTerm = parseOperations(operations, i + 1);
      term.push(newTerm);
      recentOperation = false;
    } else if (operations[i] === ")") {
      //unter term ist fertig 
      return term;
    } else if (isNaN(parseInt(operations[i]))) {
      //rechenoperation
      if (recentOperation) {
        console.log(`ungültige Anweisung ${operations[i - 1]}${operations[i]}`);
        return [];
      } else {
        numberIndex += 2;
        term.push(operations[i]);
        recentOperation = true;
      }
    } else {
      //zahl
      if (numberIndex === term.length - 1) {
        term[numberIndex] += operations[i];
      } else {
        term.push(operations[i]);
      }
      recentOperation = false;
    }
  }
  if (recentOperation) {
    console.log("ended with operation")
    return [];
  } else {
    console.log("ganzer term fertig");
    return term;
  }
}

function computeOperations(operationLists, depth) {
  // console.log(operationLists);
  if (typeof (operationLists) === typeof (2)) {
    return operationLists;
  }
  if (operationLists.length === 1) {
    console.log("too small");
    return operationLists[0];
  }
  for (i = 0; i < operationLists.length; i++) {
    if (!isNaN(parseFloat(operationLists[i])) && !(Array.isArray(operationLists[i]))) {
      operationLists[i] = parseFloat(operationLists[i]);
    }
  }

  indexes.push(0);
  //compute multiplication/division
  for (i = 0; i < operationLists.length; i++) {
    indexes[depth] = i;
    if (operationLists[indexes[depth]] === "*") {
      let param1 = computeOperations(operationLists[indexes[depth] - 1], depth + 1);
      let param2 = computeOperations(operationLists[indexes[depth] + 1], depth + 1);
      operationLists[indexes[depth] - 1] = param1 * param2;
      console.log("computing " + param1 + " * " + param2 + " = " + operationLists[indexes[depth]-1]);
      operationLists.splice(indexes[depth] + 1,1);
      operationLists.splice(indexes[depth],1);
      i -= 1;
    } else if (operationLists[indexes[depth]] === "/") {
      let param1 = computeOperations(operationLists[indexes[depth] - 1], depth + 1);
      let param2 = computeOperations(operationLists[indexes[depth] + 1], depth + 1);
      if (param2 === 0) {
        console.log("division by 0");
        return null;
      }
      operationLists[indexes[depth] - 1] = param1 / param2;
      console.log("computing " + param1 + " / " + param2 + " = " + operationLists[indexes[depth]-1]);
      operationLists.splice(indexes[depth] + 1,1);
      operationLists.splice(indexes[depth],1);
      i -= 1;
    }
  }
  indexes.pop();
  indexes.push(0);
  //compute addition or substraction
  console.log(operationLists);
  for (i = 0; i < operationLists.length; i++) {
    indexes[depth] = i;
    console.log("+/-" + i);
    if (operationLists[indexes[depth]] === "+") {
      // console.log("making plus");
      let param1 = computeOperations(operationLists[indexes[depth] - 1], depth + 1);
      let param2 = computeOperations(operationLists[indexes[depth] + 1], depth + 1);
      operationLists[indexes[depth] - 1] = param1 + param2;
      console.log("computing " + param1 + " + " + param2 + " = " + operationLists[indexes[depth]-1]);
      operationLists.splice(indexes[depth] + 1,1);
      operationLists.splice(indexes[depth],1);
      i -= 1;
    } else if (operationLists[indexes[depth]] === "-") {
      let param1 = computeOperations(operationLists[indexes[depth] - 1], depth + 1);
      let param2 = computeOperations(operationLists[indexes[depth] + 1], depth + 1);
      operationLists[indexes[depth] - 1] = param1 - param2;
      console.log("computing " + param1 + " - " + param2 + " = " + operationLists[indexes[depth]-1]);
      operationLists.splice(indexes[depth] + 1,1);
      operationLists.splice(indexes[depth],1);
      i -= 1;
    }
  }
  return operationLists[0];
}
while(true){
  ausprobieren = prompt("bitte Gleichung eingeben");
  indexes = [];
  // list = ["12" , "+" , ["1", "+", "4"]];
  // console.log(Array.isArray(list));
  // console.log(Array.isArray(list[0]));
  // console.log(Array.isArray(list[2]));
  
  console.log(computeOperations(parseOperations(ausprobieren, 0), 0));
}
//Test
>>>>>>> ca9c5b94ca0691786cfc495a4500f416bd093807
