'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe.only('Oversized pancake choppers', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        1 3
        1
        5 2
        10 5 359999999999 123456789 10
        2 3
        8 4
        3 2
        1 2 3`,

        `Case #1: 2
        Case #2: 0
        Case #3: 1
        Case #4: 1`,
    );
  });

  it('D=2', function() {
    testForInputAndOutput(
        `2
        3 2
        1 3 1 1 1 1 3 5 4
        5 2
        1 2 3 4 5 6 7 8`,

        `Case #1: 0
        Case #2: 1`,
    );
  });

  it('D=3, freq >= 3', function() {
    testForInputAndOutput(
        `2
        3 3
        1 3 1 3 2 4 1
        15 3
        1 2 3 4 5 4 3 2 3 1 3 1 1 1 1`,

        `Case #1: 0
        Case #2: 0`,
    );
  });

  it('D=3, freq=1', function() {
    testForInputAndOutput(
        `2
        4 3
        3 4 2 1
        4 3
        1 7 3 5`,

        `Case #1: 1
        Case #2: 2`,
    );
  });

  it('D=3, freq=2', function() {
    testForInputAndOutput(
        `4
        4 3
        1 2 3 2 3
        4 3
        7 7 3 5
        4 3
        7 7 3 6
        4 3
        1 2 3 3`,

        `Case #1: 1
        Case #2: 2
        Case #3: 1
        Case #4: 1`,
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
