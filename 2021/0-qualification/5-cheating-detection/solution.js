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
    T: null,
    P: null,
    Ti: 0,
    testCases: null,
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
  } else if (state.P === null) {
    state.P = Number(line);
  } else {
    if (state.testCases[state.Ti] == undefined) {
      state.testCases[state.Ti] = {
        length: 100,
        i: 0,
        lines: Array(100),
      };
    }

    readTestCase(state, state.testCases[state.Ti], line);
  }

  return state;
}

function readTestCase(state, testCase, line) {
  if (testCase.length == undefined) {
    /** Reading the length of testcase *****************/
    testCase.length = Number(line);
    /** Reading the length of testcase *****************/

    testCase.i = 0;
    testCase.lines = Array(testCase.length);
  } else {
    /** Reading one line of input *********************/
    testCase.lines[testCase.i] = line;
    /** Reading one line of input *********************/

    testCase.i++;
    if (testCase.i == testCase.length) {
      state.Ti++;
    }
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
  const sums = testCase.lines.map((player) =>
    player.split('').reduce((sum, val) => sum + Number(val), 0)
  );
  console.log(sums)
  let maxIndex = 0;
  let max = sums[0];
  for (let i = 1; i < 100; i++) {
      if (sums[i] > max) {
        max = sums[i];
        maxIndex = i;
      }
  }

  return `${maxIndex + 1}`;
}
/** Solver function ***********************************************************/
