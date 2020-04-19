'use strict';

const chai = require('chai');

/* global should */
/* exported should */
should = chai.should();

let processExitBackup;

beforeEach(function() {
  processExitBackup = process.exit;
  process.exit = () => {};
});

afterEach(function() {
  process.exit = processExitBackup;
});
