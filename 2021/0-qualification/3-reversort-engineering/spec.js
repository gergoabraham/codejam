'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('3 - Reversort Engineering', function() {
  it('example test', function() {
    testForInputAndOutput(
        `5
        4 6
        2 1
        7 12
        7 2
        2 1000`,

        `Case #1: 4 3 2 1
        Case #2: 1 2
        Case #3: 7 6 5 4 3 2 1
        Case #4: IMPOSSIBLE
        Case #5: IMPOSSIBLE`,
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
