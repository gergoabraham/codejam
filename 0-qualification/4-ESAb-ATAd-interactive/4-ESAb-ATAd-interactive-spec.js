'use strict';

/**
 * Run local testing with command:
 *    python interactive_runner.py python3 local_testing_tool.py 0 -- node 4-ESAb-ATAd-interactive.js
 */

global.test = true;

const {lineReaderCallback} = require('./4-ESAb-ATAd-interactive');

describe.only('ESAb ATAd', function() {
  const noOutput = 'no output';
  let query = noOutput;
  let callbackUnderTest;
  let closeCallCount = 0;

  beforeEach(function() {
    closeCallCount = 0;
    query = noOutput;
  });


  it('init and start', function() {
    callbackUnderTest = initInteractiveProblem('1 10');

    expectThisAndAnswerThat('1', '0');
    expectThisAndAnswerThat('10', '0');
  });

  it('iterate through queries', function() {
    callbackUnderTest = initInteractiveProblem('1 10');

    expectThisAndAnswerThat('1', '0');
    expectThisAndAnswerThat('10', '0');
    expectThisAndAnswerThat('2', '0');
    expectThisAndAnswerThat('9', '1');
    expectThisAndAnswerThat('3', '1');
    expectThisAndAnswerThat('8', '0');
    expectThisAndAnswerThat('4', '1');
    expectThisAndAnswerThat('7', '0');
    expectThisAndAnswerThat('5', '1');
    expectThisAndAnswerThat('6', '0');
  });

  it('having a result for B=10', function() {
    callbackUnderTest = initInteractiveProblem('1 10');

    expectThisAndAnswerThat('1', '0');
    expectThisAndAnswerThat('10', '0');
    expectThisAndAnswerThat('2', '0');
    expectThisAndAnswerThat('9', '1');
    expectThisAndAnswerThat('3', '1');
    expectThisAndAnswerThat('8', '0');
    expectThisAndAnswerThat('4', '1');
    expectThisAndAnswerThat('7', '0');
    expectThisAndAnswerThat('5', '1');
    expectThisAndAnswerThat('6', '0');
    expectThisAndAnswerThat('0011100010', 'Y');

    closeCallCount.should.equal(1);
  });

  it('having a result for B=10, two testcases', function() {
    callbackUnderTest = initInteractiveProblem('2 10');

    expectThisAndAnswerThat('1', '0');
    expectThisAndAnswerThat('10', '0');
    expectThisAndAnswerThat('2', '0');
    expectThisAndAnswerThat('9', '1');
    expectThisAndAnswerThat('3', '1');
    expectThisAndAnswerThat('8', '0');
    expectThisAndAnswerThat('4', '1');
    expectThisAndAnswerThat('7', '0');
    expectThisAndAnswerThat('5', '1');
    expectThisAndAnswerThat('6', '0');
    expectThisAndAnswerThat('0011100010', 'Y');

    expectThisAndAnswerThat('1', '1');
    expectThisAndAnswerThat('10', '0');
    expectThisAndAnswerThat('2', '1');
    expectThisAndAnswerThat('9', '1');
    expectThisAndAnswerThat('3', '1');
    expectThisAndAnswerThat('8', '0');
    expectThisAndAnswerThat('4', '1');
    expectThisAndAnswerThat('7', '0');
    expectThisAndAnswerThat('5', '1');
    expectThisAndAnswerThat('6', '0');
    closeCallCount.should.equal(0);
    expectThisAndAnswerThat('1111100010', 'Y');

    closeCallCount.should.equal(1);
    query.should.equal(noOutput);
  });

  it('stop on wrong answer', function() {
    callbackUnderTest = initInteractiveProblem('2 10');

    expectThisAndAnswerThat('1', '0');
    expectThisAndAnswerThat('10', '0');
    expectThisAndAnswerThat('2', '0');
    expectThisAndAnswerThat('9', '1');
    expectThisAndAnswerThat('3', '1');
    expectThisAndAnswerThat('8', '0');
    expectThisAndAnswerThat('4', '1');
    expectThisAndAnswerThat('7', '0');
    expectThisAndAnswerThat('5', '1');
    expectThisAndAnswerThat('6', '0');
    expectThisAndAnswerThat('0011100010', 'N');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it('stop on "N" any time', function() {
    callbackUnderTest = initInteractiveProblem('2 10');

    expectThisAndAnswerThat('1', '0');
    expectThisAndAnswerThat('10', '0');
    expectThisAndAnswerThat('2', '0');
    expectThisAndAnswerThat('9', '1');
    expectThisAndAnswerThat('3', '1');
    expectThisAndAnswerThat('8', 'N');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  function initInteractiveProblem(input) {
    const callbackUnderTest = lineReaderCallback(
        {close: () => closeCallCount++},
        (result) => query = result.toString());

    callbackUnderTest(input);

    return callbackUnderTest;
  }

  function expectThisAndAnswerThat(expectation, answer) {
    query.should.equal(expectation);
    query = noOutput;

    callbackUnderTest(answer);
  }
});


