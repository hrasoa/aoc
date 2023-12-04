const fs = require("fs");

const inputContent = fs.readFileSync("./input", "utf-8");
const linesSplit = inputContent.split("\n");
const linereg = /([0-9]+)/g;
const originalLines = linesSplit.map((line) => {
  const [cardId] = line.split(":")[0].match(linereg);
  const s = line
    .split(":")[1]
    .split("|")
    .map((_) => _.match(linereg));
  const matches = s[0].reduce((cc, w) => {
    return s[1].includes(w) ? cc + 1 : cc;
  }, 0);
  return {
    cardId: parseInt(cardId, 10),
    matches,
  };
});

function getCopies(cardId, matches) {
  return [...Array(matches).keys()]
    .map((key) =>
      originalLines.find((ol) => {
        return ol.cardId === cardId + 1 + key;
      })
    )
    .filter(Boolean);
}

originalLines.forEach((o, i) => {
  originalLines[i].copies = getCopies(o.cardId, o.matches);
});

const lines = [...originalLines];

for (let i = 0; i <= lines.length - 1; i++) {
  const { copies } = lines[i];
  if (copies.length) {
    lines.push(...copies);
  }
}

console.log(lines.length);
