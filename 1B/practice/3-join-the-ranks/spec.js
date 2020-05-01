'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe.only('Join the ranks', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        2 2
        3 2
        2 3
        3 4`,

        `Case #1: 1
        2 1
        Case #2: 2
        3 2
        2 1
        Case #3: 2
        4 1
        3 1
        Case #4: 6
        9 2
        8 2
        7 2
        6 1
        5 1
        4 1`,
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
