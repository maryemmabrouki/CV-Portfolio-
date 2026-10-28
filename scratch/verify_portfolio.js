const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('=== VERIFICATION DU PORTFOLIO ===\n');

// 1. Vérification des tiroirs de projets (drawers)
const drawerMatches = [...html.matchAll(/class="proj-expand-btn"[^>]*aria-controls="([^"]+)"/g)];
console.log(`Nombre de boutons d'expansion détectés : ${drawerMatches.length}`);
drawerMatches.forEach(m => {
  const targetId = m[1];
  const exists = html.includes(`id="${targetId}"`);
  console.log(`- Drawer ID "${targetId}": ${exists ? 'OK (trouvé)' : 'ERREUR (manquant)'}`);
});

// 2. Vérification des steppers
const stepperMatches = [...html.matchAll(/class="proj-stepper"[^>]*data-total-steps="(\d+)"/g)];
console.log(`\nNombre de steppers détectés : ${stepperMatches.length}`);
stepperMatches.forEach((m, idx) => {
  const total = parseInt(m[1], 10);
  console.log(`- Stepper #${idx + 1}: ${total} étapes configurées`);
});

// 3. Vérification des widgets interactifs
const requiredIds = [
  'hashKeyInput',
  'hashFeedbackMsg',
  'rendezySlotFeedback',
  'skillSearch',
  'skillsGrid',
  'skillEmptyState',
  'searchFeedback',
  'toastBox',
  'contactForm',
  'cName',
  'cEmail',
  'cSubject',
  'cMsg'
];
console.log('\nVérification des IDs interactifs requis par JS :');
requiredIds.forEach(id => {
  const exists = html.includes(`id="${id}"`);
  console.log(`- #${id}: ${exists ? 'OK' : 'MANQUANT'}`);
});

// 4. Recherche de termes suspects / interdits / hyperboliques
const suspiciousTerms = [
  { term: 'sans hallucination', reason: 'Affirmation absolue sur le RAG' },
  { term: 'Zero-Trust', reason: 'Terme absolu de sécurité sans justification' },
  { term: 'zéro risque', reason: 'Formulation absolue' },
  { term: 'éliminant tout risque', reason: 'Formulation absolue' },
  { term: '56/56 VALIDÉS', reason: 'Statut de test 100% non confirmé' },
  { term: '100% des tests', reason: 'Statut de test absolu non confirmé' },
  { term: 'résolution d\'anomalies web', reason: 'Incohérence pour le projet Java desktop' },
  { term: 'Incuboster', reason: 'Faute de frappe historique' },
  { term: 'Top 10', reason: 'Non confirmé pour le Hackathon Kenza' },
  { term: 'remporté un prix', reason: 'Non confirmé pour le Hackathon Kenza' },
  { term: 'Firebase', reason: 'Technologie non justifiée' },
  { term: 'Supabase', reason: 'Technologie non justifiée' }
];

console.log('\nVérification des formulations sensibles / excessives :');
let suspiciousCount = 0;
suspiciousTerms.forEach(item => {
  const regex = new RegExp(item.term, 'i');
  if (regex.test(html)) {
    console.log(`⚠️ ALERTE : Le terme "${item.term}" (${item.reason}) a été trouvé !`);
    suspiciousCount++;
  } else {
    console.log(`✓ "${item.term}" : Absent (conforme)`);
  }
});

// 5. Vérification des 7 projets
const projectCards = [...html.matchAll(/id="(proj-[^"]+)"/g)];
console.log(`\nProjets identifiés (${projectCards.length}/7) :`);
projectCards.forEach(p => console.log(`- ${p[1]}`));

// 6. Vérification des catégories de compétences
const skillCats = [...html.matchAll(/class="skill-cat-card" data-cat="([^"]+)"/g)];
console.log(`\nCatégories de compétences identifiées (${skillCats.length}/10) :`);
skillCats.forEach(c => console.log(`- ${c[1]}`));

console.log('\n=== FIN DU RAPPORT DE VERIFICATION ===');
