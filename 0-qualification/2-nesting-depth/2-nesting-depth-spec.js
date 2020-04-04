'use strict';

global.test = true;

const {lineReaderCallback} = require('./2-nesting-depth');

describe('Nesting depth', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        0000
        101
        111000
        1`,

        `Case #1: 0000
        Case #2: (1)0(1)
        Case #3: (111)000
        Case #4: (1)`);
  });


  function testForInputAndOutput(input, expectedOutput) {
    const actualOutputLines = [];

    const callbackUnderTest = lineReaderCallback(
        {close: () => {}},
        (result) => actualOutputLines.push(result),
    );

    const inputLines = input.split('\n').map((x) =>x.trim());
    const expectedOutputLines = expectedOutput.split('\n').map((x) =>x.trim());

    inputLines.forEach((line) => callbackUnderTest(line));

    actualOutputLines.should.deep.equal(expectedOutputLines);
  }
});
