'use strict';

if (global.testEnvironment) {
  module.exports = { getLineReaderCallback, reversort };
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
    if (!state.testCases[state.Ti]) {
      // don't care about the length
      state.testCases[state.Ti] = true;
    } else {
      state.testCases[state.Ti] = line; /* storing input lines */
      state.Ti++;
    }
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
  return `${reversort(inputString.split(' ').map(x =>Number(x)))[1]}`;
}

function reversort(input) {
  let array = [...input];
  let cost = 0;

  for (let i = 0; i < array.length - 1; i++) {
    const j = findMinIndexFromI(i, array);

    // reverse(i, j)
    const newArray = new Array(array.length);
    for (let k = 0; k < array.length; k++) {
      if (k < i || k > j) {
        newArray[k] = array[k];
      } else {
        newArray[k] = array[j - k + i];
      }
    }
    array = newArray;

    const currentCost = j - i + 1;
    cost += currentCost;
  }

  return [array, cost];
}


function findMinIndexFromI(i, array) {
  let min = Infinity;
  let j = 0;
  for (let k = i; k < array.length; k++) {
    if (array[k] < min) {
      min = array[k];
      j = k;
    }
  }
  return j;
}
/** Solver function ***********************************************************/
