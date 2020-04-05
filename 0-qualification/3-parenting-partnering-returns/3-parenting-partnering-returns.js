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
  let input = {
    T: undefined,
    cases: undefined,
  };

  let Ti = 0;
  let Ni = 0;

  return (line) => {
    ({input, Ti, Ni} = collectInput(input, line, Ti, Ni));

    if (Ti == input.T) {
      rl.close();
      returnWithResults(input, outputCallback);
    }
  };
}

function collectInput(input, line, Ti, Ni) {
  if (!input.T) {
    input.T = Number(line);
    input.testCases = Array(input.T);
  } else {
    if (!input.testCases[Ti]) {
      const N = Number(line);
      input.testCases[Ti] = {
        N: N,
        data: Array(N),
      };

      Ni = 0;
    } else {
      input.testCases[Ti].data[Ni] = line.split(' ').map((x) => Number(x));
      Ni++;

      if (Ni == input.testCases[Ti].N) {
        Ti++;
      }
    }
  }

  return {input, Ti, Ni};
}

function returnWithResults(input, outputCallback) {
  input.testCases.forEach((testCase, i) => {
    outputCallback(`Case #${i + 1}: ${solveTestCase(testCase)}`);
  });
}


function solveTestCase(testCase) {
  return `IMPOSSIBLE`;
}


if (global.test) {
  module.exports = {lineReaderCallback};
} else {
  main();
}
