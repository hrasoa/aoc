const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8');
const lines = input.trim().split('\n');

const regex = /[0-9]+/g;

const result = lines.reduce((acc, line) => {
  const match = line.match(regex);
  if (match) {
    const d = match[0] + match.at(-1);
    return acc + parseInt(d[0] + d.at(-1), 10);
  }
  return acc;
}, 0);

console.log(result);