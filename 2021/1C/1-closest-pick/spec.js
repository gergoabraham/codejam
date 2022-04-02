'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('1 Closest pick', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        3 10
        1 3 7
        4 10
        4 1 7 3
        4 3
        1 2 3 2
        4 4
        1 2 4 2`,

        `Case #1: 0.500000
        Case #2: 0.400000
        Case #3: 0.000000
        Case #4: 0.250000`,
    );
  });

  it('large', function() {
    testForInputAndOutput(
        `1
        3 1000000000
        165 987653 14`,

        `Case #1: 0.999506`,
    );
  });

  it('one', function() {
    testForInputAndOutput(
        `1
        1 10
        7`,

        `Case #1: 0.900000`,
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
