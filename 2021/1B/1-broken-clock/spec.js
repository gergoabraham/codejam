'use strict';

global.testEnvironment = true;

const { getLineReaderCallback } = require('./solution');

describe('Broken clock', function () {
  it('test set 1', function () {
    testForInputAndOutput(
      `3
        0 0 0
        0 21600000000000 23400000000000
        1476000000000 2160000000000 3723000000000`,

      `Case #1: 0 0 0 0
        Case #2: 6 30 0 0
        Case #3: 1 2 3 0`
    );
  });

  it('test set 2', function () {
    testForInputAndOutput(
      `3
        5400000000000 5400000000000 5400000000000
        10800000000000 32400000000000 34200000000000
        23076000000000 23760000000000 25323000000000`,

      `Case #1: 0 0 0 0
        Case #2: 6 30 0 0
        Case #3: 1 2 3 0`
    );
  });

  it('test set 3', function () {
    testForInputAndOutput(
      `1
        0 11 719`,

      `Case #1: 0 0 0 1`
    );
  });

  const FULL_ROUND = 4.32e13;

  it('test set 3 - nok', function () {
    const T = (11 * 3600 + 42 * 60 + 36) * 10 **9 + 7351265;
    
    const R = 43200002;
    const A = (T + R) % FULL_ROUND;
    const B = (12 * T + R) % FULL_ROUND;
    const C = Number((BigInt(720) * BigInt(T) + BigInt(R)) % BigInt(FULL_ROUND));

    testForInputAndOutput(
      `1
        ${A} ${B} ${C}`,

      `Case #1: 11 42 36 7351265`
    );
  });


  context('rotate, module', function () {
    it('modulo 2', function () {
      const input = `1
        ${FULL_ROUND - 1} 10 718`;

      testForInputAndOutput(
        input,

        `Case #1: 0 0 0 1`
      );
    });

    it('modulo 1', function () {
      const A = FULL_ROUND + 1 - 800;
      const B = FULL_ROUND + 12 - 800;
      const C = FULL_ROUND + 720 - 800;

      const input = `1
        ${A} ${B} ${C}`;

      testForInputAndOutput(
        input,

        `Case #1: 0 0 0 1`
      );
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
