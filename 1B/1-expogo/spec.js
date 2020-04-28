'use strict';

global.testEnvironment = true;

const {getLineReaderCallback, generate} = require('./solution');

describe('Expogo', function() {
  it('jak', function() {
    testForInputAndOutput(
        `5
        2 3
        -2 -3
        3 0
        -1 1
        -21 48`,

        `Case #1: SEN
        Case #2: NWS
        Case #3: EE
        Case #4: IMPOSSIBLE
        Case #5: EWEESWN`,
    );
  });

  it('generate lookuptable', function() {
    const table = generate(9);
    table['-1 2'].should.equal('WN');
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


