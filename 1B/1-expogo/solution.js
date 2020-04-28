'use strict';

if (global.testEnvironment) {
  module.exports = {getLineReaderCallback, generate};
} else {
  main();
}

function main() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', getLineReaderCallback(rl, console.log));
}

/** The function that returns with the readline-callback function for:
 *  - storing input,
 *  - calculating result.
 *
 *  This is the function that is called from the test environment.
 */
function getLineReaderCallback(rl, outputCallback) {
  let state = {
    T: undefined,
    Ti: 0,
    testCases: undefined,
    lookupTable: generate(9),
  };

  return (line) => {
    state = collectInput(state, line);

    if (state.Ti == state.T) {
      returnWithResults(state, outputCallback);

      rl.close();
      process.exit();
    }
  };
}

function collectInput(state, line) {
  if (!state.T) {
    state.T = Number(line);
    state.testCases = Array(state.T);
  } else {
    state.testCases[state.Ti] = line; /* storing input lines */
    state.Ti++;
  }

  return state;
}

function returnWithResults(state, outputCallback) {
  state.testCases.forEach((testCase, i) => {
    outputCallback(`Case #${i + 1}: ${solveTestCase(state, testCase)}`);
  });
}


/** Solver function. Boilerplate above this. **********************************/
function solveTestCase(state, inputString) {
  return state.lookupTable[inputString] || 'IMPOSSIBLE';
}
/** Solver function ***********************************************************/

function generate(n, table={}, steps='', i=0, x=0, y=0) {
  let newSteps;
  let newX;
  let newY;

  // north
  newSteps = steps + 'N';
  newX = x;
  newY = y + Math.pow(2, i);
  table = checkAddContinue(table, newX, newY, newSteps, n, generate, i);

  // west
  newSteps = steps + 'W';
  newX = x - Math.pow(2, i);
  newY = y;
  table = checkAddContinue(table, newX, newY, newSteps, n, generate, i);

  // south
  newSteps = steps + 'S';
  newX = x;
  newY = y - Math.pow(2, i);
  table = checkAddContinue(table, newX, newY, newSteps, n, generate, i);

  // east
  newSteps = steps + 'E';
  newX = x + Math.pow(2, i);
  newY = y;
  table = checkAddContinue(table, newX, newY, newSteps, n, generate, i);

  return table;
}

function checkAddContinue(table, newX, newY, newSteps, n, generate, i) {
  if (newX <= 100 && newY <= 100 && newX >= -100 && newY >= -100) {
    if ((table[`${newX} ${newY}`] == undefined ||
        table[`${newX} ${newY}`].length > newSteps.length)) {
      table[`${newX} ${newY}`] = newSteps;
    }
    if (n > 1) {
      table = generate(n - 1, table, newSteps, i + 1, newX, newY);
    }
  }
  return table;
}
