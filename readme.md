# Google's Code Jam
You can find my solutions for Google's Code Jam coding championship.

- [2020](2020)
- [2021](2021)

## Competitive vs practice submissions
There may be `competitive` and `practice` submissions for the rounds. You can read the summary for my competitive submissions below.

After the rounds, I usually try to improve myself by reading the analysises and solving the problems without time limit. I put these submissions into the `practice` folders, and indicate in the folder name, if it does *not* solve all the test sets.

## Code quality disclaimer
The code quality of the solutions is not the quality I'd commit into a pet or work project's repo. It's not very readable, and could bear some refactor. Or a lot. But here the readability and maintainability doesn't really matter, but being fast does.

At least it is nicely tested I think. =)

## Environment
Between rounds, I've created a skeleton for 3 different types of problems: problems with *one line input*, with *multiple line inputs*, and *interactive problems*.

During competition, I just copy these skeletons and extend them with the logic.

Every round has an `npm run tdd2020-1b` like command to run the unit tests and rerun them on any file change for implementing the solution. Also, there is an `npm test` command to run all the tests, and get rid of exclusive tests (`--forbid-only`).

`.vscode/launch.json` contains config for debugging the solutions in their unit test environment.