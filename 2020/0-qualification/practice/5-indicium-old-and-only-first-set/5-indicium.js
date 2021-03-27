'use strict';

/**
 * Sort of a backtracking algorithm to find matrices, but too slow.
 *
 * OK for test set 1.
 * Not ok for test set 2.
 */
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
  };

  let Ti = 0;

  return (line) => {
    ({input, Ti} = collectInput(input, line, Ti));

    if (Ti == input.T) {
      returnWithResults(input, outputCallback);
      rl.close();
      process.exit();
    }
  };
}

function collectInput(input, line, Ti) {
  if (!input.T) {
    input.T = Number(line);
    input.testCases = Array(input.T);
  } else {
    input.testCases[Ti] = line;
    Ti++;
  }

  return {input, Ti};
}

function returnWithResults(input, outputCallback) {
  input.testCases.forEach((testCase, i) => {
    outputCallback(`Case #${i + 1}: ${solveTestCase(testCase)}`);
  });
}


function solveTestCase(inputString) {
  const [N, K] = inputString.split(' ').map((x) => Number(x));

  if (N == 2 && ![2, 4].includes(K)) {
    return 'IMPOSSIBLE';
  } else if (N == 3 && ![3, 6, 9].includes(K)) {
    return 'IMPOSSIBLE';
  } else if (!(K == N || K == N*N || (K > N+1 && K < N*N-1))) {
    return 'IMPOSSIBLE';
  }

  const result = Array(N);
  const columns = Array(N);
  const rows = Array(N);
  for (let i = 0; i < N; i++) {
    result[i] = Array(N);
    columns[i] = {};
    rows[i] = {};
  }

  const diagonal = buildDiagonal(N, K);
  diagonal.forEach((elem, i) => {
    result[i][i] = elem;
    columns[i][elem] = 1;
    rows[i][elem] = 1;
  });

  const path = {
    x: 0,
    y: 0,
    children: {},
  };

  let previous = path;
  let n = 0;
  while (n < N * N) {
    let x = previous.x;
    let y = previous.y;
    ({x, y} = getNextCoordinate(x, y, N));
    if (x==y) {
      ({x, y} = getNextCoordinate(x, y, N));
    }
    if (x == N) {
      break;
    }

    let i = 1;
    // find first okay value
    for (i = 1; i <= N; i++) {
      if (!columns[y][i] && !rows[x][i] && !previous.children[i]) {
        break;
      }
    }

    if (i > N) {
      x = previous.x;
      y = previous.y;

      result[x][y] = undefined;
      columns[y][previous.value] = undefined;
      rows[x][previous.value] = undefined;

      previous = previous.parent;
      n--;
    } else {
      const value = i;
      result[x][y] = value;
      columns[y][value] = 1;
      rows[x][value] = 1;

      const newNode = {
        value: value,
        x: x,
        y: y,
        parent: previous,
        children: {},
      };
      previous.children[value] = newNode;
      previous = newNode;

      n++;
    }
  }

  return 'POSSIBLE\n' + result.map((line) => line.join(' ')).join('\n');
}


function getNextCoordinate(x, y, N) {
  y = (y == N - 1) ? 0 : y + 1;
  x = (y == 0) ? x + 1 : x;
  return {y, x};
}

function buildDiagonal(N, K) {
  const result = Array(N);

  for (let i = 0; i < N; i++) {
    if (N > (K - (N - i - 1))) {
      result[i] = (K - (N - i - 1));
    } else {
      result[i] = N;
    }

    K -= result[i];

    if (i == 0 && result[i] > 1 && K == N - 1) {
      K++;
      result[i]--;
    }

    if (i == N - 1 && result[i] < N && result[i-1] == N) {
      result[i]++;
      result[i-1]--;
    }
  }
  return result;
}


if (global.testEnvironment) {
  module.exports = {getLineReaderCallback, buildDiagonal, solveTestCase};
} else {
  main();
}
