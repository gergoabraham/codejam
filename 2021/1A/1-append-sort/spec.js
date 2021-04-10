'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('1 - Append sort', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        3
        100 7 10
        2
        10 10
        3
        4 19 1
        3
        1 2 3`,

        `Case #1: 4
        Case #2: 1
        Case #3: 2
        Case #4: 0`,
    );
  });

  it('1', function() {
    testForInputAndOutput(
        `3
        2
        675 6 6
        2
        666 7
        3
        9 9 99 9`,

        `Case #1: 4
        Case #2: 2
        Case #3: 3`,
    );
  });

  it('damn', function() {
    testForInputAndOutput(
        `3
        2
        1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 21 39 409 4
        2
        666 666
        3
        555555 556 55 5 5 5 5 5 5 5 5 5 5 5 5`,

        `Case #1: 22
        Case #2: 1
        Case #3: 67`,
    );
  });

  it('damn', function() {
    testForInputAndOutput(
        `1
        5
        654984954687465466846544 6 2`,

        `Case #1: 47`,
    );
  });

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
