'use strict';

global.test = true;

const {lineReaderCallback, buildDiagonal} = require('./5-indicium');

describe('Indicium', function() {
  it('example test', function() {
    testForInputAndOutput(
        `2
        3 6
        2 3`,

        `Case #1: POSSIBLE
        3 1 2
        1 2 3
        2 3 1
        Case #2: IMPOSSIBLE`,
    );
  });

  context('simple ones', function() {
    it('2x2', function() {
      testForInputAndOutput(
          `1
           2 2`,

          `Case #1: POSSIBLE
        1 2
        2 1`,
      );
    });
    it('5x5', function() {
      testForInputAndOutput(
          `1
           5 5`,

          `Case #1: POSSIBLE
        1 2 3 4 5
        5 1 2 3 4
        4 5 1 2 3
        3 4 5 1 2
        2 3 4 5 1`,
      );
    });
  });

  context('not that simple ones, but still simple', function() {
    it('2x2', function() {
      testForInputAndOutput(
          `1
        2 4`,

          `Case #1: POSSIBLE
        2 1
        1 2`,
      );
    });
    it('3x3', function() {
      testForInputAndOutput(
          `3
        3 3
        3 6
        3 9`,

          `Case #1: POSSIBLE
        1 2 3
        3 1 2
        2 3 1
        Case #2: POSSIBLE
        3 1 2
        1 2 3
        2 3 1
        Case #3: POSSIBLE
        3 1 2
        2 3 1
        1 2 3`,
      );
    });
    it('4x4', function() {
      testForInputAndOutput(
          `4
        4 4
        4 6
        4 7
        4 8`,

          `Case #1: POSSIBLE
        1 2 3 4
        4 1 2 3
        3 4 1 2
        2 3 4 1
        Case #2: POSSIBLE
        2 1 3 4
        1 2 4 3
        4 3 1 2
        3 4 2 1
        Case #3: POSSIBLE
        3 1 2 4
        1 2 4 3
        4 3 1 2
        2 4 3 1`,
      );
    });
  });


  it('Calculator', function() {
    const input = 'aabc';

    console.log(
        input
            .split('')
            .map((x) => x.charCodeAt(0) - 'a'.charCodeAt(0) + 1)
            .reduce((sum, x) => sum + x));
  });

  context('impossible cases', function() {
    it('2', function() {
      testForInputAndOutput(
          `3
           2 1
           2 3
           2 5`,

          `Case #1: IMPOSSIBLE
           Case #2: IMPOSSIBLE
           Case #3: IMPOSSIBLE`,
      );
    });

    it('3', function() {
      testForInputAndOutput(
          `6
           3 2
           3 4
           3 5
           3 7
           3 8
           3 10`,

          `Case #1: IMPOSSIBLE
           Case #2: IMPOSSIBLE
           Case #3: IMPOSSIBLE
           Case #4: IMPOSSIBLE
           Case #5: IMPOSSIBLE
           Case #6: IMPOSSIBLE`,
      );
    });

    it('4', function() {
      testForInputAndOutput(
          `4
           4 3
           4 5
           4 15
           4 17`,

          `Case #1: IMPOSSIBLE
           Case #2: IMPOSSIBLE
           Case #3: IMPOSSIBLE
           Case #4: IMPOSSIBLE`,
      );
    });
  });

  context('Diagonal building', function() {
    it('4x4 diagonal building 16', function() {
      buildDiagonal(4, 16).join('').should.deep.equal('4444');
    });
    it('4x4 diagonal building 14', function() {
      buildDiagonal(4, 14).join('').should.deep.equal('4433');
    });
    it('4x4 diagonal building 13', function() {
      buildDiagonal(4, 13).join('').should.deep.equal('4432');
    });
    it('4x4 diagonal building 12', function() {
      buildDiagonal(4, 12).join('').should.deep.equal('4431');
    });
    it('4x4 diagonal building 11', function() {
      buildDiagonal(4, 11).join('').should.deep.equal('4421');
    });
    it('4x4 diagonal building 10', function() {
      buildDiagonal(4, 10).join('').should.deep.equal('4411');
    });
    it('4x4 diagonal building 9', function() {
      buildDiagonal(4, 9).join('').should.deep.equal('4311');
    });
    it('4x4 diagonal building 8', function() {
      buildDiagonal(4, 8).join('').should.deep.equal('4211');
    });
    it('4x4 diagonal building 7', function() {
      buildDiagonal(4, 7).join('').should.deep.equal('3211');
    });
    it('4x4 diagonal building 6', function() {
      buildDiagonal(4, 6).join('').should.deep.equal('2211');
    });
    it('4x4 diagonal building 4', function() {
      buildDiagonal(4, 4).join('').should.deep.equal('1111');
    });
    it('3x3 diagonal building', function() {
      buildDiagonal(3, 3).join('').should.deep.equal('111');
      buildDiagonal(3, 6).join('').should.deep.equal('321');
      buildDiagonal(3, 9).join('').should.deep.equal('333');
    });
    it('2x2 diagonal building', function() {
      buildDiagonal(2, 2).join('').should.deep.equal('11');
      buildDiagonal(2, 4).join('').should.deep.equal('22');
    });
    it('5x5 diagonal building', function() {
      buildDiagonal(5, 5).join('').should.deep.equal('11111');
      buildDiagonal(5, 7).join('').should.deep.equal('22111');
      buildDiagonal(5, 8).join('').should.deep.equal('32111');
      buildDiagonal(5, 13).join('').should.deep.equal('55111');
      buildDiagonal(5, 18).join('').should.deep.equal('55521');
      buildDiagonal(5, 23).join('').should.deep.equal('55544');
      buildDiagonal(5, 25).join('').should.deep.equal('55555');
    });
    it('50x50 diagonal building', function() {
      buildDiagonal(50, 2500).should.deep.equal([50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]);
      buildDiagonal(50, 2498).should.deep.equal([50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 49]);
      buildDiagonal(50, 1634).should.deep.equal([50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    });
  });

  function testForInputAndOutput(input, expectedOutput) {
    const actualOutputLines = [];

    const callbackUnderTest = lineReaderCallback(
        {close: () => {}},
        (result) => actualOutputLines.push(...result.split('\n')),
    );

    const inputLines = input.split('\n').map((x) =>x.trim());
    const expectedOutputLines = expectedOutput.split('\n').map((x) =>x.trim());

    inputLines.forEach((line) => callbackUnderTest(line));

    actualOutputLines.should.deep.equal(expectedOutputLines);
  }
});
