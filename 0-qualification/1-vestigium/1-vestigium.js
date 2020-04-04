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
  let k = 0;
  let r = 0;
  let c = 0;
  const matrix = testCase.data;

  const numbersInAllColumns = Array(testCase.N);
  for (let i = 0; i < numbersInAllColumns.length; i++) {
    numbersInAllColumns[i] = {};
  }

  for (let x = 0; x < testCase.N; x++) {
    const rowElements = {};

    for (let y = 0; y < testCase.N; y++) {
      rowElements[matrix[x][y]] = 1;
      numbersInAllColumns[y][matrix[x][y]] = 1;

      if (x == y) {
        k += matrix[x][y];
      }
    }

    if (Object.keys(rowElements).length != testCase.N) {
      r++;
    }
  }

  numbersInAllColumns.forEach((forOneColumn) => {
    if (Object.keys(forOneColumn).length != testCase.N) {
      c++;
    }
  });

  return `${k} ${r} ${c}`;
}


if (global.test) {
  module.exports = {lineReaderCallback};
} else {
  main();
}
