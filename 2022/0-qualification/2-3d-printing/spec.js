'use strict';

global.testEnvironment = true;

const { getLineReaderCallback } = require('./solution');

describe('3D printing', function () {
  it('example test', function () {
    testForInputAndOutput(
      `3
        300000 200000 300000 500000
        300000 200000 500000 300000
        300000 500000 300000 200000
        1000000 1000000 0 0
        0 1000000 1000000 1000000
        999999 999999 999999 999999
        768763 148041 178147 984173
        699508 515362 534729 714381
        949704 625054 946212 951187`,

      `Case #1: 300000 200000 300000 200000
        Case #2: IMPOSSIBLE
        Case #3: 0 107472 178147 714381`
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
