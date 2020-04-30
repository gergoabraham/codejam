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
    input: undefined,
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
      ([state.T, state.queryLength] = line.split(' ').map((x) => Number(x)));
      state.queryNo = 0;
      state.input = '';
      /** Starting up ********************************/
    } else {
      if (line == 'Y') {
        /** Init for next problem ********************/
        state.Ti++;
        state.queryNo = 0;
        state.input = '';
        /** Init for next problem ********************/
      } else {
        /** Processing *******************************/
        state.input += line;
        /** Processing *******************************/
      }
    }
  }
  return state;
}

/** Writing output based on current state *************************************/
function decideOutput(state, line, rl, outputCallback) {
  if (line == wrongAnswer || state.Ti > state.T) {
    /** Exit on finish of wrong answer *********************/
    rl.close();
    process.exit(0);
  } else {
    if (state.queryNo > state.queryLength) {
      returnResult(outputCallback, state);
    } else {
      returnNextQuery(outputCallback, state);
    }
  }
}

/** Returning the result ********************************************/
function returnResult(outputCallback, state) {
  outputCallback(state.input);
}
/** Returning the result ********************************************/


/** Next query ******************************************************/
function returnNextQuery(outputCallback, state) {
  outputCallback(state.queryNo);
}
/** Next query ******************************************************/

