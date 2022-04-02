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
    if (!state.testCases[state.Ti]) {
      const [N, K] = line.split(' ').map(x => Number(x));
      state.testCases[state.Ti] = {N, K};
    } else {
      state.testCases[state.Ti].cards = line.split(' ').map(x => Number(x)); /* storing input lines */
      state.Ti++;
    }
  }

  return state;
}

function returnWithResults(state, outputCallback) {
  state.testCases.forEach((testCase, i) => {
    outputCallback(`Case #${i + 1}: ${solveTestCase(testCase)}`);
  });
}


/** Solver function. Boilerplate above this. **********************************/
function solveTestCase({N, K, cards}) {

  cards.sort((a, b) => a-b);

  const onePickPerArea = [];
  const twoPicksPerArea = [];


  // first island
  onePickPerArea.push(cards[0] - 1);

  // middle islands
  for (let i = 1; i < N; i++) {
    const onPick = Math.floor((cards[i] - cards[i - 1]) / 2);
    onePickPerArea.push(onPick);
    twoPicksPerArea.push(cards[i] - cards[i - 1] - 1);
  }

  // last island
  onePickPerArea.push(K - cards[cards.length - 1]);


  // sort islands
  onePickPerArea.sort((a, b) => b - a);
  twoPicksPerArea.sort((a, b) => b - a);

  // candidates
  const candidate1 = onePickPerArea[0] + onePickPerArea[1];
  const candidate2 = twoPicksPerArea[0] || 0;

  // winner
  const winner = Math.max(candidate1, candidate2);

  // possibility
  const p = winner / K;

  return `${p.toFixed(6)}`;
}
/** Solver function ***********************************************************/
