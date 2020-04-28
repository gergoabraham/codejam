'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('Multiple lines input', function() {
  it('example test', function() {
    testForInputAndOutput(
        `2
        3
        first
        second
        third
        2
        only
        two`,

        `Case #1: POSSIBLE
        first second third
        Case #2: POSSIBLE
        only two`,
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
