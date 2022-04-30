'use strict';

global.testEnvironment = true;

const { main } = require('./solution');

describe('1 Letter Blocks', function () {
  it('example test', async function () {
    await testForInputAndOutput(
      `6
      5
      CODE JAM MIC EEL ZZZZZ
      6
      CODE JAM MIC EEL ZZZZZ EEK
      2
      OY YO
      2
      HASH CODE
      6
      A AA BB A BA BB
      2
      CAT TAX`,

      `Case #1: JAMMICCODEEELZZZZZ
      Case #2: IMPOSSIBLE
      Case #3: IMPOSSIBLE
      Case #4: IMPOSSIBLE
      Case #5: BBBBBAAAAA
      Case #6: IMPOSSIBLE`
    );
  });

  it('example test', async function () {
    await testForInputAndOutput(
      `6
      2
      SAJT A
      2
      SAJT AB
      1
      SAJAT
      2
      SAJT BA
      2
      SAJT BAK
      2
      SAJT TS`,
      `Case #1: IMPOSSIBLE
      Case #2: IMPOSSIBLE
      Case #3: IMPOSSIBLE
      Case #4: IMPOSSIBLE
      Case #5: IMPOSSIBLE
      Case #6: IMPOSSIBLE`
    );
  });

  it('example test', async function () {
    await testForInputAndOutput(
      `1
      2
       GH AAA AB CCC BC FG CD DE EF JJJJ FE`,
      `Case #1: IMPOSSIBLE`
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
