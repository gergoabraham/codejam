'use strict';

global.testEnvironment = true;

const { getLineReaderCallback } = require('./solution');

describe('1 Punched cards', function () {
  it('example test', function () {
    testForInputAndOutput(
      `3
      3 4
      2 2
      2 3`,

      `Case #1:
      ..+-+-+-+
      ..|.|.|.|
      +-+-+-+-+
      |.|.|.|.|
      +-+-+-+-+
      |.|.|.|.|
      +-+-+-+-+
      Case #2:
      ..+-+
      ..|.|
      +-+-+
      |.|.|
      +-+-+
      Case #3:
      ..+-+-+
      ..|.|.|
      +-+-+-+
      |.|.|.|
      +-+-+-+`
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
