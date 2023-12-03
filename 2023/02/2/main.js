const fs = require("fs");

const input = fs.readFileSync("./input", "utf-8");
const lines = input.trim().split("\n");

const regex = /(([0-9]+) (blue|red|green))+/g;

const result = lines.reduce((acc, line) => {
  const match = Array.from(line.matchAll(regex));
  if (match) {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
    match.forEach((m) => {
      const count = parseInt(m[2], 10);
      const color = m[3];
      if (color === "red" && count > maxRed) {
        maxRed = count;
      }
      if (color === "green" && count > maxGreen) {
        maxGreen = count;
      }
      if (color === "blue" && count > maxBlue) {
        maxBlue = count;
      }
    });
    return acc + maxBlue * maxGreen * maxRed;
  }
  return acc;
}, 0);

console.log(result);
