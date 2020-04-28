'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('One line input', function() {
  it('example test', function() {
    testForInputAndOutput(
        `2
        1 2 3
        4 5 6`,

        `Case #1: POSSIBLE
        1 2 3
        Case #2: POSSIBLE
        4 5 6`,
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
