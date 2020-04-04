'use strict';

global.test = true;

const {lineReaderCallback} = require('./1-vestigium');

describe('Vestigium', function() {
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
        Case #3: 8 0 2`);
  });

  it('natural Latin square matrix 1 - trace calculation', function() {
    testForInputAndOutput(
        `1
         4
         1 2 3 4
         2 1 4 3
         3 4 1 2
         4 3 2 1`,

        `Case #1: 4 0 0`);
  });

  it('natural Latin square matrix 2 - trace calculation', function() {
    testForInputAndOutput(
        `1
         5
         1 2 3 4 5
         3 4 5 1 2
         4 5 1 2 3
         5 1 2 3 4
         2 3 4 5 1`,

        `Case #1: 10 0 0`);
  });

  it('another one', function() {
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
         2 2 3`,

        `Case #1: 4 0 0
        Case #2: 9 4 4
        Case #3: 8 1 2`);
  });


  function testForInputAndOutput(input, expectedOutput) {
    const actualOutputLines = [];

    const callbackUnderTest = lineReaderCallback(
        {close: () => {}},
        (result) => actualOutputLines.push(result),
    );

    const inputLines = input.split('\n').map((x) =>x.trim());
    const expectedOutputLines = expectedOutput.split('\n').map((x) =>x.trim());

    inputLines.forEach((line) => callbackUnderTest(line));

    actualOutputLines.should.deep.equal(expectedOutputLines);
  }
});
