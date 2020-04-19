'use strict';

/**
 * Run local testing with command:
 *    python interactive_runner.py python3 local_testing_tool.py 0 -- node 4-ESAb-ATAd-interactive.js
 */

global.test = true;

const {lineReaderCallback} = require('./4-ESAb-ATAd-interactive');

describe('ESAb ATAd', function() {
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

  context('B=10', function() {
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
  });

  context('B=100', function() {
    it('first 10 queries', function() {
      callbackUnderTest = initInteractiveProblem('1 100');

      expectThisAndAnswerThat('1', '0');
      expectThisAndAnswerThat('100', '0');
      expectThisAndAnswerThat('2', '0');
      expectThisAndAnswerThat('99', '1');
      expectThisAndAnswerThat('3', '1');
      expectThisAndAnswerThat('98', '0');
      expectThisAndAnswerThat('4', '1');
      expectThisAndAnswerThat('97', '0');
      expectThisAndAnswerThat('5', '1');
      expectThisAndAnswerThat('96', '0');
    });
  });

  context('B=20', function() {
    // same and diff
    context('Both same and diff pairs', function() {
      // no operation
      it('no operation on 10, but check for pairs 1, 3', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 00111010000001100000

        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('20', '0');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '0');
        expectThisAndAnswerThat('3', '1');
        expectThisAndAnswerThat('18', '0');
        expectThisAndAnswerThat('4', '1');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '1');
        expectThisAndAnswerThat('16', '0');

        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('3', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '1');
        expectThisAndAnswerThat('7', '1');
        expectThisAndAnswerThat('14', '1');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('3', '1');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');
        expectThisAndAnswerThat('00111010000001100000', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      it('no operation on 10, but check for pairs 4, 1', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 0000000000 0000000111
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('20', '1');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        // 0000000000 0000000111
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');
        expectThisAndAnswerThat('00000000000000000111', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      // complement
      it('first op is complement', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 00111010000001101011
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('20', '1');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '1');
        expectThisAndAnswerThat('18', '0');
        expectThisAndAnswerThat('4', '1');
        expectThisAndAnswerThat('17', '1');
        expectThisAndAnswerThat('5', '1');
        expectThisAndAnswerThat('16', '0');

        // 00111010000001101011
        expectThisAndAnswerThat('4', '1');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '1');
        expectThisAndAnswerThat('7', '1');
        expectThisAndAnswerThat('14', '1');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('4', '1');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');
        expectThisAndAnswerThat('00111010000001101011', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      // reverse
      it('first op is reverse', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 0000000000 0000000111
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('20', '1');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        // 1110000000 0000000000
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');
        expectThisAndAnswerThat('11100000000000000000', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      // both
      it('first op is reverse', function() {
        callbackUnderTest = initInteractiveProblem('1 20');

        // 0000011111 1111100111
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('20', '1');
        expectThisAndAnswerThat('2', '0');
        expectThisAndAnswerThat('19', '1');
        expectThisAndAnswerThat('3', '0');
        expectThisAndAnswerThat('18', '1');
        expectThisAndAnswerThat('4', '0');
        expectThisAndAnswerThat('17', '0');
        expectThisAndAnswerThat('5', '0');
        expectThisAndAnswerThat('16', '0');

        // 0001100000 0000011111
        expectThisAndAnswerThat('4', '1');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('4', '1');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');
        expectThisAndAnswerThat('00011000000000011111', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });
    });

    // all same
    context('Only same pairs', function() {
      // no operation
      it('no operation on 10', function() {
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

        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '0');
        expectThisAndAnswerThat('10000000000000000001', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      // complement
      it('first op is complement', function() {
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
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '0');

        // 1000011111 1111100001
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('10', '1');
        expectThisAndAnswerThat('11', '1');
        expectThisAndAnswerThat('10000111111111100001', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });
    });

    // all diff
    context('Only same pairs', function() {
      // no operation
      it('no operation on 10', function() {
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

        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('6', '0');
        expectThisAndAnswerThat('15', '1');
        expectThisAndAnswerThat('7', '0');
        expectThisAndAnswerThat('14', '1');
        expectThisAndAnswerThat('8', '0');
        expectThisAndAnswerThat('13', '1');
        expectThisAndAnswerThat('9', '0');
        expectThisAndAnswerThat('12', '1');

        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('1', '1');
        expectThisAndAnswerThat('10', '0');
        expectThisAndAnswerThat('11', '1');
        expectThisAndAnswerThat('10000000001111111110', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });

      // complement
      it('first op is complement', function() {
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
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('6', '1');
        expectThisAndAnswerThat('15', '0');
        expectThisAndAnswerThat('7', '1');
        expectThisAndAnswerThat('14', '0');
        expectThisAndAnswerThat('8', '1');
        expectThisAndAnswerThat('13', '0');
        expectThisAndAnswerThat('9', '1');
        expectThisAndAnswerThat('12', '0');

        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('1', '0');
        expectThisAndAnswerThat('10', '1');
        expectThisAndAnswerThat('11', '0');
        expectThisAndAnswerThat('01111111110000000001', 'Y');

        query.should.equal(noOutput);
        closeCallCount.should.equal(1);
      });
    });
  });

  context('init between test cases', function() {
    it('yep', function() {
      callbackUnderTest = initInteractiveProblem('2 20');

      // no operation
      // 00111010000001101011
      expectThisAndAnswerThat('1', '0');
      expectThisAndAnswerThat('20', '1');
      expectThisAndAnswerThat('2', '0');
      expectThisAndAnswerThat('19', '1');
      expectThisAndAnswerThat('3', '1');
      expectThisAndAnswerThat('18', '0');
      expectThisAndAnswerThat('4', '1');
      expectThisAndAnswerThat('17', '1');
      expectThisAndAnswerThat('5', '1');
      expectThisAndAnswerThat('16', '0');

      // 00111010000001101011
      expectThisAndAnswerThat('4', '1');
      expectThisAndAnswerThat('1', '0');
      expectThisAndAnswerThat('6', '0');
      expectThisAndAnswerThat('15', '1');
      expectThisAndAnswerThat('7', '1');
      expectThisAndAnswerThat('14', '1');
      expectThisAndAnswerThat('8', '0');
      expectThisAndAnswerThat('13', '0');
      expectThisAndAnswerThat('9', '0');
      expectThisAndAnswerThat('12', '0');

      expectThisAndAnswerThat('4', '1');
      expectThisAndAnswerThat('1', '0');
      expectThisAndAnswerThat('10', '0');
      expectThisAndAnswerThat('11', '0');
      expectThisAndAnswerThat('00111010000001101011', 'Y');

      // reverse
      // 0000000000 0000000011
      expectThisAndAnswerThat('1', '0');
      expectThisAndAnswerThat('20', '1');
      expectThisAndAnswerThat('2', '0');
      expectThisAndAnswerThat('19', '1');
      expectThisAndAnswerThat('3', '0');
      expectThisAndAnswerThat('18', '0');
      expectThisAndAnswerThat('4', '0');
      expectThisAndAnswerThat('17', '0');
      expectThisAndAnswerThat('5', '0');
      expectThisAndAnswerThat('16', '0');

      // 1100000000 0000000000
      expectThisAndAnswerThat('3', '0');
      expectThisAndAnswerThat('1', '1');
      expectThisAndAnswerThat('6', '0');
      expectThisAndAnswerThat('15', '0');
      expectThisAndAnswerThat('7', '0');
      expectThisAndAnswerThat('14', '0');
      expectThisAndAnswerThat('8', '0');
      expectThisAndAnswerThat('13', '0');
      expectThisAndAnswerThat('9', '0');
      expectThisAndAnswerThat('12', '0');

      expectThisAndAnswerThat('3', '0');
      expectThisAndAnswerThat('1', '1');
      expectThisAndAnswerThat('10', '0');
      expectThisAndAnswerThat('11', '0');
      expectThisAndAnswerThat('11000000000000000000', 'Y');

      query.should.equal(noOutput);
      closeCallCount.should.equal(1);
    });
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


