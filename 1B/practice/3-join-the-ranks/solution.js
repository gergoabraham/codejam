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
    const input = line.split(' ').map((x) => Number(x));
    state.testCases[state.Ti] = {
      R: input[0],
      S: input[1],
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
  const {R, S} = input;

  const numberOfSteps = (R - 1) * (S - 1);

  const steps = Array(numberOfSteps);

  for (let i = 0; i < steps.length; i++) {
    const A = R * (S - 1) - i;
    const B = Math.ceil((A-(S-1))/(S-1));
    steps[i] = `${A} ${B}`;
  }

  return `${numberOfSteps}\n${steps.join('\n')}`;
}
/** Solver function ***********************************************************/
