'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('Nesting depth', function() {
  it('example test', function() {
    testForInputAndOutput(
        `5
        0000
        101
        111000
        1
        0416`,

        `Case #1: 0000
        Case #2: (1)0(1)
        Case #3: (111)000
        Case #4: (1)
        Case #5: 0((((4)))1(((((6))))))`,
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
