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
    const lineArray = line.split(' ');
    testCase.lines[testCase.i] = {P: Number(lineArray[0]), N: Number(lineArray[1])};
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

function findStuff(cards, start, prod, sum, maxScore) {
  for(let i = start; i < cards.length; i++) {
    sum -= cards[i];
    prod *= cards[i];

    if (sum === prod) {
      maxScore = sum > maxScore ? sum : maxScore;
    } else if (prod < sum) {
      // start rec
      ({prod, sum, maxScore} = findStuff(cards, i + 1, prod, sum, maxScore));
    } else {
      sum += cards[i];
      prod /= cards[i];
      return {prod, sum, maxScore};
    }

    sum += cards[i];
    prod /= cards[i];
  }

  return {prod, sum, maxScore};
}

function solveTestCase(testCase) {
  const cards = [];
  testCase.lines.forEach(card => {
    for (let i = 0; i < card.N; i++) {
      cards.push(card.P);
    }
  })
  const SUM = cards.reduce((prev, c) => prev + c, 0);
  let maxScore = 0;

  ({maxScore} = findStuff(cards, 0, 1, SUM, 0));


  return `${maxScore > 1 ? maxScore : 0}`;
}
/** Solver function ***********************************************************/
