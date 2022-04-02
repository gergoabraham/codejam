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

const { getLineReaderCallback } = require('./solution');

describe('Interactive problem', function () {
  const noOutput = 'no output';
  let query;
  let callbackUnderTest;
  let closeCallCount = 0;

  beforeEach(function () {
    closeCallCount = 0;
    query = noOutput;
  });

  /** Here come the tests ****************************************************/
  it('init and start', function () {
    callbackUnderTest = initInteractiveProblem('2'); // T = 2
    callbackUnderTest('5 8000'); // N and K
    callbackUnderTest('4 1'); // start R=4 P=1

    expectThisAndAnswerThat('T 1', '1 3');
    expectThisAndAnswerThat('T 2', '2 2');
    expectThisAndAnswerThat('T 3', '3 2');
    expectThisAndAnswerThat('T 5', '5 2');
    expectThisAndAnswerThat('E 5', '5 3');

    callbackUnderTest('2 2'); // start R=4 P=1
    expectThisAndAnswerThat('T 1', '1 3');
    expectThisAndAnswerThat('T 3', '3 2');
    expectThisAndAnswerThat('T 4', '4 1');
    expectThisAndAnswerThat('E 5');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it('stop on wrong answer any time', function () {
    callbackUnderTest = initInteractiveProblem('2');

    expectThisAndAnswerThat('1', '3');
    expectThisAndAnswerThat('2', '-1');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  /** Helper functions ********************************************************/
  function initInteractiveProblem(input) {
    const callbackUnderTest = getLineReaderCallback(
      { close: () => closeCallCount++ },
      (queryInput) => (query = queryInput.toString())
    );

    callbackUnderTest(input);

    return callbackUnderTest;
  }

  function expectThisAndAnswerThat(expectation, answer) {
    query.should.equal(expectation);
    query = noOutput;

    answer && callbackUnderTest(answer);
  }
});
