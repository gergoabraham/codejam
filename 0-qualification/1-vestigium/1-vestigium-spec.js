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

        `Case #1: {"N":4,"data":[[1,2,3,4],[2,1,4,3],[3,4,1,2],[4,3,2,1]]}
         Case #2: {"N":4,"data":[[2,2,2,2],[2,3,2,3],[2,2,2,3],[2,2,2,2]]}
         Case #3: {"N":3,"data":[[2,1,3],[1,3,2],[1,2,3]]}`);
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
