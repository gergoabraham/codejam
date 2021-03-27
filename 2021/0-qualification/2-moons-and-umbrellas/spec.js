'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('2 - Moons and Umbrellas', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        2 3 CJ?CC?
        4 2 CJCJ
        1 3 C?J
        2 5 ??J???`,

        `Case #1: 5
        Case #2: 10
        Case #3: 1
        Case #4: 0`,
    );
  });

  it.skip('example test for Test Set 3', function() {
    testForInputAndOutput(
        `1
        -5 2 ??JJ??`,
        `Case #1: -8`,
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
