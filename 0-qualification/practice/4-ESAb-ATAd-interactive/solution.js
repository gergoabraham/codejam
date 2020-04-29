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
    /** Test case number, and additional init parameters */
    T: undefined,
    queryLength: undefined, /** optional */

    /** Data that should be inicialized on new test case */
    Ti: 1,
    queryNo: 0,
    Pi: undefined,
    input: undefined,
    samePair: undefined,
    diffPair: undefined,
    // { index: undefined, value: undefined }
  };

  return (line) => {
    state = updateStateOnInput(state, line);
    state.queryNo++;
    decideOutput(state, line, rl, outputCallback);
  };
}


const wrongAnswer = 'N';

/** Processing input **********************************************************/
function updateStateOnInput(state, line) {
  if (line != wrongAnswer) {
    if (!state.T) {
      /** Starting up ********************************/
      ([state.T, state.B] = line.split(' ').map((x) => Number(x)));
      state.queryNo = 0;
      state.input = Array(state.B);
      /** Starting up ********************************/
    } else {
      if (line == 'Y') {
        /** Init for next problem ********************/
        initForNextProblem(state);
        /** Init for next problem ********************/
      } else {
        /** Processing *******************************/
        if (state.queryNo % 10 == 1 && state.queryNo > 10) {
          performComplementingIfNeeded(state, line);
        } else if (state.queryNo % 10 == 2 && state.queryNo > 10) {
          performReversalIfNeeded(state, line);
        } else {
          state.input[state.Pi - 1] = Number(line);
          storePairs(state);
        }

        /** Processing *******************************/
      }
    }
  }
  return state;
}

function initForNextProblem(state) {
  state.Ti++;
  state.queryNo = 0;
  state.input = Array(state.B);
  state.Pi = undefined;
  state.samePair = undefined;
  state.diffPair = undefined;
}

function performComplementingIfNeeded(state, line) {
  if (state.samePair && Number(line) != state.samePair.value) {
    state.input = state.input.map((x) => complement(x));

    state.samePair.value = complement(state.samePair.value);
    if (state.diffPair) {
      // diffPair is affected by complmenentation, so it is updated
      state.diffPair.value = complement(state.diffPair.value);
    }
  }
}


function performReversalIfNeeded(state, line) {
  if (state.diffPair && Number(line) != state.diffPair.value) {
    state.input = state.input.map((x, i, array) => array[state.B - i - 1]);

    state.diffPair.value = complement(state.diffPair.value);
  }
}

function storePairs(state) {
  if (state.Pi > state.B / 2) {
    if (!state.samePair) {
      if (state.input[state.Pi - 1] == state.input[state.B - state.Pi]) {
        state.samePair = createPair(state);
      }
    }

    if (!state.diffPair) {
      if (state.input[state.Pi - 1] != state.input[state.B - state.Pi]) {
        state.diffPair = createPair(state);
      }
    }
  }
}

function createPair(state) {
  const pair = {};

  pair.value = state.input[state.B - state.Pi];
  pair.index = state.B - state.Pi + 1;

  return pair;
}

function complement(value) {
  return value == 0 ? 1 : 0;
}

/** Writing output based on current state *************************************/
function decideOutput(state, line, rl, outputCallback) {
  if (line == wrongAnswer || state.Ti > state.T) {
    /** Exit on finish of wrong answer *********************/
    rl.close();
    process.exit(0);
  } else {
    if (state.Pi == state.B/2 + 1) {
      returnResult(outputCallback, state);
    } else {
      returnNextQuery(outputCallback, state);
    }
  }
}

/** Returning the result ********************************************/
function returnResult(outputCallback, state) {
  outputCallback(state.input.join(''));
}
/** Returning the result ********************************************/


/** Next query ******************************************************/
function returnNextQuery(outputCallback, state) {
  let query;

  if (state.queryNo % 10 == 1 && state.queryNo > 10) {
    // checking the samePair for complement
    query = state.samePair ? state.samePair.index : 1;
  } else if (state.queryNo % 10 == 2 && state.queryNo > 10) {
    // checking the diffPair for reversal
    query = state.diffPair ? state.diffPair.index : 1;
  } else if (!state.Pi) {
    // init
    state.Pi = 1;
    query = state.Pi;
  } else if (state.Pi <= state.B/2) {
    // "right" side
    state.Pi = state.B - state.Pi + 1;
    query = state.Pi;
  } else {
    // "left" side
    state.Pi = state.B - state.Pi + 1 + 1;
    query = state.Pi;
  }

  outputCallback(query);
}
/** Next query ******************************************************/

