'use strict';

global.testEnvironment = true;

const { getLineReaderCallback, reversort } = require('./solution');

describe('1 - Reversort', function () {
  it('example test', function () {
    testForInputAndOutput(
      `3
        4
        4 2 1 3
        2
        1 2
        7
        7 6 5 4 3 2 1`,

      `Case #1: 6
        Case #2: 1
        Case #3: 12`
    );
  });

  describe('reversort algorithm', function () {
    it('1', function () {
      reversort([5, 2, 1, 7])[0].should.deep.equal([1, 2, 5, 7]);
    });

    it('2', function () {
      reversort([5, 2, 1, 7, 3, -55, 10])[0].should.deep.equal([-55, 1, 2, 3, 5, 7, 10]);
    });
  });

  describe('calculating cost', function () {
    it('1', function () {
      reversort([5, 2, 1, 7])[1].should.equal(5);
    });

    it('2', function () {
      reversort([5, 2, 1, 7, 3, -55, 10])[1].should.equal(16);
    });
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
