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
  if (testCase.Q == undefined) {
    /** Reading the length of testcase *****************/
    testCase.Q = Number(line);
    /** Reading the length of testcase *****************/

    testCase.length = 10000;
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

function solveTestCase(input) {
  const data = input.lines.map((x) => {
    const line = x.split(' ');
    return {
      num: line[0],
      str: line[1],
    };
  });

  // data.sort((a, b) => (a.str.length - b.str.length));

  const frequencyTable = {};

  // fill freq table for 1...9
  data.forEach((number) => {
    const firstChar = number.str.charAt(0);

    if (frequencyTable[firstChar]) {
      frequencyTable[firstChar]++;
    } else {
      frequencyTable[firstChar] = 1;
    }
  });

  // get digit string for 1...9
  const digitString = Array(10);
  for (let i = 1; i < 10; i++) {
    let maxVal = 0;
    let maxChar = '';
    for (const character in frequencyTable) {
      if (frequencyTable.hasOwnProperty(character)) {
        const num = frequencyTable[character];
        if (num > maxVal) {
          maxVal = num;
          maxChar = character;
        }
      }
    }
    digitString[i] = maxChar;
    frequencyTable[maxChar] = undefined;
  }

  // find the zero!
  for (let i = 0; i < data.length; i++) {
    const number = data[i];
    if (number.str.length > 1) {
      const lastDigit = number.str.charAt(number.str.length - 1);

      if (!frequencyTable.hasOwnProperty(lastDigit)) {
        // found the zero!
        digitString[0] = lastDigit;
        break;
      }
    }
  }


  return `${digitString.join('')}`;
}
/** Solver function ***********************************************************/
