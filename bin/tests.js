#!/usr/bin/env node

var tests = require('../lib/tests');

// either run specified tests or just all tests in current dir
var args = process.argv.slice(2);
if (args.length == 0)
  args.push('.');

tests(args);
