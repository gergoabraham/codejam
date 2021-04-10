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
  } else if (!state.testCases[state.Ti]) {
    state.testCases[state.Ti] = [];
  } else {
    state.testCases[state.Ti] = line.split(' ').map(x => BigInt(x)); /* storing input lines */
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
const digits = (n) => BigInt(n.toString().length);
function solveTestCase(input) {
  let appends = 0;

  for (let i = 1; i < input.length; i++) {
    const current = input[i];
    const prev = input[i - 1];

    if (current <= prev) {
      if (digits(current) === digits(prev)) {
        input[i] *= BigInt(10);
        appends++;
      } else {
        const prevLeft = BigInt(prev.toString().slice(0, Number(digits(current))));

        const orderDiff = digits(prev) - digits(current);
        if (current > prevLeft) {
          input[i] *= BigInt(10) ** (orderDiff);
          appends += Number(orderDiff);
        } else if (current < prevLeft) {
          input[i] *= BigInt(10) ** (orderDiff + BigInt(1));
          appends += Number(orderDiff) + 1;
        } else { // ===
          let candidate = input[i - 1] + BigInt(1);
          if (candidate.toString().slice(0, Number(digits(current))) !== current.toString()) {
            input[i] *= BigInt(10) ** (orderDiff + BigInt(1));
            appends += Number(orderDiff) + 1;
          } else {
            input[i] = input[i - 1] + BigInt(1);
            appends += Number(orderDiff);
          }
        }
      }
    }
  }

  return appends;
}
/** Solver function ***********************************************************/
