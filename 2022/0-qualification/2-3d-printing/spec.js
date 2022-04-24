'use strict';

global.testEnvironment = true;

const { main } = require('./solution');

describe('3D printing', function () {
  it('example test', async function () {
    await testForInputAndOutput(
      `3
        300000 200000 300000 500000
        300000 200000 500000 300000
        300000 500000 300000 200000
        1000000 1000000 0 0
        0 1000000 1000000 1000000
        999999 999999 999999 999999
        768763 148041 178147 984173
        699508 515362 534729 714381
        949704 625054 946212 951187`,

      `Case #1: 300000 200000 300000 200000
        Case #2: IMPOSSIBLE
        Case #3: 0 107472 178147 714381`
    );
  });

  /** Testing helpers from here ***********************************************/
  async function testForInputAndOutput(input = '', expectedOutput) {
    const actualOutputLines = [];
    const fakeOutputCallback = (result) =>
      actualOutputLines.push(...result.split('\n'));

    const inputLines = input.split('\n').map((x) => x.trim());

    await new Promise((resolve) => {
      let inputListener;

      const fakeRl = {
        close: resolve,
        on: (_, callback) => {
          inputListener = callback;
        },
      };

      main(fakeRl, fakeOutputCallback);

      inputLines.forEach((line) => inputListener(line));
    });

    const expectedOutputLines = expectedOutput.split('\n').map((x) => x.trim());
    actualOutputLines.should.deep.equal(expectedOutputLines);
  }
});
