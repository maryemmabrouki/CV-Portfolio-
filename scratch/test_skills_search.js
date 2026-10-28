const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

// Parse skill cards and tags from HTML
const cardRegex = /<div class="skill-cat-card" data-cat="([^"]+)">([\s\S]*?)<\/div>\s*(?=(?:<!-- \d+\.|\s*<\/div>\s*<\/div>))/g;
const tagRegex = /<span class="tag">([\s\S]*?)<\/span>/g;

const cards = [];
let cardMatch;
while ((cardMatch = cardRegex.exec(html)) !== null) {
  const cat = cardMatch[1];
  const body = cardMatch[2];
  const tags = [];
  let tagMatch;
  while ((tagMatch = tagRegex.exec(body)) !== null) {
    // Strip inner HTML tags like <small>
    const text = tagMatch[1].replace(/<[^>]+>/g, '').trim();
    tags.push(text);
  }
  cards.push({ cat, tags });
}

console.log(`Detected ${cards.length} cards in skillsGrid:`);
cards.forEach(c => console.log(`- ${c.cat} (${c.tags.length} tags): ${c.tags.slice(0, 3).join(', ')}...`));

function simulateSearch(query) {
  const q = query.trim().toLowerCase();
  let matchCount = 0;
  let visibleCards = [];

  cards.forEach(card => {
    let cardHasMatch = false;
    let matchingTags = [];

    card.tags.forEach(tagText => {
      const lower = tagText.toLowerCase();
      if (q === '' || lower.includes(q)) {
        if (q !== '' && lower.includes(q)) {
          cardHasMatch = true;
          matchCount++;
          matchingTags.push(tagText);
        }
      }
    });

    if (q === '' || cardHasMatch) {
      visibleCards.push({ cat: card.cat, matchingTags });
    }
  });

  return {
    query,
    matchCount,
    visibleCardsCount: visibleCards.length,
    visibleCards
  };
}

// Test cases
console.log('\n=== TEST SUITE: SKILLS SEARCH ENGINE ===');

const testScapy = simulateSearch('Scapy');
console.log(`\n1. Search 'Scapy':`);
console.log(`- Match count: ${testScapy.matchCount}`);
console.log(`- Visible cards: ${testScapy.visibleCardsCount}`);
testScapy.visibleCards.forEach(c => console.log(`  * ${c.cat} -> matched: [${c.matchingTags.join(', ')}]`));
if (testScapy.matchCount !== 1 || testScapy.visibleCards[0].cat !== 'reseaux') {
  throw new Error('Test Scapy failed');
}

const testTcp = simulateSearch('TCP/IP');
console.log(`\n2. Search 'TCP/IP':`);
console.log(`- Match count: ${testTcp.matchCount}`);
console.log(`- Visible cards: ${testTcp.visibleCardsCount}`);
testTcp.visibleCards.forEach(c => console.log(`  * ${c.cat} -> matched: [${c.matchingTags.join(', ')}]`));
if (testTcp.matchCount !== 1 || testTcp.visibleCards[0].cat !== 'reseaux') {
  throw new Error('Test TCP/IP failed');
}

const testRag = simulateSearch('RAG');
console.log(`\n3. Search 'RAG':`);
console.log(`- Match count: ${testRag.matchCount}`);
console.log(`- Visible cards: ${testRag.visibleCardsCount}`);
testRag.visibleCards.forEach(c => console.log(`  * ${c.cat} -> matched: [${c.matchingTags.join(', ')}]`));
if (testRag.matchCount < 1 || testRag.visibleCards[0].cat !== 'genai') {
  throw new Error('Test RAG failed');
}

const testEmpty = simulateSearch('');
console.log(`\n4. Search '' (empty query - reset):`);
console.log(`- Visible cards: ${testEmpty.visibleCardsCount}/10`);
if (testEmpty.visibleCardsCount !== 10) {
  throw new Error('Test empty query failed');
}

const testNone = simulateSearch('NonExistentTermXYZ');
console.log(`\n5. Search 'NonExistentTermXYZ' (empty state):`);
console.log(`- Visible cards: ${testNone.visibleCardsCount} (empty state triggered)`);
if (testNone.visibleCardsCount !== 0) {
  throw new Error('Test empty state failed');
}

console.log('\nALL 5 SEARCH TESTS PASSED SUCCESSFULLY! ✅');

