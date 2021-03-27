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
  const matrix = testCase.lines.map((line)=>line.split(' ').map((x) => Number(x)));

  // time complexity: linear
  const k = getTrace(matrix);
  const r = getRepeatingRows(matrix);
  const c = getRepeatingColumns(matrix);

  return `${k} ${r} ${c}`;
}

function getRepeatingColumns(matrix) {
  let c = 0;
  for (let ri = 0; ri < matrix.length; ri++) {
    const elementsHashTable = {};
    for (let ci = 0; ci < matrix[ri].length; ci++) {
      elementsHashTable[matrix[ci][ri]] = 1;
    }
    if (Object.keys(elementsHashTable).length != matrix.length) {
      c++;
    }
  }
  return c;
}

function getRepeatingRows(matrix) {
  let r = 0;
  for (let ri = 0; ri < matrix.length; ri++) {
    const elementsHashTable = {};
    for (let ci = 0; ci < matrix[ri].length; ci++) {
      elementsHashTable[matrix[ri][ci]] = 1;
    }
    if (Object.keys(elementsHashTable).length != matrix.length) {
      r++;
    }
  }
  return r;
}

function getTrace(matrix) {
  let k = 0;
  for (let i = 0; i < matrix.length; i++) {
    k += matrix[i][i];
  }
  return k;
}
/** Solver function ***********************************************************/
