const fs = require("fs");

const inputContent = fs.readFileSync("./input1", "utf-8");
const split = inputContent.split("\n");
const rowLength = split[0].length;
const rowTotal = split.length;
const input = inputContent;

let debug = inputContent;

const symbols = /(?!([0-9]+|\.+))./gm;

const eoflines = Array.from(input.matchAll(/\n/gm)).map((m) => m.index);

const symbolsIndexes = Array.from(input.matchAll(symbols)).map((m) => {
  return m.index - eoflines.filter((i) => i <= m.index).length;
});

let ii = 0;

function replaceAt(str, index, replacement, l) {
  return str.substring(0, index) + replacement + str.substring(index + l);
}

function getCarret(numIndex, numLength) {
  const rowIndex = Math.floor(numIndex / rowLength);
  const rowStart = rowIndex * rowLength;
  const rowEnd = rowStart + rowLength - 1;
  return rowIndex >= 0 && rowIndex < rowTotal
    ? [Math.max(rowStart, numIndex - 1), Math.min(numIndex + numLength, rowEnd)]
    : null;
}

const result = Array.from(input.matchAll(/[0-9]+/gm)).reduce((acc, m) => {
  const num = m[0];
  const index = m.index - eoflines.filter((i) => i <= m.index).length;

  const numLength = num.length;
  const carret = getCarret(index, numLength);
  const carretPrev = getCarret(index - rowLength, numLength);
  const carretNext = getCarret(index + rowLength, numLength);
  const part = symbolsIndexes.some((i) => {
    return (
      i === carret[0] ||
      i === carret[1] ||
      (!!carretNext &&
        (i === carretNext[0] ||
          i === carretNext[1] ||
          (i > carretNext[0] && i < carretNext[1]))) ||
      (!!carretPrev &&
        (i === carretPrev[0] ||
          i === carretPrev[1] ||
          (i > carretPrev[0] && i < carretPrev[1])))
    );
  });
  if (part) {
    const repl = `<span style="color: red">${num}</span>`;
    debug = replaceAt(debug, m.index + ii, repl, num.length);
    ii += repl.length - num.length;
  }
  return acc + (part ? parseInt(num, 10) : 0);
}, 0);

console.log(result);

fs.writeFileSync("./debug1.html", `<pre>${debug}</pre>`);
