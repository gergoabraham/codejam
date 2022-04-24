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
    const result = await solveTestCase(
      readText,
      readTexts,
      readNumber,
      readNumbers
    );
    outputCallback(`Case #${Ti}: ${result}`);
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
 * @returns
 */
// eslint-disable-next-line no-unused-vars
const solveTestCase = async (readText, readTexts, readNumber, readNumbers) => {
  const N = await readNumber();

  const pancakes = await readNumbers();

  let a = 0;
  let b = N - 1;
  let prevMax = 0;
  let count = 0;

  while (b >= a) {
    let next;
    if (pancakes[a] < pancakes[b]) {
      next = pancakes[a];
      a++;
    } else {
      next = pancakes[b];
      b--;
    }

    if (next >= prevMax) {
      count++;
      prevMax = next;
    }
  }

  return count;
};

/**********************************************************************/

if (global.testEnvironment) {
  module.exports = { main };
} else {
  startMain();
}
