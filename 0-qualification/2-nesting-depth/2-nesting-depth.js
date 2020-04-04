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
  let nestingIndex = 0;
  const result = [];

  for (let i = 0; i < inputString.length; i++) {
    const diff = Number(inputString[i]) - nestingIndex;

    if (diff > 0) {
      result.push(...Array(diff).fill('('));
    } else if (diff < 0) {
      result.push(...Array(-diff).fill(')'));
    }

    nestingIndex = inputString[i];
    result.push(inputString[i]);
  }

  if (nestingIndex > 0) {
    result.push(...Array(nestingIndex).fill(')'));
  } else if (nestingIndex < 0) {
    result.push(...Array(-nestingIndex).fill('('));
  }

  return result.join('');
}


if (global.test) {
  module.exports = {lineReaderCallback};
} else {
  main();
}
