'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');
const testInput = require('./test-input');

describe('5 - Cheating detection', function() {
  it('example test', function() {
    testForInputAndOutput(
        testInput,

        `Case #1: 59`,
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
