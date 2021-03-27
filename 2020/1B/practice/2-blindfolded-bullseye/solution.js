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
    A: undefined, /** optional */
    B: undefined,

    /** Data that should be inicialized on new test case */
    Ti: 1,
    queryNo: 0,
    foundHit: undefined,
    points: [], // array of 4 points
    input: undefined,
    searching: undefined,
  };

  return (line) => {
    state = updateStateOnInput(state, line);
    state.queryNo++;
    decideOutput(state, line, rl, outputCallback);
  };
}


const wrongAnswer = 'WRONG';
const searchTable = [
  '0 0',
  '-500000000 0',
  '500000000 0',
  '0 -500000000',
  '-500000000 -500000000',
  '500000000 -500000000',
  '0 500000000',
  '-500000000 500000000',
  '500000000 500000000',
];

/**
 * The algorithm:
 *  1) shoot in some places to find a coordinate which is inside the circle
 *  2) perform 4 binary searches, to find 4 points on the circle edge
 *  3) calculate the center of the circle from the 4 points
 *  4) shoot 9 cells around the center (to avoid rounding problems)
 */

/** Processing input **********************************************************/
function updateStateOnInput(state, line) {
  if (line != wrongAnswer) {
    if (!state.T) {
      /** Starting up ********************************/
      ([state.T, state.A, state.B] = line.split(' ').map((x) => Number(x)));
      state.queryNo = 0;
      state.input = '';
      /** Starting up ********************************/
    } else {
      if (line == 'CENTER') {
        /** Init for next problem ********************/
        state.Ti++;
        state.queryNo = 0;
        state.input = '';
        state.foundHit = undefined;
        state.points = [];
        state.searching = undefined;
        /** Init for next problem ********************/
      } else {
        /** Processing *******************************/
        if (!state.foundHit) {
          if (line == 'HIT') {
            state.foundHit = searchTable[state.queryNo - 1].split(' ').map((x) => Number(x));

            // first search between -10^9...x
            state.searching = {};
            state.searching.A = state.foundHit[0];
            state.searching.B = -1000000000;
            state.searching.dir = -1;
          }
        } else {
          // binary search
          if ((state.searching.A >= state.searching.B && state.searching.dir > 0) ||
          (state.searching.A <= state.searching.B && state.searching.dir < 0)) {
            // found it
            let point;
            let foundTarget;
            const modifier = state.searching.A == state.searching.B ? 0 : state.searching.dir;

            if (line == 'HIT') {
              foundTarget = state.searching.A - modifier;
            } else {
              // MISS
              foundTarget = state.searching.A - state.searching.dir;
            }

            if (state.points.length < 2) {
              point = [foundTarget, state.foundHit[1]];
            } else {
              point = [state.foundHit[0], foundTarget];
            }

            state.points.push(point);

            switch (state.points.length) {
              case 1:
                // secondly: search between x...10^9
                state.searching = {};
                state.searching.A = state.foundHit[0];
                state.searching.B = 1000000000;
                state.searching.dir = 1;
                break;
              case 2:
                // thirdly: search between -10^9...y
                state.searching = {};
                state.searching.A = state.foundHit[1];
                state.searching.B = -1000000000;
                state.searching.dir = -1;
                break;
              case 3:
                // last: search between y...10^9
                state.searching = {};
                state.searching.A = state.foundHit[1];
                state.searching.B = 1000000000;
                state.searching.dir = 1;
                break;
              case 4:
                state.center = {};
                state.center.x = Math.round((state.points[0][0] + state.points[1][0]) / 2);
                state.center.y = Math.round((state.points[2][1] + state.points[3][1]) / 2);
                state.centerShootCounter = 0;
                break;
            }
          } else if (line == 'HIT') {
            state.searching.A = state.searching.target + state.searching.dir;
          } else if (line == 'MISS') {
            state.searching.B = state.searching.target - state.searching.dir;
          }
        }
        /** Processing *******************************/
      }
    }
  }
  return state;
}

function getSearchTarget(state) {
  return Math.round((state.searching.A + state.searching.B) / 2);
}

/** Writing output based on current state *************************************/
function decideOutput(state, line, rl, outputCallback) {
  if (line == wrongAnswer || state.Ti > state.T) {
    /** Exit on finish of wrong answer *********************/
    rl.close();
    process.exit(0);
  } else {
    if (state.queryNo > state.A) {
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
  if (!state.foundHit) {
    outputCallback(searchTable[state.queryNo - 1]);
  } else if (state.points.length < 4) {
    state.searching.target = getSearchTarget(state);
    let output;
    if (state.points.length < 2) {
      output = `${state.searching.target} ${state.foundHit[1]}`;
    } else {
      output = `${state.foundHit[0]} ${state.searching.target}`;
    }
    outputCallback(output);
  } else {
    // let's shoot the center
    const xDiff = state.centerShootCounter % 3 - 1;
    const yDiff = Math.floor(state.centerShootCounter / 3) - 1;

    outputCallback(`${state.center.x + xDiff} ${state.center.y - yDiff}`);

    state.centerShootCounter++;
  }
}
/** Next query ******************************************************/

