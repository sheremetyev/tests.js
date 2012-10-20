tests.js
========

Console Test Runner: writes to stdin, reads stdout.

**tests.js** is useful for test-driven development of command-line utilities.
Works on Mac OS X, Windows and Linux so you can write cross-platform tests.
Tests do not depend on the implementation language of the program.

Usage
=====

You will need Node.js and NPM. Install using the following command.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$ npm install -g tests
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Then create some `.test` files and execute the following command in the folder
with tests.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$ tests
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Test files should have the following structure.

-   first line—command to execute (can be relative path, can contain pipeline of
    several commands),

-   then `<<<` and input to send to the program (can be multiple lines),

-   then `>>>` and expected output.

[Example][1]:

[1]: <https://github.com/sheremetyev/tests.js/blob/master/test/wc.test>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
wc
<<<
one two three
>>>
       1       3      14
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This test executes `wc` command, sends string `one two three` to its stdin and
checks the output of the program.

When the test is run you should see something like

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
✓  /path/to/tests/wc.test: 9ms

✔  1 test complete (9ms)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To compare program’s output with expected output not as literal strings but as
JSON objects write `>>>JSON` in the test file instead of `>>>`.

For more examples see
<https://github.com/sheremetyev/texts.js/tree/master/test>.

Acknowledgements
================

The idea was borrowed from John MacFarlane’s tests format in Pandoc2.
