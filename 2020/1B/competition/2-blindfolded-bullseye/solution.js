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
    queryLength: 300, /** optional */
    A: undefined,
    B: undefined,

    /** Data that should be inicialized on new test case */
    Ti: 1,
    queryNo: 0,
    input: undefined,
    x: undefined,
    y: undefined,

    state: '',
    si: undefined,
    siprev: undefined,
    found: false,
  };

  return (line) => {
    state = updateStateOnInput(state, line);
    state.queryNo++;
    decideOutput(state, line, rl, outputCallback);
  };
}


const wrongAnswer = 'WRONG';

/** Processing input **********************************************************/
function updateStateOnInput(state, line) {
  if (line != wrongAnswer) {
    if (!state.T) {
      /** Starting up ********************************/
      ([state.T, state.A, state.B] = line.split(' ').map((x) => Number(x)));
      state.queryNo = 0;
      state.input = '';
      state.x = -5;
      state.y = -5;
      state.state = 'vert';
      state.si = 1000000000 - 50;
      state.found = false;
      /** Starting up ********************************/
    } else {
      if (line == 'CENTER') {
        /** Init for next problem ********************/
        state.Ti++;
        state.queryNo = 0;
        state.input = '';
        state.x = -5;
        state.y = -5;
        state.siprev = 1000000000 - 100;
        /** Init for next problem ********************/
      } else {
        /** Processing *******************************/
        state.input = line;

        if (line == 'HIT') {
          state.found = true;
          state.siprev = state.si;
          state.si = Math.round((state.si + 1000000000) / 2);
        } else {
          state.found = false;
          state.si = Math.round((state.si + state.siprev) / 2);
        }
        /** Processing *******************************/
      }
    }
  }
  return state;
}

/** Writing output based on current state *************************************/
function decideOutput(state, line, rl, outputCallback) {
  if (line == wrongAnswer ||
      state.queryNo > state.queryLength ||
      state.Ti > state.T) {
    /** Exit on finish of wrong answer *********************/
    rl.close();
    process.exit(0);
  } else {
    if (state.A == 999999995) {
      outputCallback(`${state.x} ${state.y}`);

      if (state.y < 5) {
        state.y++;
      } else {
        if (state.x < 5) {
          state.x++;
          state.y = -5;
        } else {
        // oops
          rl.close();
          process.exit(0);
        }
      }
    } else {
      if (state.state = 'vert') {
        outputCallback(`0 ${state.si}`);
      }
    }
  }
}

/** Returning the result ********************************************/
/** Returning the result ********************************************/


/** Next query ******************************************************/
/** Next query ******************************************************/

