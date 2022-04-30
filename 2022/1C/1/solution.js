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
  await readNumber();
  const wordsStr = await readTexts();

  const middles = {};
  const lefts = {};
  const rights = {};
  const fulls = {};
  const words = new Set();

  for (const wordStr of wordsStr) {
    const simpleWord = [...wordStr].reduce((simpleWord, c) =>
      simpleWord[simpleWord.length - 1] === c ? simpleWord : simpleWord + c
    );

    const word = new Word(wordStr);
    words.add(word);

    for (let i = 0; i < simpleWord.length; i++) {
      const c = simpleWord[i];

      const last = simpleWord.length - 1;

      if (middles[c]) {
        return `IMPOSSIBLE`;
      }

      if (last === 0) {
        // full
        if (fulls[c]) {
          fulls[c].push(word);
        } else {
          fulls[c] = [word];
        }
        word.isFull = true;
      } else if (i === 0) {
        if (lefts[c]) {
          return `IMPOSSIBLE`;
        }
        lefts[c] = word;

        const prevWord = rights[c];
        if (prevWord) {
          if (prevWord.next) {
            return `IMPOSSIBLE`;
          }
          prevWord.next = word;
          word.prev = prevWord;
        }
      } else if (i === last) {
        if (rights[c]) {
          return `IMPOSSIBLE`;
        }
        rights[c] = word;

        if (lefts[c] === rights[c]) {
          return `IMPOSSIBLE`;
        }

        const nextWord = lefts[c];
        if (nextWord) {
          if (nextWord.prev || nextWord === word) {
            return `IMPOSSIBLE`;
          }
          nextWord.prev = word;
          word.next = nextWord;
        }
      } else {
        // middle
        if (middles[c] || lefts[c] || rights[c] || fulls[c]) {
          return `IMPOSSIBLE`;
        }
        middles[c] = true;
      }
    }
  }

  // build ---------------------------------
  let result = '';

  // build by starter words
  const getStarterWord = () => {
    for (const word of words) {
      if (word.next && !word.prev) {
        return word;
      }
    }
    return null;
  };
  const appendFulls = (lastChar) => {
    if (fulls[lastChar]) {
      for (const w of fulls[lastChar]) {
        if (words.has(w)) {
          result += w.word;
          words.delete(w);
        }
      }
    }
  };
  const buildByList = (currentWord) => {
    while (currentWord) {
      result += currentWord.word;
      words.delete(currentWord);

      const lastChar = result[result.length - 1];
      appendFulls(lastChar);

      currentWord = currentWord.next;
    }
  };

  while (getStarterWord()) {
    let currentWord = getStarterWord();
    const firstChar = currentWord.word[0];
    appendFulls(firstChar);

    buildByList(currentWord);
  }

  // remaining not fulls
  const getNotFull = () => {
    for (const word of words) {
      if (!word.isFull && !word.prev) {
        return word;
      }
    }
    return null;
  };
  while (getNotFull()) {
    let currentWord = getNotFull();
    const firstChar = currentWord.word[0];
    appendFulls(firstChar);

    buildByList(currentWord);
  }

  // remaining fulls
  const getFirst = () => {
    for (const word of words) {
      return word;
    }
  };
  while (words.size) {
    const word = getFirst();

    if (word.next || word.prev) {
      return `IMPOSSIBLE`;
    }

    result += word.word;
    words.delete(word);

    const lastChar = result[result.length - 1];
    appendFulls(lastChar);
  }

  return result;
};

class Word {
  constructor(word) {
    this.word = word;
    this.prev = null;
    this.next = null;
    this.isFull = false;
  }
}

/**********************************************************************/

if (global.testEnvironment) {
  module.exports = { main };
} else {
  startMain();
}
