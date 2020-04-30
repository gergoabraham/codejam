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
    callbackUnderTest = initInteractiveProblem('1 999999995 999999995');

    expectThisAndAnswerThat('0 0', 'CENTER');
    // expectThisAndAnswerThat('2', '1');
    // expectThisAndAnswerThat('3', '2');
    // expectThisAndAnswerThat('012', 'Y');

    // expectThisAndAnswerThat('1', 's');
    // expectThisAndAnswerThat('2', 'a');
    // expectThisAndAnswerThat('3', 'jt');
    // expectThisAndAnswerThat('sajt', 'Y');

    // query.should.equal(noOutput);
    // closeCallCount.should.equal(1);
  });

  it('stop after CENTER, multiple cases', function() {
    callbackUnderTest = initInteractiveProblem('2 999999995 999999995');

    expectThisAndAnswerThat('0 0', 'CENTER');
    expectThisAndAnswerThat('0 0', 'CENTER');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it('stop on wrong answer any time', function() {
    callbackUnderTest = initInteractiveProblem('2 999999995 999999995');

    expectThisAndAnswerThat('0 0', 'WRONG');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it.skip('stop after 300', function() {

  });

  it('search for circle #1', function() {
    callbackUnderTest = initInteractiveProblem('2 999999995 999999995');

    expectThisAndAnswerThat('0 0', 'MISS');
    expectThisAndAnswerThat('-500000000 0', 'MISS');
    expectThisAndAnswerThat('500000000 0', 'CENTER');

    expectThisAndAnswerThat('0 0', 'MISS');
    expectThisAndAnswerThat('-500000000 0', 'MISS');
    expectThisAndAnswerThat('500000000 0', 'MISS');
    expectThisAndAnswerThat('0 -500000000', 'MISS');
    expectThisAndAnswerThat('-500000000 -500000000', 'MISS');
    expectThisAndAnswerThat('500000000 -500000000', 'MISS');
    expectThisAndAnswerThat('0 500000000', 'MISS');
    expectThisAndAnswerThat('-500000000 500000000', 'MISS');
    expectThisAndAnswerThat('500000000 500000000', 'CENTER');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  context('finding 4 points', function() {
    it('find points #1', function() {
      callbackUnderTest = initInteractiveProblem('1 999999995 999999995');

      expectThisAndAnswerThat('0 0', 'HIT');

      // max boundary
      // x: [-1000000000, 0], y: 0 -> -1000000000, 0
      expectThisAndAnswerThat('-500000000 0', 'HIT');
      expectThisAndAnswerThat('-750000000 0', 'HIT');
      expectThisAndAnswerThat('-875000000 0', 'HIT');
      expectThisAndAnswerThat('-937500000 0', 'HIT');
      expectThisAndAnswerThat('-968750000 0', 'HIT');
      expectThisAndAnswerThat('-984375000 0', 'HIT');
      expectThisAndAnswerThat('-992187500 0', 'HIT');
      expectThisAndAnswerThat('-996093750 0', 'HIT');
      expectThisAndAnswerThat('-998046875 0', 'HIT');
      expectThisAndAnswerThat('-999023438 0', 'HIT');
      expectThisAndAnswerThat('-999511719 0', 'HIT');
      expectThisAndAnswerThat('-999755860 0', 'HIT');
      expectThisAndAnswerThat('-999877930 0', 'HIT');
      expectThisAndAnswerThat('-999938965 0', 'HIT');
      expectThisAndAnswerThat('-999969483 0', 'HIT');
      expectThisAndAnswerThat('-999984742 0', 'HIT');
      expectThisAndAnswerThat('-999992371 0', 'HIT');
      expectThisAndAnswerThat('-999996186 0', 'HIT');
      expectThisAndAnswerThat('-999998093 0', 'HIT');
      expectThisAndAnswerThat('-999999047 0', 'HIT');
      expectThisAndAnswerThat('-999999524 0', 'HIT');
      expectThisAndAnswerThat('-999999762 0', 'HIT');
      expectThisAndAnswerThat('-999999881 0', 'HIT');
      expectThisAndAnswerThat('-999999941 0', 'HIT');
      expectThisAndAnswerThat('-999999971 0', 'HIT');
      expectThisAndAnswerThat('-999999986 0', 'HIT');
      expectThisAndAnswerThat('-999999993 0', 'HIT');
      expectThisAndAnswerThat('-999999997 0', 'HIT');
      expectThisAndAnswerThat('-999999999 0', 'HIT');
      expectThisAndAnswerThat('-1000000000 0', 'HIT');

      // min boundary
      // x: [0, 1000000000], y: 0 -> 0, 0
      expectThisAndAnswerThat('500000000 0', 'MISS');
      expectThisAndAnswerThat('250000000 0', 'MISS');
      expectThisAndAnswerThat('125000000 0', 'MISS');
      expectThisAndAnswerThat('62500000 0', 'MISS');
      expectThisAndAnswerThat('31250000 0', 'MISS');
      expectThisAndAnswerThat('15625000 0', 'MISS');
      expectThisAndAnswerThat('7812500 0', 'MISS');
      expectThisAndAnswerThat('3906250 0', 'MISS');
      expectThisAndAnswerThat('1953125 0', 'MISS');
      expectThisAndAnswerThat('976562 0', 'MISS');
      expectThisAndAnswerThat('488281 0', 'MISS');
      expectThisAndAnswerThat('244140 0', 'MISS');
      expectThisAndAnswerThat('122070 0', 'MISS');
      expectThisAndAnswerThat('61035 0', 'MISS');
      expectThisAndAnswerThat('30517 0', 'MISS');
      expectThisAndAnswerThat('15258 0', 'MISS');
      expectThisAndAnswerThat('7629 0', 'MISS');
      expectThisAndAnswerThat('3814 0', 'MISS');
      expectThisAndAnswerThat('1907 0', 'MISS');
      expectThisAndAnswerThat('953 0', 'MISS');
      expectThisAndAnswerThat('476 0', 'MISS');
      expectThisAndAnswerThat('238 0', 'MISS');
      expectThisAndAnswerThat('119 0', 'MISS');
      expectThisAndAnswerThat('59 0', 'MISS');
      expectThisAndAnswerThat('29 0', 'MISS');
      expectThisAndAnswerThat('14 0', 'MISS');
      expectThisAndAnswerThat('7 0', 'MISS');
      expectThisAndAnswerThat('3 0', 'MISS');
      expectThisAndAnswerThat('1 0', 'MISS');
      expectThisAndAnswerThat('0 0', 'HIT');

      // last is MISS
      // x: 0, y: [-1000000000, 0] -> 0, -666
      expectThisAndAnswerThat('0 -500000000', 'MISS');
      expectThisAndAnswerThat('0 -249999999', 'MISS');
      expectThisAndAnswerThat('0 -124999999', 'MISS');
      expectThisAndAnswerThat('0 -62499999', 'MISS');
      expectThisAndAnswerThat('0 -31249999', 'MISS');
      expectThisAndAnswerThat('0 -15624999', 'MISS');
      expectThisAndAnswerThat('0 -7812499', 'MISS');
      expectThisAndAnswerThat('0 -3906249', 'MISS');
      expectThisAndAnswerThat('0 -1953124', 'MISS');
      expectThisAndAnswerThat('0 -976561', 'MISS');
      expectThisAndAnswerThat('0 -488280', 'MISS');
      expectThisAndAnswerThat('0 -244139', 'MISS');
      expectThisAndAnswerThat('0 -122069', 'MISS');
      expectThisAndAnswerThat('0 -61034', 'MISS');
      expectThisAndAnswerThat('0 -30516', 'MISS');
      expectThisAndAnswerThat('0 -15257', 'MISS');
      expectThisAndAnswerThat('0 -7628', 'MISS');
      expectThisAndAnswerThat('0 -3813', 'MISS');
      expectThisAndAnswerThat('0 -1906', 'MISS');
      expectThisAndAnswerThat('0 -952', 'MISS');
      expectThisAndAnswerThat('0 -475', 'HIT');
      expectThisAndAnswerThat('0 -713', 'MISS');
      expectThisAndAnswerThat('0 -594', 'HIT');
      expectThisAndAnswerThat('0 -653', 'HIT');
      expectThisAndAnswerThat('0 -683', 'MISS');
      expectThisAndAnswerThat('0 -668', 'MISS');
      expectThisAndAnswerThat('0 -660', 'HIT');
      expectThisAndAnswerThat('0 -664', 'HIT');
      expectThisAndAnswerThat('0 -666', 'HIT');
      expectThisAndAnswerThat('0 -667', 'MISS');

      // last is HIT
      // x: 0, y: [0, 1000000000] -> 0, 100
      expectThisAndAnswerThat('0 500000000', 'MISS');
      expectThisAndAnswerThat('0 250000000', 'MISS');
      expectThisAndAnswerThat('0 125000000', 'MISS');
      expectThisAndAnswerThat('0 62500000', 'MISS');
      expectThisAndAnswerThat('0 31250000', 'MISS');
      expectThisAndAnswerThat('0 15625000', 'MISS');
      expectThisAndAnswerThat('0 7812500', 'MISS');
      expectThisAndAnswerThat('0 3906250', 'MISS');
      expectThisAndAnswerThat('0 1953125', 'MISS');
      expectThisAndAnswerThat('0 976562', 'MISS');
      expectThisAndAnswerThat('0 488281', 'MISS');
      expectThisAndAnswerThat('0 244140', 'MISS');
      expectThisAndAnswerThat('0 122070', 'MISS');
      expectThisAndAnswerThat('0 61035', 'MISS');
      expectThisAndAnswerThat('0 30517', 'MISS');
      expectThisAndAnswerThat('0 15258', 'MISS');
      expectThisAndAnswerThat('0 7629', 'MISS');
      expectThisAndAnswerThat('0 3814', 'MISS');
      expectThisAndAnswerThat('0 1907', 'MISS');
      expectThisAndAnswerThat('0 953', 'MISS');
      expectThisAndAnswerThat('0 476', 'MISS');
      expectThisAndAnswerThat('0 238', 'MISS');
      expectThisAndAnswerThat('0 119', 'MISS');
      expectThisAndAnswerThat('0 59', 'HIT');
      expectThisAndAnswerThat('0 89', 'HIT');
      expectThisAndAnswerThat('0 104', 'MISS');
      expectThisAndAnswerThat('0 97', 'HIT');
      expectThisAndAnswerThat('0 101', 'MISS');
      expectThisAndAnswerThat('0 99', 'HIT');
      expectThisAndAnswerThat('0 100', 'HIT');
    });

    it('find points #2', function() {
      callbackUnderTest = initInteractiveProblem('1 999999995 999999995');

      expectThisAndAnswerThat('0 0', 'HIT');

      // max boundary
      // x: [-1000000000, 0], y: 0 -> -999999999, 0
      expectThisAndAnswerThat('-500000000 0', 'HIT');
      expectThisAndAnswerThat('-750000000 0', 'HIT');
      expectThisAndAnswerThat('-875000000 0', 'HIT');
      expectThisAndAnswerThat('-937500000 0', 'HIT');
      expectThisAndAnswerThat('-968750000 0', 'HIT');
      expectThisAndAnswerThat('-984375000 0', 'HIT');
      expectThisAndAnswerThat('-992187500 0', 'HIT');
      expectThisAndAnswerThat('-996093750 0', 'HIT');
      expectThisAndAnswerThat('-998046875 0', 'HIT');
      expectThisAndAnswerThat('-999023438 0', 'HIT');
      expectThisAndAnswerThat('-999511719 0', 'HIT');
      expectThisAndAnswerThat('-999755860 0', 'HIT');
      expectThisAndAnswerThat('-999877930 0', 'HIT');
      expectThisAndAnswerThat('-999938965 0', 'HIT');
      expectThisAndAnswerThat('-999969483 0', 'HIT');
      expectThisAndAnswerThat('-999984742 0', 'HIT');
      expectThisAndAnswerThat('-999992371 0', 'HIT');
      expectThisAndAnswerThat('-999996186 0', 'HIT');
      expectThisAndAnswerThat('-999998093 0', 'HIT');
      expectThisAndAnswerThat('-999999047 0', 'HIT');
      expectThisAndAnswerThat('-999999524 0', 'HIT');
      expectThisAndAnswerThat('-999999762 0', 'HIT');
      expectThisAndAnswerThat('-999999881 0', 'HIT');
      expectThisAndAnswerThat('-999999941 0', 'HIT');
      expectThisAndAnswerThat('-999999971 0', 'HIT');
      expectThisAndAnswerThat('-999999986 0', 'HIT');
      expectThisAndAnswerThat('-999999993 0', 'HIT');
      expectThisAndAnswerThat('-999999997 0', 'HIT');
      expectThisAndAnswerThat('-999999999 0', 'HIT');
      expectThisAndAnswerThat('-1000000000 0', 'MISS');

      // min boundary
      // x: [0, 1000000000], y: 0 -> 101, 0
      expectThisAndAnswerThat('500000000 0', 'MISS');
      expectThisAndAnswerThat('250000000 0', 'MISS');
      expectThisAndAnswerThat('125000000 0', 'MISS');
      expectThisAndAnswerThat('62500000 0', 'MISS');
      expectThisAndAnswerThat('31250000 0', 'MISS');
      expectThisAndAnswerThat('15625000 0', 'MISS');
      expectThisAndAnswerThat('7812500 0', 'MISS');
      expectThisAndAnswerThat('3906250 0', 'MISS');
      expectThisAndAnswerThat('1953125 0', 'MISS');
      expectThisAndAnswerThat('976562 0', 'MISS');
      expectThisAndAnswerThat('488281 0', 'MISS');
      expectThisAndAnswerThat('244140 0', 'MISS');
      expectThisAndAnswerThat('122070 0', 'MISS');
      expectThisAndAnswerThat('61035 0', 'MISS');
      expectThisAndAnswerThat('30517 0', 'MISS');
      expectThisAndAnswerThat('15258 0', 'MISS');
      expectThisAndAnswerThat('7629 0', 'MISS');
      expectThisAndAnswerThat('3814 0', 'MISS');
      expectThisAndAnswerThat('1907 0', 'MISS');
      expectThisAndAnswerThat('953 0', 'MISS');
      expectThisAndAnswerThat('476 0', 'MISS');
      expectThisAndAnswerThat('238 0', 'MISS');
      expectThisAndAnswerThat('119 0', 'MISS');
      expectThisAndAnswerThat('59 0', 'HIT');
      expectThisAndAnswerThat('89 0', 'HIT');
      expectThisAndAnswerThat('104 0', 'MISS');
      expectThisAndAnswerThat('97 0', 'HIT');
      expectThisAndAnswerThat('101 0', 'HIT');
      expectThisAndAnswerThat('103 0', 'MISS');
      expectThisAndAnswerThat('102 0', 'MISS');

      // last is MISS
      // x: 0, y: [-1000000000, 0] -> 0, -638
      expectThisAndAnswerThat('0 -500000000', 'MISS');
      expectThisAndAnswerThat('0 -249999999', 'MISS');
      expectThisAndAnswerThat('0 -124999999', 'MISS');
      expectThisAndAnswerThat('0 -62499999', 'MISS');
      expectThisAndAnswerThat('0 -31249999', 'MISS');
      expectThisAndAnswerThat('0 -15624999', 'MISS');
      expectThisAndAnswerThat('0 -7812499', 'MISS');
      expectThisAndAnswerThat('0 -3906249', 'MISS');
      expectThisAndAnswerThat('0 -1953124', 'MISS');
      expectThisAndAnswerThat('0 -976561', 'MISS');
      expectThisAndAnswerThat('0 -488280', 'MISS');
      expectThisAndAnswerThat('0 -244139', 'MISS');
      expectThisAndAnswerThat('0 -122069', 'MISS');
      expectThisAndAnswerThat('0 -61034', 'MISS');
      expectThisAndAnswerThat('0 -30516', 'MISS');
      expectThisAndAnswerThat('0 -15257', 'MISS');
      expectThisAndAnswerThat('0 -7628', 'MISS');
      expectThisAndAnswerThat('0 -3813', 'MISS');
      expectThisAndAnswerThat('0 -1906', 'MISS');
      expectThisAndAnswerThat('0 -952', 'MISS');
      expectThisAndAnswerThat('0 -475', 'HIT');
      expectThisAndAnswerThat('0 -713', 'MISS');
      expectThisAndAnswerThat('0 -594', 'HIT');
      expectThisAndAnswerThat('0 -653', 'MISS');
      expectThisAndAnswerThat('0 -623', 'HIT');
      expectThisAndAnswerThat('0 -638', 'HIT');
      expectThisAndAnswerThat('0 -645', 'MISS');
      expectThisAndAnswerThat('0 -641', 'MISS');
      expectThisAndAnswerThat('0 -639', 'MISS');
      expectThisAndAnswerThat('0 -638', 'HIT');

      // last is HIT
      // x: 0, y: [0, 1000000000] -> 0, 103
      expectThisAndAnswerThat('0 500000000', 'MISS');
      expectThisAndAnswerThat('0 250000000', 'MISS');
      expectThisAndAnswerThat('0 125000000', 'MISS');
      expectThisAndAnswerThat('0 62500000', 'MISS');
      expectThisAndAnswerThat('0 31250000', 'MISS');
      expectThisAndAnswerThat('0 15625000', 'MISS');
      expectThisAndAnswerThat('0 7812500', 'MISS');
      expectThisAndAnswerThat('0 3906250', 'MISS');
      expectThisAndAnswerThat('0 1953125', 'MISS');
      expectThisAndAnswerThat('0 976562', 'MISS');
      expectThisAndAnswerThat('0 488281', 'MISS');
      expectThisAndAnswerThat('0 244140', 'MISS');
      expectThisAndAnswerThat('0 122070', 'MISS');
      expectThisAndAnswerThat('0 61035', 'MISS');
      expectThisAndAnswerThat('0 30517', 'MISS');
      expectThisAndAnswerThat('0 15258', 'MISS');
      expectThisAndAnswerThat('0 7629', 'MISS');
      expectThisAndAnswerThat('0 3814', 'MISS');
      expectThisAndAnswerThat('0 1907', 'MISS');
      expectThisAndAnswerThat('0 953', 'MISS');
      expectThisAndAnswerThat('0 476', 'MISS');
      expectThisAndAnswerThat('0 238', 'MISS');
      expectThisAndAnswerThat('0 119', 'MISS');
      expectThisAndAnswerThat('0 59', 'HIT');
      expectThisAndAnswerThat('0 89', 'HIT');
      expectThisAndAnswerThat('0 104', 'MISS');
      expectThisAndAnswerThat('0 97', 'HIT');
      expectThisAndAnswerThat('0 101', 'HIT');
      expectThisAndAnswerThat('0 103', 'HIT');
      expectThisAndAnswerThat('0 104', 'MISS');
    });
  });

  it('shoot the center!', function() {
    callbackUnderTest = initInteractiveProblem('1 5000000000 1000000000');

    expectThisAndAnswerThat('0 0', 'MISS');
    expectThisAndAnswerThat('-500000000 0', 'MISS');
    expectThisAndAnswerThat('500000000 0', 'MISS');
    expectThisAndAnswerThat('0 -500000000', 'MISS');
    expectThisAndAnswerThat('-500000000 -500000000', 'HIT');
    // center: -5000000000, -5000000000

    // x: -10^9, -5*10^8 -> -723444567
    expectThisAndAnswerThat('-750000000 -500000000', 'MISS');
    expectThisAndAnswerThat('-624999999 -500000000', 'HIT');
    expectThisAndAnswerThat('-687499999 -500000000', 'HIT');
    expectThisAndAnswerThat('-718749999 -500000000', 'HIT');
    expectThisAndAnswerThat('-734374999 -500000000', 'MISS');
    expectThisAndAnswerThat('-726562499 -500000000', 'MISS');
    expectThisAndAnswerThat('-722656249 -500000000', 'HIT');
    expectThisAndAnswerThat('-724609374 -500000000', 'MISS');
    expectThisAndAnswerThat('-723632811 -500000000', 'MISS');
    expectThisAndAnswerThat('-723144530 -500000000', 'HIT');
    expectThisAndAnswerThat('-723388670 -500000000', 'HIT');
    expectThisAndAnswerThat('-723510740 -500000000', 'MISS');
    expectThisAndAnswerThat('-723449705 -500000000', 'MISS');
    expectThisAndAnswerThat('-723419187 -500000000', 'HIT');
    expectThisAndAnswerThat('-723434446 -500000000', 'HIT');
    expectThisAndAnswerThat('-723442075 -500000000', 'HIT');
    expectThisAndAnswerThat('-723445890 -500000000', 'MISS');
    expectThisAndAnswerThat('-723443982 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444936 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444459 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444697 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444578 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444518 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444548 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444563 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444570 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444566 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444568 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444567 -500000000', 'HIT');

    // x: -5*10^8...10^9 -> 333334
    expectThisAndAnswerThat('250000000 -500000000', 'MISS');
    expectThisAndAnswerThat('-125000000 -500000000', 'HIT');
    expectThisAndAnswerThat('62500000 -500000000', 'MISS');
    expectThisAndAnswerThat('-31250000 -500000000', 'HIT');
    expectThisAndAnswerThat('15625000 -500000000', 'MISS');
    expectThisAndAnswerThat('-7812500 -500000000', 'HIT');
    expectThisAndAnswerThat('3906250 -500000000', 'MISS');
    expectThisAndAnswerThat('-1953125 -500000000', 'HIT');
    expectThisAndAnswerThat('976563 -500000000', 'MISS');
    expectThisAndAnswerThat('-488281 -500000000', 'HIT');
    expectThisAndAnswerThat('244141 -500000000', 'HIT');
    expectThisAndAnswerThat('610352 -500000000', 'MISS');
    expectThisAndAnswerThat('427247 -500000000', 'MISS');
    expectThisAndAnswerThat('335694 -500000000', 'MISS');
    expectThisAndAnswerThat('289918 -500000000', 'HIT');
    expectThisAndAnswerThat('312806 -500000000', 'HIT');
    expectThisAndAnswerThat('324250 -500000000', 'HIT');
    expectThisAndAnswerThat('329972 -500000000', 'HIT');
    expectThisAndAnswerThat('332833 -500000000', 'HIT');
    expectThisAndAnswerThat('334264 -500000000', 'MISS');
    expectThisAndAnswerThat('333549 -500000000', 'MISS');
    expectThisAndAnswerThat('333191 -500000000', 'HIT');
    expectThisAndAnswerThat('333370 -500000000', 'MISS');
    expectThisAndAnswerThat('333281 -500000000', 'HIT');
    expectThisAndAnswerThat('333326 -500000000', 'HIT');
    expectThisAndAnswerThat('333348 -500000000', 'MISS');
    expectThisAndAnswerThat('333337 -500000000', 'MISS');
    expectThisAndAnswerThat('333332 -500000000', 'HIT');
    expectThisAndAnswerThat('333335 -500000000', 'MISS');
    expectThisAndAnswerThat('333334 -500000000', 'HIT');
    expectThisAndAnswerThat('333335 -500000000', 'MISS');

    // y: -10^9, -5*10^8 -> -999666111
    expectThisAndAnswerThat('-500000000 -750000000', 'HIT');
    expectThisAndAnswerThat('-500000000 -875000000', 'HIT');
    expectThisAndAnswerThat('-500000000 -937500000', 'HIT');
    expectThisAndAnswerThat('-500000000 -968750000', 'HIT');
    expectThisAndAnswerThat('-500000000 -984375000', 'HIT');
    expectThisAndAnswerThat('-500000000 -992187500', 'HIT');
    expectThisAndAnswerThat('-500000000 -996093750', 'HIT');
    expectThisAndAnswerThat('-500000000 -998046875', 'HIT');
    expectThisAndAnswerThat('-500000000 -999023438', 'HIT');
    expectThisAndAnswerThat('-500000000 -999511719', 'HIT');
    expectThisAndAnswerThat('-500000000 -999755860', 'MISS');
    expectThisAndAnswerThat('-500000000 -999633789', 'HIT');
    expectThisAndAnswerThat('-500000000 -999694824', 'MISS');
    expectThisAndAnswerThat('-500000000 -999664306', 'HIT');
    expectThisAndAnswerThat('-500000000 -999679565', 'MISS');
    expectThisAndAnswerThat('-500000000 -999671935', 'MISS');
    expectThisAndAnswerThat('-500000000 -999668120', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666213', 'MISS');
    expectThisAndAnswerThat('-500000000 -999665259', 'HIT');
    expectThisAndAnswerThat('-500000000 -999665736', 'HIT');
    expectThisAndAnswerThat('-500000000 -999665974', 'HIT');
    expectThisAndAnswerThat('-500000000 -999666093', 'HIT');
    expectThisAndAnswerThat('-500000000 -999666153', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666123', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666108', 'HIT');
    expectThisAndAnswerThat('-500000000 -999666115', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666111', 'HIT');
    expectThisAndAnswerThat('-500000000 -999666113', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666112', 'MISS');

    // y: -5*10^8...10^9 -> 666666666
    expectThisAndAnswerThat('-500000000 250000000', 'HIT');
    expectThisAndAnswerThat('-500000000 625000001', 'HIT');
    expectThisAndAnswerThat('-500000000 812500001', 'MISS');
    expectThisAndAnswerThat('-500000000 718750001', 'MISS');
    expectThisAndAnswerThat('-500000000 671875001', 'MISS');
    expectThisAndAnswerThat('-500000000 648437501', 'HIT');
    expectThisAndAnswerThat('-500000000 660156251', 'HIT');
    expectThisAndAnswerThat('-500000000 666015626', 'HIT');
    expectThisAndAnswerThat('-500000000 668945314', 'MISS');
    expectThisAndAnswerThat('-500000000 667480470', 'MISS');
    expectThisAndAnswerThat('-500000000 666748048', 'MISS');
    expectThisAndAnswerThat('-500000000 666381837', 'HIT');
    expectThisAndAnswerThat('-500000000 666564943', 'HIT');
    expectThisAndAnswerThat('-500000000 666656496', 'HIT');
    expectThisAndAnswerThat('-500000000 666702272', 'MISS');
    expectThisAndAnswerThat('-500000000 666679384', 'MISS');
    expectThisAndAnswerThat('-500000000 666667940', 'MISS');
    expectThisAndAnswerThat('-500000000 666662218', 'HIT');
    expectThisAndAnswerThat('-500000000 666665079', 'HIT');
    expectThisAndAnswerThat('-500000000 666666510', 'HIT');
    expectThisAndAnswerThat('-500000000 666667225', 'MISS');
    expectThisAndAnswerThat('-500000000 666666868', 'MISS');
    expectThisAndAnswerThat('-500000000 666666689', 'MISS');
    expectThisAndAnswerThat('-500000000 666666600', 'HIT');
    expectThisAndAnswerThat('-500000000 666666645', 'HIT');
    expectThisAndAnswerThat('-500000000 666666667', 'MISS');
    expectThisAndAnswerThat('-500000000 666666656', 'HIT');
    expectThisAndAnswerThat('-500000000 666666662', 'HIT');
    expectThisAndAnswerThat('-500000000 666666665', 'HIT');
    expectThisAndAnswerThat('-500000000 666666666', 'HIT');

    // hit left-above of center
    // x = (-723444567 + 333334) / 2 = -361555616,5 = -361555616
    // y = (-999666111 + 666666666) / 2 = -166499722,5 = -166499722
    expectThisAndAnswerThat('-361555617 -166499721', 'CENTER');

    query.should.equal(noOutput);
    closeCallCount.should.equal(1);
  });

  it('shoot AROUND the center!', function() {
    callbackUnderTest = initInteractiveProblem('2 5000000000 1000000000');

    expectThisAndAnswerThat('0 0', 'MISS');
    expectThisAndAnswerThat('-500000000 0', 'MISS');
    expectThisAndAnswerThat('500000000 0', 'MISS');
    expectThisAndAnswerThat('0 -500000000', 'MISS');
    expectThisAndAnswerThat('-500000000 -500000000', 'HIT');
    // center: -5000000000, -5000000000

    // x: -10^9, -5*10^8 -> -723444567
    expectThisAndAnswerThat('-750000000 -500000000', 'MISS');
    expectThisAndAnswerThat('-624999999 -500000000', 'HIT');
    expectThisAndAnswerThat('-687499999 -500000000', 'HIT');
    expectThisAndAnswerThat('-718749999 -500000000', 'HIT');
    expectThisAndAnswerThat('-734374999 -500000000', 'MISS');
    expectThisAndAnswerThat('-726562499 -500000000', 'MISS');
    expectThisAndAnswerThat('-722656249 -500000000', 'HIT');
    expectThisAndAnswerThat('-724609374 -500000000', 'MISS');
    expectThisAndAnswerThat('-723632811 -500000000', 'MISS');
    expectThisAndAnswerThat('-723144530 -500000000', 'HIT');
    expectThisAndAnswerThat('-723388670 -500000000', 'HIT');
    expectThisAndAnswerThat('-723510740 -500000000', 'MISS');
    expectThisAndAnswerThat('-723449705 -500000000', 'MISS');
    expectThisAndAnswerThat('-723419187 -500000000', 'HIT');
    expectThisAndAnswerThat('-723434446 -500000000', 'HIT');
    expectThisAndAnswerThat('-723442075 -500000000', 'HIT');
    expectThisAndAnswerThat('-723445890 -500000000', 'MISS');
    expectThisAndAnswerThat('-723443982 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444936 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444459 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444697 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444578 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444518 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444548 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444563 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444570 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444566 -500000000', 'HIT');
    expectThisAndAnswerThat('-723444568 -500000000', 'MISS');
    expectThisAndAnswerThat('-723444567 -500000000', 'HIT');

    // x: -5*10^8...10^9 -> 333334
    expectThisAndAnswerThat('250000000 -500000000', 'MISS');
    expectThisAndAnswerThat('-125000000 -500000000', 'HIT');
    expectThisAndAnswerThat('62500000 -500000000', 'MISS');
    expectThisAndAnswerThat('-31250000 -500000000', 'HIT');
    expectThisAndAnswerThat('15625000 -500000000', 'MISS');
    expectThisAndAnswerThat('-7812500 -500000000', 'HIT');
    expectThisAndAnswerThat('3906250 -500000000', 'MISS');
    expectThisAndAnswerThat('-1953125 -500000000', 'HIT');
    expectThisAndAnswerThat('976563 -500000000', 'MISS');
    expectThisAndAnswerThat('-488281 -500000000', 'HIT');
    expectThisAndAnswerThat('244141 -500000000', 'HIT');
    expectThisAndAnswerThat('610352 -500000000', 'MISS');
    expectThisAndAnswerThat('427247 -500000000', 'MISS');
    expectThisAndAnswerThat('335694 -500000000', 'MISS');
    expectThisAndAnswerThat('289918 -500000000', 'HIT');
    expectThisAndAnswerThat('312806 -500000000', 'HIT');
    expectThisAndAnswerThat('324250 -500000000', 'HIT');
    expectThisAndAnswerThat('329972 -500000000', 'HIT');
    expectThisAndAnswerThat('332833 -500000000', 'HIT');
    expectThisAndAnswerThat('334264 -500000000', 'MISS');
    expectThisAndAnswerThat('333549 -500000000', 'MISS');
    expectThisAndAnswerThat('333191 -500000000', 'HIT');
    expectThisAndAnswerThat('333370 -500000000', 'MISS');
    expectThisAndAnswerThat('333281 -500000000', 'HIT');
    expectThisAndAnswerThat('333326 -500000000', 'HIT');
    expectThisAndAnswerThat('333348 -500000000', 'MISS');
    expectThisAndAnswerThat('333337 -500000000', 'MISS');
    expectThisAndAnswerThat('333332 -500000000', 'HIT');
    expectThisAndAnswerThat('333335 -500000000', 'MISS');
    expectThisAndAnswerThat('333334 -500000000', 'HIT');
    expectThisAndAnswerThat('333335 -500000000', 'MISS');

    // y: -10^9, -5*10^8 -> -999666111
    expectThisAndAnswerThat('-500000000 -750000000', 'HIT');
    expectThisAndAnswerThat('-500000000 -875000000', 'HIT');
    expectThisAndAnswerThat('-500000000 -937500000', 'HIT');
    expectThisAndAnswerThat('-500000000 -968750000', 'HIT');
    expectThisAndAnswerThat('-500000000 -984375000', 'HIT');
    expectThisAndAnswerThat('-500000000 -992187500', 'HIT');
    expectThisAndAnswerThat('-500000000 -996093750', 'HIT');
    expectThisAndAnswerThat('-500000000 -998046875', 'HIT');
    expectThisAndAnswerThat('-500000000 -999023438', 'HIT');
    expectThisAndAnswerThat('-500000000 -999511719', 'HIT');
    expectThisAndAnswerThat('-500000000 -999755860', 'MISS');
    expectThisAndAnswerThat('-500000000 -999633789', 'HIT');
    expectThisAndAnswerThat('-500000000 -999694824', 'MISS');
    expectThisAndAnswerThat('-500000000 -999664306', 'HIT');
    expectThisAndAnswerThat('-500000000 -999679565', 'MISS');
    expectThisAndAnswerThat('-500000000 -999671935', 'MISS');
    expectThisAndAnswerThat('-500000000 -999668120', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666213', 'MISS');
    expectThisAndAnswerThat('-500000000 -999665259', 'HIT');
    expectThisAndAnswerThat('-500000000 -999665736', 'HIT');
    expectThisAndAnswerThat('-500000000 -999665974', 'HIT');
    expectThisAndAnswerThat('-500000000 -999666093', 'HIT');
    expectThisAndAnswerThat('-500000000 -999666153', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666123', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666108', 'HIT');
    expectThisAndAnswerThat('-500000000 -999666115', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666111', 'HIT');
    expectThisAndAnswerThat('-500000000 -999666113', 'MISS');
    expectThisAndAnswerThat('-500000000 -999666112', 'MISS');

    // y: -5*10^8...10^9 -> 666666666
    expectThisAndAnswerThat('-500000000 250000000', 'HIT');
    expectThisAndAnswerThat('-500000000 625000001', 'HIT');
    expectThisAndAnswerThat('-500000000 812500001', 'MISS');
    expectThisAndAnswerThat('-500000000 718750001', 'MISS');
    expectThisAndAnswerThat('-500000000 671875001', 'MISS');
    expectThisAndAnswerThat('-500000000 648437501', 'HIT');
    expectThisAndAnswerThat('-500000000 660156251', 'HIT');
    expectThisAndAnswerThat('-500000000 666015626', 'HIT');
    expectThisAndAnswerThat('-500000000 668945314', 'MISS');
    expectThisAndAnswerThat('-500000000 667480470', 'MISS');
    expectThisAndAnswerThat('-500000000 666748048', 'MISS');
    expectThisAndAnswerThat('-500000000 666381837', 'HIT');
    expectThisAndAnswerThat('-500000000 666564943', 'HIT');
    expectThisAndAnswerThat('-500000000 666656496', 'HIT');
    expectThisAndAnswerThat('-500000000 666702272', 'MISS');
    expectThisAndAnswerThat('-500000000 666679384', 'MISS');
    expectThisAndAnswerThat('-500000000 666667940', 'MISS');
    expectThisAndAnswerThat('-500000000 666662218', 'HIT');
    expectThisAndAnswerThat('-500000000 666665079', 'HIT');
    expectThisAndAnswerThat('-500000000 666666510', 'HIT');
    expectThisAndAnswerThat('-500000000 666667225', 'MISS');
    expectThisAndAnswerThat('-500000000 666666868', 'MISS');
    expectThisAndAnswerThat('-500000000 666666689', 'MISS');
    expectThisAndAnswerThat('-500000000 666666600', 'HIT');
    expectThisAndAnswerThat('-500000000 666666645', 'HIT');
    expectThisAndAnswerThat('-500000000 666666667', 'MISS');
    expectThisAndAnswerThat('-500000000 666666656', 'HIT');
    expectThisAndAnswerThat('-500000000 666666662', 'HIT');
    expectThisAndAnswerThat('-500000000 666666665', 'HIT');
    expectThisAndAnswerThat('-500000000 666666666', 'HIT');

    // hit center
    // x = (-723444567 + 333334) / 2 = -361555616,5
    // y = (-999666111 + 666666666) / 2 = -166499722,5
    expectThisAndAnswerThat('-361555617 -166499721', 'HIT');
    expectThisAndAnswerThat('-361555616 -166499721', 'HIT');
    expectThisAndAnswerThat('-361555615 -166499721', 'HIT');
    expectThisAndAnswerThat('-361555617 -166499722', 'HIT');
    expectThisAndAnswerThat('-361555616 -166499722', 'HIT');
    expectThisAndAnswerThat('-361555615 -166499722', 'HIT');
    expectThisAndAnswerThat('-361555617 -166499723', 'HIT');
    expectThisAndAnswerThat('-361555616 -166499723', 'HIT');
    expectThisAndAnswerThat('-361555615 -166499723', 'CENTER');

    // new round
    expectThisAndAnswerThat('0 0', 'WRONG');


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


