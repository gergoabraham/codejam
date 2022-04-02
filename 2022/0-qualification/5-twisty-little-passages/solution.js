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
    /** Test case number, and additional init parameters */
    T: undefined,

    /** Data that should be inicialized on new test case */
    Ti: 1,
    queryNo: 0,
    input: undefined,
  };

  return (line) => {
    state = updateStateOnInput(state, line);
    decideOutput(state, line, rl, outputCallback);
  };
}

const wrongAnswer = '-1';

/** Processing input **********************************************************/
function updateStateOnInput(state, line) {
  if (line != wrongAnswer) {
    if (!state.T) {
      /** Starting up ********************************/
      state.T = Number(line);
      init(state);
    } else if (!state.N) {
      /** Init for next problem ********************/
      [state.N, state.K] = line.split(' ').map((x) => Number(x));
    } else {
      /** Processing *******************************/
      [state.R, state.W] = line.split(' ').map((x) => Number(x));
      state.R0 = state.R0 || state.R;

      state.visitedRooms.add(state.R);
      state.WSum += state.W;
      /** Processing *******************************/
    }
  }
  return state;
}

function init(state) {
  state.queryNo = 0;
  state.N = null;
  state.K = null;

  state.R = null;
  state.W = null;
  state.R0 = null;
  state.WSum = 0;
  state.visitedRooms = new Set();
}

/** Writing output based on current state *************************************/
function decideOutput(state, line, rl, outputCallback) {
  if (line == wrongAnswer || state.Ti > state.T) {
    /** Exit on finish of wrong answer *********************/
    rl.close();
    process.exit(0);
  } else {
    if (
      (state.K && state.queryNo >= state.K) ||
      (state.N && state.queryNo >= state.N - 1)
    ) {
      returnResult(outputCallback, state);
      init(state);
      state.Ti++;

      if (state.Ti > state.T) {
        rl.close();
        process.exit(0);
      }
    } else if (state.R) {
      returnNextQuery(outputCallback, state);
    }
  }
}

/** Returning the result ********************************************/
function returnResult(outputCallback, state) {
  // const visitedRooms = state.visitedRooms.size;
  // const seenPassages = state.WSum / 2;

  const minPassage = Math.ceil(state.N / 2);
  const maxPassage = (state.N * (state.N - 1)) / 2;
  const expectedPassage = Math.round((minPassage + maxPassage) / 2);
  outputCallback(`E ${expectedPassage}`);

  // const estimate = Math.round((state.WSum / 2 / (state.queryNo + 1)) * state.N);
  // outputCallback(`E ${estimate}`);
}
/** Returning the result ********************************************/

/** Next query ******************************************************/
function returnNextQuery(outputCallback, state) {
  state.queryNo++;
  let nextRoom = null;
  do {
    nextRoom = Math.min(
      Math.max(Math.round(Math.random() * state.N), 1),
      state.N
    );
  } while (state.visitedRooms.has(nextRoom));

  outputCallback(`T ${nextRoom}`);
}
/** Next query ******************************************************/
