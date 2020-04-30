'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe.only('Expogo', function() {
  it('example test', function() {
    testForInputAndOutput(
        `4
        2 3
        -2 -3
        3 0
        -1 1`,

        `Case #1: SEN
        Case #2: NWS
        Case #3: EE
        Case #4: IMPOSSIBLE`,
    );
  });

  it('0, 1 and variations', function() {
    testForInputAndOutput(
        `4
        1 0
        -1 0
        0 1
        0 -1`,

        `Case #1: E
        Case #2: W
        Case #3: N
        Case #4: S`,
    );
  });

  it('go East', function() {
    testForInputAndOutput(
        `3
        3 0
        7 0
        15 0`,

        `Case #1: EE
        Case #2: EEE
        Case #3: EEEE`,
    );
  });

  it('go West', function() {
    testForInputAndOutput(
        `3
        -3 0
        -7 0
        -15 0`,

        `Case #1: WW
        Case #2: WWW
        Case #3: WWWW`,
    );
  });


  it('go North', function() {
    testForInputAndOutput(
        `3
        0 3
        0 7
        0 15`,

        `Case #1: NN
        Case #2: NNN
        Case #3: NNNN`,
    );
  });

  it('go South', function() {
    testForInputAndOutput(
        `3
        0 -3
        0 -7
        0 -15`,

        `Case #1: SS
        Case #2: SSS
        Case #3: SSSS`,
    );
  });

  it('some simple paths', function() {
    testForInputAndOutput(
        `3
        4 -3
        9 6
        -7 -56`,

        `Case #1: SSE
        Case #2: ENNE
        Case #3: WWWSSS`,
    );
  });

  it('adding backtrack', function() {
    testForInputAndOutput(
        `3
        -1 4
        22 -3
        -3 106`,

        `Case #1: EWN
        Case #2: NWSEE
        Case #3: ENWSNNN`,
    );
  });

  it('impossible cases', function() {
    testForInputAndOutput(
        `3
        -1 5
        22 -3
        -3 106`,

        `Case #1: IMPOSSIBLE
        Case #2: NWSEE
        Case #3: ENWSNNN`,
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
