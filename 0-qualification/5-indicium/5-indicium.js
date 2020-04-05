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
  };

  let Ti = 0;

  return (line) => {
    ({input, Ti} = collectInput(input, line, Ti));

    if (Ti == input.T) {
      rl.close();
      returnWithResults(input, outputCallback);
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

  const path = [];
  const removedPath = [];
  let removedCandidates = {};
  let watchdog = 15;

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (x != y) {
        let candidate = getCandidate(y, x, result, N);

        let counter = 0;
        while ((columns[y][candidate] || rows[x][candidate] || removedCandidates[candidate]) && counter < N) {
          candidate++;
          candidate = (candidate > N) ? 1 : candidate;
          counter++;
        }

        if (counter != N) {
          removedCandidates = {};
          result[x][y] = candidate;
          columns[y][candidate] = 1;
          rows[x][candidate] = 1;
          // removedStep = undefined;

          path.push({x, y, candidate});
        } else {
          const step = path.pop();
          result[step.x][step.y] = undefined;
          columns[step.y][step.candidate] = undefined;
          rows[step.x][step.candidate] = undefined;

          removedCandidates[step.candidate] = 1;

          x = step.x;
          y = step.y - 1;
          watchdog--;

          removedPath.push(step);
        }
      }

      if (watchdog == 0) {
        return 'POSSIBLE\n' + result.map((line) => line.join(' ')).join('\n');
      }
    }
  }

  return 'POSSIBLE\n' + result.map((line) => line.join(' ')).join('\n');
}

function getCandidate(y, x, result, N) {
  let candidate;
  if (y > 0) {
    if (y == x + 1 && result[x][y - 1] > 1) {
      candidate = 1;
    } else {
      candidate = (result[x][y - 1] + 1);
      candidate = (candidate > N) ? 1 : candidate;
    }
  } else {
    candidate = result[x - 1][y] - 1;
    candidate = (candidate == 0) ? N : candidate;
  }
  return candidate;
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


if (global.test) {
  module.exports = {lineReaderCallback, buildDiagonal};
} else {
  main();
}
