'use strict';

function main() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', getLineReaderCallback(rl, console.log));
}

function getLineReaderCallback(rl, outputCallback) {
  const state = {
    T: undefined,
    Ti: 1,
    B: undefined,
    x: undefined,
    queryNo: 0,
    samePair: {x: undefined, value: undefined},
    diffPair: {x: undefined, value: undefined},
    array: [],
  };

  return (line) => {
    if (!state.T) {
      ([state.T, state.B] = line.split(' ').map((x) => Number(x)));
      state.x = 1;
    } else {
      if (line == 'Y') {
        // next problem or finish
        state.array = [];
        state.x = 1;
        state.Ti++;
        state.queryNo = 0;
        state.samePair.x = undefined;
        state.samePair.value = undefined;
        state.diffPair.x = undefined;
        state.diffPair.value = undefined;
      } else if ((state.queryNo) > 10 && state.queryNo % 10 == 1) {
        // same pair
        if (state.samePair.value != undefined) {
          state.samePair.value = Number(line);
        }
      } else if ((state.queryNo) > 10 && state.queryNo % 10 == 2) {
        // diff pair
        if (state.diffPair.value != undefined) {
          state.diffPair.value = Number(line);
        }

        // do operation
        if (state.samePair.value != state.array[state.samePair.x - 1] &&
          state.diffPair.value != state.array[state.diffPair.x - 1]) {
          // complement
          state.array = state.array.map((x) => x?0:1);
        } else if (state.samePair.value == state.array[state.samePair.x - 1] &&
          state.diffPair.value != state.array[state.diffPair.x - 1]) {
          state.array.reverse();
        } else if (state.samePair.value != state.array[state.samePair.x - 1] &&
        state.diffPair.value == state.array[state.diffPair.x - 1]) {
          state.array = state.array.map((x) => x?0:1);
          state.array.reverse();
        }
      } else if (state.array[state.x - 1] == undefined) {
        // first of pair
        state.array[state.x - 1] = Number(line);
      } else {
        // second of pair
        state.array[state.B - state.x] = Number(line);

        // storing same-diff
        if (state.samePair.x == undefined &&
            state.array[state.x - 1] == state.array[state.B - state.x]) {
          state.samePair.x = state.x;
          state.samePair.value = state.array[state.x - 1];
        }
        if (state.diffPair.x == undefined &&
          state.array[state.x - 1] != state.array[state.B - state.x]) {
          state.diffPair.x = state.x;
          state.diffPair.value = state.array[state.x - 1];
        }

        state.x++;
      }
    }

    state.queryNo++;


    if (line == 'N' || state.Ti > state.T) {
      // exit
      rl.close();
      process.exit(0);
    } else if (state.x > state.B/2) {
      // give solution
      outputCallback(state.array.map((x) => x.toString()).join(''));
    } else if (state.queryNo > 10 && state.queryNo % 10 == 1) {
      // checking pairs
      outputCallback(state.samePair.x || state.diffPair.x);
    } else if (state.queryNo > 10 && state.queryNo % 10 == 2) {
      // checking pairs
      outputCallback(state.diffPair.x || state.samePair.x);
    } else if (state.array[state.x - 1] == undefined) {
      outputCallback(state.x);
    } else {
      outputCallback(state.B - state.x + 1);
    }
  };
}


if (global.testEnvironment) {
  module.exports = {getLineReaderCallback};
} else {
  main();
}
