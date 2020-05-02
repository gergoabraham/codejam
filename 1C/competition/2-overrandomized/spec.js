'use strict';

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');
const {sampleIn} = require('./sample.in');

describe.only('Overrandomized', function() {
  it('example test', function() {
    testForInputAndOutput(
        sampleIn,
        `Case #1: TPFOXLUSHB`,
    );
  });


  it('proof of concept', function() {
    const data = sampleIn.split('\n').splice(2).map((x) => {
      const line = x.split(' ');
      return {
        num: line[0],
        str: line[1],
      };
    });

    // data.sort((a, b) => (a.str.length - b.str.length));

    const frequencyTable = {};

    // fill freq table for 1...9
    data.forEach((number) => {
      const firstChar = number.str.charAt(0);

      if (frequencyTable[firstChar]) {
        frequencyTable[firstChar]++;
      } else {
        frequencyTable[firstChar] = 1;
      }
    });

    // get digit string for 1...9
    const digitString = Array(10);
    for (let i = 1; i < 10; i++) {
      let maxVal = 0;
      let maxChar = '';
      for (const character in frequencyTable) {
        if (frequencyTable.hasOwnProperty(character)) {
          const num = frequencyTable[character];
          if (num > maxVal) {
            maxVal = num;
            maxChar = character;
          }
        }
      }
      digitString[i] = maxChar;
      frequencyTable[maxChar] = undefined;
    }

    // find the zero!
    for (let i = 0; i < data.length; i++) {
      const number = data[i];
      if (number.str.length > 1) {
        const lastDigit = number.str.charAt(number.str.length - 1);

        if (!frequencyTable.hasOwnProperty(lastDigit)) {
          // found the zero!
          digitString[0] = lastDigit;
          break;
        }
      }
    }

    console.log(digitString);
  });


  /** Testing helpers from here ***********************************************/
  function testForInputAndOutput(input, expectedOutput) {
    const actualOutputLines = [];

    const callbackUnderTest = getLineReaderCallback(
        {close: () => {}},
        (result) => actualOutputLines.push(...result.split('\n')),
    );

    const inputLines = input.split('\n').map((x) =>x.trim());
    const expectedOutputLines = expectedOutput.split('\n').map((x) =>x.trim());

    inputLines.forEach((line) => callbackUnderTest(line));

    actualOutputLines.should.deep.equal(expectedOutputLines);
  }
});


