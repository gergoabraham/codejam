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
    outputCallback(`Case #${i + 1}: ${solveTestCase(testCase)}`);
  });
}

/** Solver function. Boilerplate above this. **********************************/
function solveTestCase(inputString) {
  const [N, C] = inputString.split(' ').map((x) => Number(x));

  const possibleMinCost = N - 1;
  const possibleMaxCost = (N**2 + N) / 2 - 1;

  // 1) Checking min-max
  if (C > possibleMaxCost || C < possibleMinCost) {
    return 'IMPOSSIBLE';
  }

  // 2) Distribute costs
  let remainingCost = C;
  const costs = new Array(N - 1);
  for (let i = 0; i < N - 1; i++) {
    costs[i] = Math.min(N - i, remainingCost - (N - i - 2));
    remainingCost -= costs[i];
  }

  // 3) Create array - O(N^2)
  let array = new Array(N).fill(0).map((x, i) => i + 1);

  for (let i = N-2; i >= 0; i--) {
    if (costs[i] > 1) {
      array = reverse(array, i, i + costs[i] - 1);
    }
  }

  return array.join(' ');
}

function reverse(array, i, j) {
  const newArray = new Array(array.length);

  for (let k = 0; k < array.length; k++) {
    if (k < i || k > j) {
      newArray[k] = array[k];
    } else {
      newArray[k] = array[j - k + i];
    }
  }

  return newArray;
}

/** Solver function ***********************************************************/
