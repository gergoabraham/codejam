'use strict';

function solveCase(input) {
  return JSON.stringify(input);
}

function main() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let T;
  let t;
  let cases;
  let n;

  rl.on('line', (line) => {
    if (!T) {
      T = Number(line);
      cases = Array(T);
      t = 0;
    } else {
      if (!cases[t]) {
        const N = Number(line);

        cases[t] = {
          N: N,
          data: Array(N),
        };
        n = 0;
      } else {
        cases[t].data[n] = line.split(' ').map((x) => Number(x));
        n++;

        if (n == cases[t].N) {
          t++;
          if (t == T) {
            rl.close();
          }
        }
      }
    }
  })
      .on('close', () => {
        cases.forEach((x, i) => {
          console.log(`Case #${i + 1}: ${solveCase(x)}`);
        });
      });
}

if (!global.test) {
  main();
}
