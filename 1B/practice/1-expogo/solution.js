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
    const coordinateArray = line.split(' ').map((x) => Number(x));
    state.testCases[state.Ti] = {x: coordinateArray[0], y: coordinateArray[1]};
    state.Ti++;
  }

  return state;
}

function returnWithResults(state, outputCallback) {
  state.testCases.forEach((testCase, i) => {
    let result = solveTestCase(testCase.x, testCase.y);
    result = result.includes('0') ? 'IMPOSSIBLE' : result;

    outputCallback(`Case #${i + 1}: ${result}`);
  });
}


/** Solver function. Boilerplate above this. **********************************/
function solveTestCase(x, y) {
  if (isFinished(x, y)) {
    return '';
  } else if (!isValid(x, y)) {
    return '0';
  } else {
    let nextStep;

    ({nextStep, x, y} = getNextStep(x, y));

    return nextStep + solveTestCase(x, y);
  }
}

function getNextStep(x, y) {
  let step;
  let xCandidate;
  let yCandidate;

  ({step, xCandidate, yCandidate} = getNextTrivialStep(x, y));

  if (!(isValid(xCandidate, yCandidate) ||
        isFinished(xCandidate, yCandidate))) {
    ({step, xCandidate, yCandidate} = goTheOtherWay(x, y));
  }

  return {nextStep: step, x: xCandidate, y: yCandidate};
}

function isFinished(x, y) {
  return x == 0 && y == 0;
}

function isValid(x, y) {
  const absX = Math.abs(x);
  const absY = Math.abs(y);

  return ((absX % 2 == 1 && absY % 2 == 0) ||
          (absX % 2 == 0 && absY % 2 == 1));
}

function getNextTrivialStep(x, y) {
  return goInGivenWay(x, y, false);
}

function goTheOtherWay(x, y) {
  return goInGivenWay(x, y, true);
}

function goInGivenWay(x, y, shouldGoTheOtherWay) {
  let step;

  if (Math.abs(x) % 2 == 1) {
    if (x > 0 ^ shouldGoTheOtherWay) {
      step = 'E';
      x -= 1;
    } else {
      step = 'W';
      x += 1;
    }
  } else {
    if (y > 0 ^ shouldGoTheOtherWay) {
      step = 'N';
      y -= 1;
    } else {
      step = 'S';
      y += 1;
    }
  }

  x /= 2;
  y /= 2;

  return {step, xCandidate: x, yCandidate: y};
}

/** Solver function ***********************************************************/
