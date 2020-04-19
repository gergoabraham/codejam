'use strict';

function main() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', lineReaderCallback(rl, console.log));
}

function lineReaderCallback(rl, outputCallback) {
  const state = {
    T: undefined,
    Ti: 1,
    B: undefined,
    x: undefined,
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
      } else if (state.array[state.x - 1] == undefined) {
        state.array[state.x - 1] = Number(line);
      } else {
        state.array[state.B - state.x] = Number(line);
        state.x++;
      }
    }

    if (line == 'N' || state.Ti > state.T) {
      rl.close();
      process.exit(0);
    } else if (state.x > state.B/2) {
      outputCallback(state.array.map((x) => x.toString()).join(''));
    } else if (state.array[state.x - 1] == undefined) {
      outputCallback(state.x);
    } else {
      outputCallback(state.B - state.x + 1);
    }
  };
}


if (global.test) {
  module.exports = {lineReaderCallback};
} else {
  main();
}
