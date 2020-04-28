'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe.only('Vestigium', function() {
  it('example test', function() {
    testForInputAndOutput(
        `3
        4
        1 2 3 4
        2 1 4 3
        3 4 1 2
        4 3 2 1
        4
        2 2 2 2
        2 3 2 3
        2 2 2 3
        2 2 2 2
        3
        2 1 3
        1 3 2
        1 2 3`,

        `Case #1: 4 0 0
        Case #2: 9 4 4
        Case #3: 8 0 2`,
    );
  });

  it('calc trace', function() {
    testForInputAndOutput(
        `3
        4
        1 2 3 4
        2 1 4 3
        3 4 1 2
        4 3 2 1
        4
        2 2 2 2
        2 3 2 3
        2 2 2 3
        2 2 2 2
        3
        2 1 3
        1 3 2
        1 2 3`,

        `Case #1: 4
        Case #2: 9
        Case #3: 8`,
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
