'use strict';

global.testEnvironment = true;

const { main } = require('./solution');

describe('Pancake deque', function () {
  it('example test', async function () {
    await testForInputAndOutput(
      `4
      2
      1 5
      4
      1 4 2 3
      5
      10 10 10 10 10
      4
      7 1 3 1000000`,

      `Case #1: 2
      Case #2: 3
      Case #3: 5
      Case #4: 2`
    );
  });

  it('long line', async function () {
    const longLine = new Array(10 ** 5)
      .fill(null)
      .map(() => 1000000)
      .join(' ');

    await testForInputAndOutput(
      `1
      100000
      ${longLine}`,

      `Case #1: 100000`
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
