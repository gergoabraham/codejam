'use strict';

global.testEnvironment = true;

const { main } = require('./solution');

describe('One line input', function () {
  it('example test', async function () {
    await testForInputAndOutput(
      `2
        1 2 3
        4 5 6`,

      `Case #1: 6
        Case #2: 15`
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
