'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('Overexcited fan', function() {
  it('example test', function() {
    testForInputAndOutput(
        `5
        4 4 SSSS
        3 0 SNSS
        2 10 NSNNSN
        0 1 S
        2 7 SSSSSSSS`,

        `Case #1: 4
        Case #2: IMPOSSIBLE
        Case #3: IMPOSSIBLE
        Case #4: 1
        Case #5: 5`,
    );
  });

  it('Example #2', function() {
    testForInputAndOutput(
        `2
        3 2 SSSW
        4 0 NESW`,

        `Case #1: 4
        Case #2: 4`,
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
