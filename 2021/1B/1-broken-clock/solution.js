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
  let numbers = inputString.split(' ').map((x) => Number(x));

  let T = null;
  T = calculateTByDifferentHandOrder(numbers);

  if (T === null) {
    numbers = moduloTheSmallest(T, numbers);
    T = calculateTByDifferentHandOrder(numbers);
  }

  if (T === null) {
    numbers = moduloTheSmallest(T, numbers);
    T = calculateTByDifferentHandOrder(numbers);
  }

  const H = Math.floor(T / 10 ** 9 / 3600);
  const M = Math.floor(T / 10 ** 9 / 60) % 60;
  const S = Math.floor(T / 10 ** 9 - M * 60 - H * 3600);
  const N = T - (H * 3600 + M * 60 + S) * 10 ** 9;

  return `${H} ${M} ${S} ${N}`;
}

const FULL_ROUND = 4.32e13;

const calculateT = (A, B, C, inputT) => {
  let T = null;

  for (let i = 0; i < 12 && T === null; i++) {
    const validB = BigInt(B) + BigInt(i) * BigInt(FULL_ROUND);
    const rawCandidate = (validB - BigInt(A));
    const candidate = rawCandidate / BigInt(11);

    if (rawCandidate >= 0 && rawCandidate === candidate * BigInt(11)) {
      // check C
      const elapsedWholeMinutes = BigInt(Math.floor(Number(candidate) / 10 ** 9 / 60));
      const validC = BigInt(C) + elapsedWholeMinutes * BigInt(FULL_ROUND);

      const candidate2 = (validC - validB);

      if (rawCandidate * BigInt(708) === candidate2 * BigInt(11)) {
        T = Number(candidate);
      }
    }
  }

  return T !== null ? T : inputT;
};

function moduloTheSmallest(T, numbers) {
  let newNumbers;
  let min = Infinity;
  let minI = null;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
      minI = i;
    }
  }

  newNumbers = [...numbers];
  newNumbers[minI] += FULL_ROUND;
  return newNumbers;
}

function calculateTByDifferentHandOrder(numbers) {
  let T = null;
  T = calculateT(numbers[0], numbers[1], numbers[2], T);
  T = calculateT(numbers[0], numbers[2], numbers[1], T);
  T = calculateT(numbers[1], numbers[0], numbers[2], T);
  T = calculateT(numbers[1], numbers[2], numbers[0], T);
  T = calculateT(numbers[2], numbers[0], numbers[1], T);
  T = calculateT(numbers[2], numbers[1], numbers[0], T);

  if (T !== null) {
    T = T % FULL_ROUND;
  }

  return T;
}
/** Solver function ***********************************************************/
