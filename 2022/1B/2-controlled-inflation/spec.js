'use strict';

global.testEnvironment = true;

const { main } = require('./solution');

describe('Controlled inflation', function () {
  it('example test', async function () {
    await testForInputAndOutput(
      `2
      3 3
      30 10 40
      20 50 60
      60 60 50
      5 2
      1 1000000000
      500000000 1000000000  
      1 1000000000
      500000000 1
      1 1000000000`,

      `Case #1: 110
      Case #2: 4999999996`
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
