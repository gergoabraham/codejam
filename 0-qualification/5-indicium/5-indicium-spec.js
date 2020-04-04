'use strict';

global.test = true;

const {lineReaderCallback} = require('./5-indicium');

describe.only('Nesting depth', function() {
  it('example test', function() {
    testForInputAndOutput(
        `2
        3 6
        2 3`,

        `Case #1: POSSIBLE
        2 1 3
        3 2 1
        1 3 2
        Case #2: IMPOSSIBLE`,
    );
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
