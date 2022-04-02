'use strict';

global.testEnvironment = true;

const { getLineReaderCallback } = require('./solution');

describe('d1000000', function () {
  it('example test', function () {
    testForInputAndOutput(
      `4
      4
      6 10 12 8
      6
      5 4 5 4 4 4
      10
      10 10 7 6 7 4 4 5 7 4
      1
      10`,

      `Case #1: 4
      Case #2: 5
      Case #3: 9
      Case #4: 1`
    );
  });

  /** Testing helpers from here ***********************************************/
  function testForInputAndOutput(input, expectedOutput) {
    const actualOutputLines = [];

    const callbackUnderTest = getLineReaderCallback(
      { close: () => {} },
      (result) => actualOutputLines.push(...result.split('\n'))
    );

    const inputLines = input.split('\n').map((x) => x.trim());
    const expectedOutputLines = expectedOutput.split('\n').map((x) => x.trim());

    inputLines.forEach((line) => callbackUnderTest(line));

    actualOutputLines.should.deep.equal(expectedOutputLines);
  }
});
