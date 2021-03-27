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
    const input = line.split(' ').map((x) => Number(x));
    state.testCases[state.Ti] = {
      R: input[0],
      S: input[1],
    };
    state.Ti++;
  }

  return state;
}

function returnWithResults(state, outputCallback) {
  state.testCases.forEach((testCase, i) => {
    outputCallback(`Case #${i + 1}: ${solveTestCase(testCase)}`);
  });
}


/** Solver function. Boilerplate above this. **********************************/
function solveTestCase(input) {
  const {R, S} = input;
  const numberOfSteps = Math.ceil((S*R-R) / 2);

  const steps = calculateTheSteps(numberOfSteps, R, S);

  return `${numberOfSteps}\n${steps.join('\n')}`;
}

function calculateTheSteps(numberOfSteps, R, S) {
  const steps = Array(numberOfSteps);
  let deck = createDeck(R, S);

  for (let i = 0; i < numberOfSteps; i++) {
    const X = deck[0];
    let A = putAllXCardsInA(deck, X);
    let B;

    if (isLastStepWhereXEqualsR(X, R, i, numberOfSteps)) {
      B = putAllRemainingCardsInB(B, R, S, A);
    } else {
      const Y = deck[A];
      A = putAllYCardsInA(deck, A, Y);

      B = putFollowingCardsAndOneXCardInB(B, deck, A, X);
    }

    steps[i] = `${A} ${B}`;
    deck = performStepOnDeck(deck, A, B);
  }
  return steps;
}

function putAllRemainingCardsInB(B, R, S, A) {
  B = R * S - A;
  return B;
}

function isLastStepWhereXEqualsR(X, R, i, numberOfSteps) {
  return X == R && i == numberOfSteps - 1;
}

function performStepOnDeck(deck, A, B) {
  return [...deck.slice(A, A + B), ...deck.slice(0, A), ...deck.slice(A + B)];
}

function putFollowingCardsAndOneXCardInB(B, deck, A, X) {
  B = 0;
  while (deck[B + A] != X) {
    B++;
  }
  B++;
  return B;
}

function putAllYCardsInA(deck, A, Y) {
  while (deck[A] == Y) {
    A++;
  }
  return A;
}

function putAllXCardsInA(deck, X) {
  let j = 1;
  while (deck[j] == X) {
    j++;
  }
  return j;
}

function createDeck(R, S) {
  const deck = Array(R * S);
  for (let i = 0; i < deck.length; i++) {
    deck[i] = (i) % R + 1;
  }
  return deck;
}
/** Solver function ***********************************************************/
