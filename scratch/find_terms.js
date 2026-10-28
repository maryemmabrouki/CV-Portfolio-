const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

const terms = ['geofencing', 'pydantic', 'acid', 'projet solo', 'contribution majeure'];

lines.forEach((line, idx) => {
  const lower = line.toLowerCase();
  for (const t of terms) {
    if (lower.includes(t)) {
      console.log(`Line ${idx + 1} [${t}]: ${line.trim()}`);
    }
  }
});
