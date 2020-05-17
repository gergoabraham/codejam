# Google's Code Jam 2020
## Competitive vs practice submissions
There are `competitive` and `practice` submissions for the rounds. You can read the summary for my competitive submissions below.

After the rounds, I usually try to improve myself by reading the analysises and solving the problems without time limit. I put these submissions into the `practice` folders, and indicate in the folder name, if it does *not* solve all the test sets.

## Environment
Between rounds, I've created a skeleton for 3 different types of problems: problems with *one line input*, with *multiple line inputs*, and *interactive problems*.

During competition, I just copy these skeletons and extend them with the logic.

Every round has an `npm run tdd1b` like command to run the unit tests and rerun them on any file change for implementing the solution. Also, there is an `npm test` command to run all the tests, and get rid of exclusive tests (`--forbid-only`).

`.vscode/launch.json` contains config for debugging the solutions in their unit test environment.

## Competitive submissions
### Round 0: Qualification round
I've succeeded to solve the first 3 problems in the qualification round for 42 points.

[Here](https://codingcompetitions.withgoogle.com/codejam/submissions/000000000019fd27/Z2VyZ29vbw) are my submissions.

### Round 1B
First problem: 2 of 3 tests sets,
second problem: 1 of 3 tests sets solved.

16 points, not in the first 1500 competitors (final position is 3527th). :-( [Here](https://codingcompetitions.withgoogle.com/codejam/submissions/000000000019fef2/Z2VyZ29vbw) are my submissions.

### Round 1C
It was an exciting round! **And my best result so far**.

I was able to fully solve the 1th and 2nd problems with the first attempt. They were such interesting problems, especially the second one, where a statistical approach solved all the test cases.

For the 3rd problem, I couldn't produce a general solution after a lot of thinking, so I chose to implement a specific solution for the first test case. I submitted my solution 7 minutes before the end, but my code gave wrong answer. In the last 2 minutes I found that I missed a scenario, so I tried to fix it, and then... the time was up. I was able to give a correct solution for the first test case 7 minutes after the deadline. :-)

**My final position was the 1520th**, [here](https://codingcompetitions.withgoogle.com/codejam/submissions/000000000019fef4/Z2VyZ29vbw) are my submissions.