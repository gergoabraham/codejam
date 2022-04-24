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
  const [N, P] = await readNumbers();

  let prevDist = [0, 0];
  let prevMinsMaxes = [0, 0];
  let distances;
  for (let Ni = 0; Ni < N; Ni++) {
    const products = await readNumbers();

    const min = products.reduce((min, current) => Math.min(min, current));
    const max = products.reduce((max, current) => Math.max(max, current));
    const minsMaxes = [min, max];

    distances = [
      Math.min(
        prevDist[1] + Math.abs(max - prevMinsMaxes[1]) + max - min,
        prevDist[0] + Math.abs(max - prevMinsMaxes[0]) + max - min
      ),
      Math.min(
        prevDist[1] + Math.abs(min - prevMinsMaxes[1]) + max - min,
        prevDist[0] + Math.abs(min - prevMinsMaxes[0]) + max - min
      ),
    ];

    prevDist = distances;
    prevMinsMaxes = minsMaxes;
  }

  return Math.min(...distances);
};

/**********************************************************************/

if (global.testEnvironment) {
  module.exports = { main };
} else {
  startMain();
}
