'use strict';

if (global.testEnvironment) {
  module.exports = { getLineReaderCallback };
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
    outputCallback(`Case #${i + 1}:\n${solveTestCase(testCase)}`);
  });
}

/** Solver function. Boilerplate above this. **********************************/
function solveTestCase(inputString) {
  const [R, C] = inputString.split(' ').map((x) => Number(x));

  const separatorLine = new Array(2 * C + 1)
    .fill(null)
    .map((_, i) => (!(i % 2) ? '+' : '-'))
    .join('');

  const dataLine = new Array(2 * C + 1)
    .fill(null)
    .map((_, i) => (!(i % 2) ? '|' : '.'))
    .join('');

  const firstSeparatorLine = new Array(2 * C + 1)
    .fill(null)
    .map((_, i) => (i < 2 ? '.' : !(i % 2) ? '+' : '-'))
    .join('');

  const firstDataLine = new Array(2 * C + 1)
    .fill(null)
    .map((_, i) => (i < 2 ? '.' : !(i % 2) ? '|' : '.'))
    .join('');

  const resultArray = new Array(2 * R + 1);
  resultArray[0] = firstSeparatorLine;
  resultArray[1] = firstDataLine;
  resultArray[2] = separatorLine;

  for (let i = 3; i < 2 * R + 1; i++) {
    resultArray[i] = i % 2 ? dataLine : separatorLine;
  }

  return resultArray.join('\n');
}

/** Solver function ***********************************************************/
