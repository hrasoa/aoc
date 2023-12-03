const fs = require("fs");

const input = fs.readFileSync("./input", "utf-8");
const lines = input.trim().split("\n");

const regex = /(([0-9]+) (blue|red|green))+/g;
const regexg = /Game ([0-9]+)/;

const result = lines.reduce((acc, line) => {
  const match = Array.from(line.matchAll(regex));
  if (match) {
    let possible = true;
    match.forEach((m) => {
      const count = parseInt(m[2], 10);
      const color = m[3];
      if (
        (color === "red" && count > 12) ||
        (color === "green" && count > 13) ||
        (color === "blue" && count > 14)
      ) {
        possible = false;
      }
    });
    if (possible) {
      return acc + parseInt(line.match(regexg)[1], 10);
    }
  }
  return acc;
}, 0);

console.log(result);
