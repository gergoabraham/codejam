'use strict';

if (global.testEnvironment) {
  module.exports = {getLineReaderCallback};
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
    outputCallback(`Case #${i + 1}: ${solveTestCase(testCase)}`);
  });
}


/** Solver function. Boilerplate above this. **********************************/
function solveTestCase(inputString) {
  let [X, Y, mural] = inputString.split(' ');
  X = Number(X);
  Y = Number(Y);

  let cost = 0;
  let previousCharacter = mural[0];
  for (let i = 1; i < mural.length; i++) {
    const currentCharacter = mural[i];

    const pair = previousCharacter + currentCharacter;

    if (pair === 'CJ') {
      cost += X;
    } else if (pair == 'JC') {
      cost += Y;
    }

    if (currentCharacter !== '?') {
      previousCharacter = currentCharacter;
    }
  }
  return cost;
}
/** Solver function ***********************************************************/
