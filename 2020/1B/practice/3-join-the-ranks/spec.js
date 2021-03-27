'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe.only('Join the ranks', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        2 2
        3 2
        2 3
        3 4`,

        `Case #1: 1
        2 1
        Case #2: 2
        2 2
        1 5
        Case #3: 2
        2 1
        4 1
        Case #4: 5
        2 2
        3 3
        4 4
        6 4
        3 9`,
    );
  });

  it('check the result', function() {
    checkOperation(3, 3);
    checkOperation(5, 3);
  });

  it('if X==R', function() {
    checkOperation(3, 4);
  });


  it('some other tests', function() {
    checkOperation(5, 4);
    checkOperation(7, 4);
    checkOperation(7, 3);
    checkOperation(7, 9);
    checkOperation(10, 9);
  });

  function checkOperation(R, S) {
    const output = invokeFunctionUnderTest(R, S);

    checkNumberOfSteps(output, R, S);
    checkSteps(output, R, S);
  }


  /** Testing helpers from here ***********************************************/
  function testForInputAndOutput(input, expectedOutput) {
    const actualOutputLines = [];

    const callbackUnderTest = getLineReaderCallback(
        {close: () => {}},
        (result) => actualOutputLines.push(...result.split('\n')),
    );

    const inputLines = input.split('\n').map((x) =>x.trim());
    const expectedOutputLines = expectedOutput.split('\n').map((x) =>x.trim());

    inputLines.forEach((line) => callbackUnderTest(line));

    actualOutputLines.should.deep.equal(expectedOutputLines);
  }
});

function checkSteps(output, R, S) {
  const steps = getStepsFromOutputString(output);

  let deck = createDeck(R, S);
  deck = performStepsOnDeck(steps, deck);

  checkThatDeckIsNowSorted(deck);
}

function checkThatDeckIsNowSorted(deck) {
  const sortedDeck = deck.map((x) => (x));
  sortedDeck.sort((a, b) => (a-b));
  deck.should.deep.equal(sortedDeck);
}

function getStepsFromOutputString(output) {
  return output.splice(1).map((line) => {
    const A_B = line.split(' ');
    return {
      A: Number(A_B[0]),
      B: Number(A_B[1]),
    };
  });
}

function checkNumberOfSteps(actualOutputLines, R, S) {
  const numberOfSteps = Number(actualOutputLines[0].split(' ')[2]);
  numberOfSteps.should.be.equal(Math.ceil((R * S - R) / 2));
}

function invokeFunctionUnderTest(R, S) {
  const actualOutputLines = [];
  const callbackUnderTest = getLineReaderCallback({close: () => { }}, (result) => actualOutputLines.push(...result.split('\n')));
  callbackUnderTest('1');
  callbackUnderTest(`${R} ${S}`);
  return actualOutputLines;
}

function performStepsOnDeck(steps, deck) {
  steps.forEach((step) => {
    deck = [
      ...deck.slice(step.A, step.A + step.B),
      ...deck.slice(0, step.A),
      ...deck.slice(step.A + step.B),
    ];
  });
  return deck;
}

function createDeck(R, S) {
  const deck = Array(R * S);
  for (let i = 0; i < deck.length; i++) {
    deck[i] = (i) % R + 1;
  }
  return deck;
}

