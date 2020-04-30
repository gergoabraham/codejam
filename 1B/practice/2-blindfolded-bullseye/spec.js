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

describe.only('Blindfolded Bullseye', function() {
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
    callbackUnderTest = initInteractiveProblem('2 3');

    expectThisAndAnswerThat('1', '0');
    expectThisAndAnswerThat('2', '1');
    expectThisAndAnswerThat('3', '2');
    expectThisAndAnswerThat('012', 'Y');

    expectThisAndAnswerThat('1', 's');
    expectThisAndAnswerThat('2', 'a');
    expectThisAndAnswerThat('3', 'jt');
    expectThisAndAnswerThat('sajt', 'Y');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it('stop on wrong answer any time', function() {
    callbackUnderTest = initInteractiveProblem('2 10');

    expectThisAndAnswerThat('1', '3');
    expectThisAndAnswerThat('2', 'N');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
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


