'use strict';

global.testEnvironment = true;

const { main } = require('./solution');

describe('Multiple lines input', function () {
  it('example test', async function () {
    await testForInputAndOutput(
      `2
        3
        first
        second
        third
        2
        only
        two`,

      `Case #1: POSSIBLE
        first second third
        Case #2: POSSIBLE
        only two`
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
