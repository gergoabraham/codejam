'use strict';

if (global.testEnvironment) {
  module.exports = { getLineReaderCallback };
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
  if (!testCase.N) {
    testCase.N = Number(line);
  } else if (!testCase.funFactors) {
    testCase.funFactors = line.split(' ').map((x) => Number(x));
  } else {
    testCase.targets = line.split(' ').map((x) => Number(x));
    state.Ti++;
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

class Module {
  constructor(id, fun, parent) {
    this.id = id;
    this.fun = fun;
    this.parent = parent;
    this.children = [];
  }
}

function solveTestCase(testCase) {
  const { N, funFactors, targets } = testCase;

  const modules = new Array(N + 1);
  modules[0] = new Module(0, 0, null);

  for (let i = 0; i < N; i++) {
    const parentModule = modules[targets[i]];
    const module = new Module(i + 1, funFactors[i], parentModule);

    modules[i + 1] = module;
    parentModule.children.push(module);
  }

  const result = traverse(modules[0]);

  return result.outFun + result.fun;
}

/**
 *
 * @param {Module} node
 */
const traverse = (node) => {
  let fun = node.fun;
  let outFun = 0;
  const childrenFun = [];

  for (let i = 0; i < node.children.length; i++) {
    const childResult = traverse(node.children[i]);

    outFun += childResult.outFun;
    childrenFun.push(childResult.fun);
  }

  if (childrenFun.length > 1) {
    const minFun = childrenFun.reduce((prev, x) => Math.min(prev, x));
    const sumFun = childrenFun.reduce((prev, x) => prev + x);

    outFun += sumFun - minFun;
    fun = Math.max(fun, minFun);
  } else if (childrenFun.length === 1) {
    fun = Math.max(fun, childrenFun[0]);
  }

  return { fun, outFun };
};

/** Solver function ***********************************************************/
