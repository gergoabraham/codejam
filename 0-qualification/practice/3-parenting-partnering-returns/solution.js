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
    T: undefined,
    Ti: 0,
    testCases: undefined,
    /** array of:
    {
      length: undefined,
      lines: undefined,
      i: 0,
    }, */
  };

  return (line) => {
    state = collectInput(state, line);

    if (state.Ti == state.T) {
      returnWithResults(state, outputCallback);

      rl.close();
      process.exit();
    }
  };
}

function collectInput(state, line) {
  if (!state.T) {
    state.T = Number(line);
    state.testCases = Array(state.T);
  } else {
    if (state.testCases[state.Ti] == undefined) {
      state.testCases[state.Ti] = {};
    }

    readTestCase(state, state.testCases[state.Ti], line);
  }

  return state;
}

function readTestCase(state, testCase, line) {
  if (testCase.length == undefined) {
    /** Reading the length of testcase *****************/
    testCase.length = Number(line);
    /** Reading the length of testcase *****************/

    testCase.i = 0;
    testCase.lines = Array(testCase.length);
  } else {
    /** Reading one line of input *********************/
    testCase.lines[testCase.i] = line;
    /** Reading one line of input *********************/

    testCase.i++;
    if (testCase.i == testCase.length) {
      state.Ti++;
    }
  }
}

function returnWithResults(state, outputCallback) {
  state.testCases.forEach((testCase, i) => {
    outputCallback(`Case #${i + 1}: ${solveTestCase(testCase)}`);
  });
}


/** Solver function. Boilerplate above this. **********************************/

/** - Input:
 *      testCase {
 *        length: undefined,
 *        lines: undefined,
 *        i: 0,
 *      }
 *
 *  - Output: STRING for "Case #1: STRING"
 * */

function solveTestCase(testCase) {
  const sortedActivities = getSortedActivities(testCase);

  let lastActivityOfJ = {end: 0};
  let lastActivityOfC = {end: 0};

  for (let i = 0; i < sortedActivities.length; i++) {
    const activity = sortedActivities[i];

    if (activity.start >= lastActivityOfC.end) {
      lastActivityOfC = activity;
      activity.assignee = 'C';
    } else if (activity.start >= lastActivityOfJ.end) {
      lastActivityOfJ = activity;
      activity.assignee = 'J';
    } else {
      return 'IMPOSSIBLE';
    }
  }

  const result = getArrayOfAssigneesFrom(sortedActivities);

  return `${result.join('')}`;
}

function getArrayOfAssigneesFrom(sortedActivities) {
  const activitiesInOriginalOrder = sortedActivities
      .sort((a, b) => (a.index - b.index));

  const result = [];

  activitiesInOriginalOrder
      .forEach((activity) => result.push(activity.assignee));

  return result;
}

function getSortedActivities(testCase) {
  const activities = testCase.lines.map((line, index) => {
    line = line.split(' ').map((x) => Number(x));
    return {start: line[0], end: line[1], index: index};
  });

  const sortedActivities = activities.sort((a, b) => (a.start - b.start));

  return sortedActivities;
}
/** Solver function ***********************************************************/
