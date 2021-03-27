'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./3-parenting-partnering-returns');

describe('Parenting Partnering Returns', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        3
        360 480
        420 540
        600 660
        3
        0 1440
        1 3
        2 4
        5
        99 150
        1 100
        100 301
        2 5
        150 250
        2
        0 720
        720 1440`,

        `Case #1: CJC
        Case #2: IMPOSSIBLE
        Case #3: JCCJJ
        Case #4: CC`);
  });


  function testForInputAndOutput(input, expectedOutput) {
    const actualOutputLines = [];

    const callbackUnderTest = getLineReaderCallback(
        {close: () => {}},
        (result) => actualOutputLines.push(result),
    );

    const inputLines = input.split('\n').map((x) =>x.trim());
    const expectedOutputLines = expectedOutput.split('\n').map((x) =>x.trim());

    inputLines.forEach((line) => callbackUnderTest(line));

    actualOutputLines.should.deep.equal(expectedOutputLines);
  }
});
