const fs = require("fs");

const inputContent = fs.readFileSync("./input", "utf-8");
const lines = inputContent.split("\n");
const linereg = /([0-9]+)/g;

const result = lines.reduce((acc, line) => {
  const match = line.match(linereg);
  if (match) {
    const [_, ...rest] = match;
    const mine = rest.slice(10, rest.length);
    return (
      acc +
      rest.slice(0, 10).reduce((cc, w) => {
        return mine.includes(w) ? cc + (cc || 1) : cc;
      }, 0)
    );
  }
  return acc;
}, 0);

console.log(result);
