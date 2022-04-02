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
    /** array of:
    {
      length: undefined,
      lines: undefined,
      i: 0,
    }, */
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
    if (state.testCases[state.Ti] == undefined) {
      state.testCases[state.Ti] = {};
    }

    readTestCase(state, state.testCases[state.Ti], line);
  }

  return state;
}

function readTestCase(state, testCase, line) {
  if (testCase.length == undefined) {
    testCase.length = 3;

    testCase.i = 0;
    testCase.lines = Array(testCase.length);
  }

  /** Reading one line of input *********************/
  testCase.lines[testCase.i] = line;
  /** Reading one line of input *********************/

  testCase.i++;
  if (testCase.i == testCase.length) {
    state.Ti++;
  }
}

function returnWithResults(state, outputCallback) {
  state.testCases.forEach((testCase, i) => {
    outputCallback(`Case #${i + 1}: ${solveTestCase(testCase)}`);
  });
}

/** Solver function. Boilerplate above this. **********************************/

/** - Input:
 *      testCase {
 *        length: undefined,
 *        lines: undefined,
 *        i: 0,
 *      }
 *
 *  - Output: STRING for "Case #1: STRING"
 * */

function solveTestCase(testCase) {
  const printers = testCase.lines.map((line) =>
    line.split(' ').map((x) => Number(x))
  );

  const minValues = printers.reduce(
    (prev, printer) => prev.map((x, i) => Math.min(x, printer[i])),
    [Infinity, Infinity, Infinity, Infinity]
  );

  const sumOfMins = minValues.reduce((sum, value) => sum + value);

  if (sumOfMins < 10 ** 6) {
    return 'IMPOSSIBLE';
  }

  for (let i = 0; i < 4; i++) {
    const currentSum = minValues.reduce((sum, value) => sum + value);

    if (currentSum > 10 ** 6) {
      minValues[i] -= Math.min(minValues[i], currentSum - 10 ** 6);
    }
  }

  return minValues.join(' ');
}
/** Solver function ***********************************************************/
