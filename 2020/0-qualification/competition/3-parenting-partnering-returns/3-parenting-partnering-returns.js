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
  let input = {
    T: undefined,
    cases: undefined,
  };

  let Ti = 0;
  let Ni = 0;

  return (line) => {
    ({input, Ti, Ni} = collectInput(input, line, Ti, Ni));

    if (Ti == input.T) {
      returnWithResults(input, outputCallback);
      rl.close();
      process.exit();
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
      input.testCases[Ti].data[Ni] = [Ni, ...line.split(' ').map((x) => Number(x))];
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
  const assignees = Array(testCase.N);
  const C = [[0, 0, 0]];
  const J = [[0, 0, 0]];

  const sortedData = testCase.data.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < sortedData.length; i++) {
    const x = sortedData[i];

    if (x[1] >= C[C.length-1][2]) {
      C.push(x);
      assignees[x[0]] = 'C';
    } else if (x[1] >= J[J.length-1][2]) {
      J.push(x);
      assignees[x[0]] = 'J';
    } else {
      return 'IMPOSSIBLE';
    }
  }

  return assignees.join('');
}


if (global.testEnvironment) {
  module.exports = {getLineReaderCallback};
} else {
  main();
}
