const fs = require("fs");

const inputContent = fs.readFileSync("./input2", "utf-8");

// https://mtsknn.fi/blog/how-to-do-overlapping-matches-with-regular-expressions/
const regex = /(?=(one|two|three|four|five|six|seven|eight|nine))/gm;

const map = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function getMap(str) {
  return map[str];
}

const input = inputContent.replaceAll(regex, (a, b) => {
  return getMap(b);
});

const lines = input.trim().split("\n");

const r = /[0-9]+/g;

const result = lines.reduce((acc, line) => {
  const match = line.match(r);
  if (match) {
    const d = match[0] + match.at(-1);
    return acc + parseInt(d[0] + d.at(-1), 10);
  }
  return acc;
}, 0);

console.log(result);
