const fs = require("fs");

const inputContent = fs.readFileSync("./input2", "utf-8");
const split = inputContent.split("\n");
const rowLength = split[0].length;
const rowTotal = split.length;
const input = inputContent;

const symbols = /(\*)/gm;

const eoflines = Array.from(input.matchAll(/\n/gm)).map((m) => m.index);

const symbolsIndexes = Array.from(input.matchAll(symbols)).map((m) => {
  return m.index - eoflines.filter((i) => i <= m.index).length;
});

function getCarret(numIndex, numLength) {
  const rowIndex = Math.floor(numIndex / rowLength);
  const rowStart = rowIndex * rowLength;
  const rowEnd = rowStart + rowLength - 1;
  return rowIndex >= 0 && rowIndex < rowTotal
    ? [Math.max(rowStart, numIndex - 1), Math.min(numIndex + numLength, rowEnd)]
    : null;
}

const gears = {};

Array.from(input.matchAll(/[0-9]+/gm)).reduce((acc, m) => {
  const num = m[0];
  const index = m.index - eoflines.filter((i) => i <= m.index).length;

  const numLength = num.length;
  const carret = getCarret(index, numLength);
  const carretPrev = getCarret(index - rowLength, numLength);
  const carretNext = getCarret(index + rowLength, numLength);
  const part = symbolsIndexes.some((i) => {
    const isPart =
      i === carret[0] ||
      i === carret[1] ||
      (!!carretNext &&
        (i === carretNext[0] ||
          i === carretNext[1] ||
          (i > carretNext[0] && i < carretNext[1]))) ||
      (!!carretPrev &&
        (i === carretPrev[0] ||
          i === carretPrev[1] ||
          (i > carretPrev[0] && i < carretPrev[1])));
    if (isPart) {
      gears[i] = gears[i] || [];
      gears[i].push(num);
    }
    return isPart;
  });
  return acc + (part ? parseInt(num, 10) : 0);
}, 0);

const result = Object.values(gears).reduce((acc, values) => {
  if (values.length === 2) {
    return acc + parseInt(values[0]) * parseInt(values[1]);
  }
  return acc;
}, 0);

console.log(result);
