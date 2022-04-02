'use strict';

global.testEnvironment = true;

const { getLineReaderCallback } = require('./solution');

describe('Chain reactions', function () {
  it('example test', function () {
    testForInputAndOutput(
      `3
      4
      60 20 40 50
      0 1 1 2
      5
      3 2 1 4 5
      0 1 1 1 0
      8
      100 100 100 90 80 100 90 100
      0 1 2 1 2 3 1 3`,

      `Case #1: 110
      Case #2: 14
      Case #3: 490`
    );
  });

  it('my test', function () {
    testForInputAndOutput(
      `1
      7
      6 2 4 5 1 5 3
      0 1 1 2 3 3 3`,

      `Case #1: 19`
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
