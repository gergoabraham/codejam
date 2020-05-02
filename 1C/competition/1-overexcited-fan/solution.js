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
    const input = line.split(' ');
    state.testCases[state.Ti] = {
      x: Number(input[0]),
      y: Number(input[1]),
      path: input[2],
    };
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
function solveTestCase(input) {
  let {x, y, path} = input;
  let dManhattan = Math.abs(x) + Math.abs(y);

  for (let i = 1; i <= path.length; i++) {
    // perform step
    const step = path.charAt(i-1);
    switch (step) {
      case 'N':
        y++;
        break;
      case 'S':
        y--;
        break;
      case 'W':
        x--;
        break;
      case 'E':
        x++;
        break;
    }

    // d_m
    dManhattan = Math.abs(x) + Math.abs(y);

    // done?
    if (i >= dManhattan) {
      return i;
    }
  }

  return `IMPOSSIBLE`;
}
/** Solver function ***********************************************************/
