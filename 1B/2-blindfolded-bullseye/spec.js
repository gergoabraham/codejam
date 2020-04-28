'use strict';

/**
 * Copy local_testing_tool.py in the folder!
 *
 * Run local testing with command:
python interactive_runner.py python3 local_testing_tool.py 0 -- node solution.js
python interactive_runner.py python3 local_testing_tool.py 1 -- node solution.js
python interactive_runner.py python3 local_testing_tool.py 2 -- node solution.js
 */

global.testEnvironment = true;

const {getLineReaderCallback} = require('./solution');

describe('Blindfolded bullseye', function() {
  const noOutput = 'no output';
  let query;
  let callbackUnderTest;
  let closeCallCount = 0;

  beforeEach(function() {
    closeCallCount = 0;
    query = noOutput;
  });

  /** Here come the tests ****************************************************/
  it('init and start', function() {
    callbackUnderTest = initInteractiveProblem('1 999999995 999999995');

    expectThisAndAnswerThat('-5 -5', 'HIT');
    expectThisAndAnswerThat('-5 -4', 'HIT');
    expectThisAndAnswerThat('-5 -3', 'HIT');
    expectThisAndAnswerThat('-5 -2', 'HIT');
    expectThisAndAnswerThat('-5 -1', 'HIT');
    expectThisAndAnswerThat('-5 0', 'HIT');
    expectThisAndAnswerThat('-5 1', 'HIT');
    expectThisAndAnswerThat('-5 2', 'HIT');
    expectThisAndAnswerThat('-5 3', 'HIT');
    expectThisAndAnswerThat('-5 4', 'HIT');
    expectThisAndAnswerThat('-5 5', 'HIT');
    expectThisAndAnswerThat('-4 -5', 'HIT');
  });

  it('stop on wrong answer any time', function() {
    callbackUnderTest = initInteractiveProblem('2 999999995 999999995');

    expectThisAndAnswerThat('-5 -5', 'HIT');
    expectThisAndAnswerThat('-5 -4', 'WRONG');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it('go on on CENTER', function() {
    callbackUnderTest = initInteractiveProblem('2 999999995 999999995');

    expectThisAndAnswerThat('-5 -5', 'HIT');
    expectThisAndAnswerThat('-5 -4', 'HIT');
    expectThisAndAnswerThat('-5 -3', 'HIT');
    expectThisAndAnswerThat('-5 -2', 'HIT');
    expectThisAndAnswerThat('-5 -1', 'HIT');
    expectThisAndAnswerThat('-5 0', 'CENTER');

    expectThisAndAnswerThat('-5 -5', 'HIT');
    expectThisAndAnswerThat('-5 -4', 'HIT');
    expectThisAndAnswerThat('-5 -3', 'CENTER');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it('big one', function() {
    callbackUnderTest = initInteractiveProblem('1 999999950 999999950');

    expectThisAndAnswerThat('0 999999950', 'HIT');
    expectThisAndAnswerThat('0 999999975', 'HIT');
    expectThisAndAnswerThat('0 999999988', 'MISS');
    expectThisAndAnswerThat('0 999999982', 'MISS');
    expectThisAndAnswerThat('0 999999979', 'MISS');
    expectThisAndAnswerThat('0 999999977', 'MISS');
    expectThisAndAnswerThat('0 999999976', 'MISS');
    expectThisAndAnswerThat('0 999999976', 'MISS');
  });


  /** Helper functions ********************************************************/
  function initInteractiveProblem(input) {
    const callbackUnderTest = getLineReaderCallback(
        {close: () => closeCallCount++},
        (queryInput) => query = queryInput.toString());

    callbackUnderTest(input);

    return callbackUnderTest;
  }

  function expectThisAndAnswerThat(expectation, answer) {
    query.should.equal(expectation);
    query = noOutput;

    callbackUnderTest(answer);
  }
});


