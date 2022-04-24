'use strict';

const startMain = async () => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  main(rl, console.log);
};

const main = async (rl, outputCallback) => {
  const lineBuffer = [];
  const bufferListener = { current: null };
  const notifyMe = (callback) => {
    bufferListener.current = callback;
  };

  rl.on('line', (line) => {
    lineBuffer.push(line);

    if (bufferListener.current) {
      const notify = bufferListener.current;
      bufferListener.current = null;
      notify();
    }
  });

  const readText = async () =>
    new Promise((resolve) => {
      if (lineBuffer.length) {
        resolve(lineBuffer.shift());
      } else {
        notifyMe(() => resolve(lineBuffer.shift()));
      }
    });

  const readTexts = async () => (await readText()).split(' ');
  const readNumber = async () => Number(await readText());
  const readNumbers = async () => (await readTexts()).map((x) => Number(x));

  const T = await readNumber();

  for (let Ti = 1; Ti <= T; Ti++) {
    await solveTestCase(
      readText,
      readTexts,
      readNumber,
      readNumbers,
      outputCallback
    );
  }

  rl.close();
  process.exit();
};

/** ********************************************************************
 *
 * @param {() => Promise<string>} readText
 * @param {() => Promise<string[]>} readTexts
 * @param {() => Promise<number>} readNumber
 * @param {() => Promise<number[]>} readNumbers
 * @param {(line) => void} outCallback
 * @returns
 */
// eslint-disable-next-line no-unused-vars
const solveTestCase = async (
  readText,
  readTexts,
  readNumber,
  readNumbers,
  outCallback
) => {
  const inputs = [
    '10000000',
    '11000000',
    '11100000',
    '11110000',
    '11111000',
    '11111100',
    '11111110',
    '11111111',
  ];

  let response = 4;
  do {
    const input = inputs[response - 1];
    outCallback(input);

    response = await readNumber();
  } while (response !== -1 && response !== 0);
};

/**********************************************************************/

if (global.testEnvironment) {
  module.exports = { main };
} else {
  startMain();
}
