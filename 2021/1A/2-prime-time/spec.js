'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('Prime time', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        5
        2 2
        3 1
        5 2
        7 1
        11 1
        1
        17 2
        2
        2 2
        3 1
        1
        2 7`,

        `Case #1: 25
        Case #2: 17
        Case #3: 0
        Case #4: 8`,
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
