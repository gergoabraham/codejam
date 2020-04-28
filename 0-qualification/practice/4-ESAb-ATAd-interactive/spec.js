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

describe('Interactive problem', function() {
  const noOutput = 'no output';
  let query;
  let callbackUnderTest;
  let closeCallCount = 0;

  beforeEach(function() {
    closeCallCount = 0;
    query = noOutput;
  });

  /** Here come the tests ****************************************************/
  it('stop on wrong answer any time', function() {
    callbackUnderTest = initInteractiveProblem('2 10');

    expectThisAndAnswerThat('1', '1');
    expectThisAndAnswerThat('10', 'N');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it('B=10', function() {
    callbackUnderTest = initInteractiveProblem('1 10');

    expectThisAndAnswerThat('1', '0');
    expectThisAndAnswerThat('10', '1');
    expectThisAndAnswerThat('2', '1');
    expectThisAndAnswerThat('9', '0');
    expectThisAndAnswerThat('3', '0');
    expectThisAndAnswerThat('8', '0');
    expectThisAndAnswerThat('4', '0');
    expectThisAndAnswerThat('7', '0');
    expectThisAndAnswerThat('5', '0');
    expectThisAndAnswerThat('6', '0');
    expectThisAndAnswerThat('0100000001', 'Y');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  context('B=20', function() {
    context('only same', function() {
      it('no operation', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000000000 0000000001
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '1');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '0');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '0');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        expectThisAndAnswerThat('1', '1'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('1', '1'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');

        expectThisAndAnswerThat('10000000000000000001', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      it('complement', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000011111 1111100001
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '1');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '0');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '0');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        // 0111100000 0000011110
        expectThisAndAnswerThat('1', '0'); // checker
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('1', '0'); // checker
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');

        expectThisAndAnswerThat('01111000000000011110', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });
    });

    context('only diff', function() {
      it('no operation', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000000000 1111111110
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '0');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '1');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '1');

        expectThisAndAnswerThat('1', '1'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '1');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '1');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '1');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '1');

        expectThisAndAnswerThat('1', '1'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '1');

        expectThisAndAnswerThat('10000000001111111110', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      it('reversal', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000000000 1111111110
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '0');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '1');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '1');

        // 0111111111 0000000001
        expectThisAndAnswerThat('1', '0'); // checker
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('6', '1');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '1');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '1');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '1');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('1', '0'); // checker
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('10', '1');
        expectThisAndAnswerThat('11', '0');

        expectThisAndAnswerThat('01111111110000000001', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });
    });

    context('both same & diff', function() {
      it('no operation, same@1, diff@3', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000000000 0000000001
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '1');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '0');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        expectThisAndAnswerThat('1', '1'); // checker
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('1', '1'); // checker
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');

        expectThisAndAnswerThat('10000000000000000101', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      it('no operation, same@4, diff@1', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000000000 0000000110
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '0');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        expectThisAndAnswerThat('4', '0'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('4', '0'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');

        expectThisAndAnswerThat('10000000000000000110', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      it('complement', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000000000 0000000110
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '0');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        expectThisAndAnswerThat('4', '0'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        // 0111111111 1111111001
        expectThisAndAnswerThat('4', '1'); // checker
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('10', '1');
        expectThisAndAnswerThat('11', '1');

        expectThisAndAnswerThat('01111111111111111001', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      it('reversal', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000000000 0000000110
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '0');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        expectThisAndAnswerThat('4', '0'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        // 0110000000 0000000001
        expectThisAndAnswerThat('4', '0'); // checker
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');

        expectThisAndAnswerThat('01100000000000000001', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      it('reversal + complement', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 1000000000 0000000110
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('20', '0');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        expectThisAndAnswerThat('4', '0'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        // 1001111111 1111111110
        expectThisAndAnswerThat('4', '1'); // checker
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('10', '1');
        expectThisAndAnswerThat('11', '1');

        expectThisAndAnswerThat('10011111111111111110', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });
    });

    it('multiple cases', function() {
      callbackUnderTest = initInteractiveProblem('2 20');

      // 1000000000 0000000110
      expectThisAndAnswerThat('1', '1');
      expectThisAndAnswerThat('20', '0');
      expectThisAndAnswerThat('2', '0');
      expectThisAndAnswerThat('19', '1');
      expectThisAndAnswerThat('3', '0');
      expectThisAndAnswerThat('18', '1');
      expectThisAndAnswerThat('4', '0');
      expectThisAndAnswerThat('17', '0');
      expectThisAndAnswerThat('5', '0');
      expectThisAndAnswerThat('16', '0');

      expectThisAndAnswerThat('4', '0'); // checker
      expectThisAndAnswerThat('1', '1');
      expectThisAndAnswerThat('6', '0');
      expectThisAndAnswerThat('15', '0');
      expectThisAndAnswerThat('7', '0');
      expectThisAndAnswerThat('14', '0');
      expectThisAndAnswerThat('8', '0');
      expectThisAndAnswerThat('13', '0');
      expectThisAndAnswerThat('9', '0');
      expectThisAndAnswerThat('12', '0');

      // 1001111111 1111111110
      expectThisAndAnswerThat('4', '1'); // checker
      expectThisAndAnswerThat('1', '1');
      expectThisAndAnswerThat('10', '1');
      expectThisAndAnswerThat('11', '1');

      expectThisAndAnswerThat('10011111111111111110', 'Y');

      // 1000000000 0000000110
      expectThisAndAnswerThat('1', '1');
      expectThisAndAnswerThat('20', '0');
      expectThisAndAnswerThat('2', '0');
      expectThisAndAnswerThat('19', '1');
      expectThisAndAnswerThat('3', '0');
      expectThisAndAnswerThat('18', '1');
      expectThisAndAnswerThat('4', '0');
      expectThisAndAnswerThat('17', '0');
      expectThisAndAnswerThat('5', '0');
      expectThisAndAnswerThat('16', '0');

      expectThisAndAnswerThat('4', '0'); // checker
      expectThisAndAnswerThat('1', '1');
      expectThisAndAnswerThat('6', '0');
      expectThisAndAnswerThat('15', '0');
      expectThisAndAnswerThat('7', '0');
      expectThisAndAnswerThat('14', '0');
      expectThisAndAnswerThat('8', '0');
      expectThisAndAnswerThat('13', '0');
      expectThisAndAnswerThat('9', '0');
      expectThisAndAnswerThat('12', '0');

      // 0110000000 0000000001
      expectThisAndAnswerThat('4', '0'); // checker
      expectThisAndAnswerThat('1', '0');
      expectThisAndAnswerThat('10', '0');
      expectThisAndAnswerThat('11', '0');

      expectThisAndAnswerThat('01100000000000000001', 'Y');

      query.should.equal(noOutput);
      closeCallCount.should.equal(1);
    });
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


