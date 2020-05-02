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
  if (testCase.N == undefined) {
    const input = line.split(' ');
    testCase.N = Number(input[0]);
    testCase.D = Number(input[1]);
  } else {
    testCase.slices = line.split(' ').map((x) => Number(x));
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
  const freqTable = {};

  testCase.slices.forEach((slice) => {
    if (freqTable[slice]) {
      freqTable[slice]++;
    } else {
      freqTable[slice] = 1;
    }
  });

  let maxFreq = 0;
  for (const slice in freqTable) {
    if (freqTable.hasOwnProperty(slice)) {
      const freq = freqTable[slice];
      if (freq > maxFreq) {
        maxFreq = freq;
      }
    }
  }

  let result = -1;
  if (testCase.D == 2) {
    if (maxFreq >= 2) {
      result = 0;
    } else {
      result = 1;
    }
  } else if (testCase.D == 3) {
    if (maxFreq >= 3) {
      result = 0;
    } else if (maxFreq == 1) {
      // find double size => 1 cut
      for (let i = 0; i < testCase.N && result == -1; i++) {
        const baseSlice = testCase.slices[i];
        for (let j = 0; j < testCase.N; j++) {
          const multipleSlice = testCase.slices[j];
          if (multipleSlice == 2*baseSlice) {
            // yep: there is a 2 and a 4, so slice 4 in two
            result = 1;
            break;
          }
        }
      }

      if (result == -1) {
        // there is no multiple, need 2 cuts
        result = 2;
      }
    } else if (maxFreq == 2) {
      // if there is a larger -> 1 cut
      const slices = Object.keys(freqTable).map((x) => Number(x));

      for (const slice in freqTable) {
        if (freqTable.hasOwnProperty(slice)) {
          if (freqTable[slice] == maxFreq) {
            for (let i = 0; i < slices.length && result == -1; i++) {
              if (slices[i] > slice) {
                result = 1;
              }
            }
          }
        }
      }

      // find double size => 1 cut
      for (let i = 0; i < testCase.N && result == -1; i++) {
        const baseSlice = testCase.slices[i];
        for (let j = 0; j < testCase.N; j++) {
          const multipleSlice = testCase.slices[j];
          if (multipleSlice == 2*baseSlice) {
            // yep: there is a 2 and a 4, so slice 4 in two
            result = 1;
            break;
          }
        }
      }

      // if not, 2 cuts
      if (result == -1) {
        // there is no multiple, need 2 cuts
        result = 2;
      }
    }
  }

  return `${result}`;
}
/** Solver function ***********************************************************/
