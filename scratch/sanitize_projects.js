const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. MrcLens updates
html = html.replace(
  '<span class="proj-role-badge team">Projet d\'équipe (PFA) · Contribution majeure</span>',
  '<span class="proj-role-badge team">Projet d\'équipe · PFA ESISA</span>'
);
html = html.replace(
  '<span class="flow-node-sub">Capture &amp; Geofencing</span>',
  '<span class="flow-node-sub">Capture &amp; Géolocalisation</span>'
);
html = html.replace(
  'onclick="toggleProjectDrawer(this)">\n              <span>Explorer le projet</span>\n              <svg class="expand-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n                <polyline points="6 9 12 15 18 9"></polyline>\n              </svg>\n            </button>\n\n            <!-- Tiroir de détails structuré en 3 blocs fixes + stepper interactif -->\n            <div class="proj-drawer-wrapper" id="details-mrclens">',
  'data-label-open="Masquer les détails" data-label-closed="Explorer le projet" onclick="toggleProjectDrawer(this)">\n              <span>Explorer le projet</span>\n              <svg class="expand-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n                <polyline points="6 9 12 15 18 9"></polyline>\n              </svg>\n            </button>\n\n            <!-- Tiroir de détails structuré en 3 blocs fixes + stepper interactif -->\n            <div class="proj-drawer-wrapper" id="details-mrclens">'
);
html = html.replace(
  '<li>Implémentation de la <strong>billetterie à QR codes dynamiques horodatés</strong> et calcul de <strong>Geofencing</strong> pour la géolocalisation.</li>',
  '<li>Implémentation de la <strong>billetterie à QR codes dynamiques horodatés</strong> et calcul de <strong>géolocalisation GPS</strong> pour le repérage touristique.</li>'
);
html = html.replace(
  '<li>Détection de proximité par calcul de Geofencing GPS pour guider le touriste.</li>',
  '<li>Détection de proximité et géolocalisation GPS pour guider le touriste.</li>'
);

// 2. Kenza updates
html = html.replace(
  '<span class="proj-role-badge solo">Projet solo · Hackathon 55h</span>',
  '<span class="proj-role-badge solo">Projet Hackathon 55h</span>'
);
html = html.replace(
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-kenza" onclick="toggleProjectDrawer(this)">',
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-kenza" data-label-open="Masquer les détails" data-label-closed="Explorer le projet" onclick="toggleProjectDrawer(this)">'
);
html = html.replace(
  '<div class="step-mini-tags"><span class="mini-tag">Next.js</span><span class="mini-tag">PostgreSQL</span><span class="mini-tag">ACID</span></div>',
  '<div class="step-mini-tags"><span class="mini-tag">Next.js</span><span class="mini-tag">PostgreSQL</span><span class="mini-tag">Stocks</span></div>'
);

// 3. Incubooster updates
html = html.replace(
  '<span class="proj-role-badge industrial">Projet solo · Industriel</span>',
  '<span class="proj-role-badge industrial">Projet · Logiciel Industriel</span>'
);
html = html.replace(
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-incubooster" onclick="toggleProjectDrawer(this)">',
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-incubooster" data-label-open="Masquer les détails" data-label-closed="Explorer le projet" onclick="toggleProjectDrawer(this)">'
);
html = html.replace(
  '<li>Base embarquée SQLite locale avec transactions ACID fiables.</li>',
  '<li>Base embarquée SQLite locale avec transactions relationnelles fiables.</li>'
);

// 4. Hachage C++ updates
html = html.replace(
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-hachage" onclick="toggleProjectDrawer(this)">',
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-hachage" data-label-open="Masquer les détails" data-label-closed="Explorer le projet" onclick="toggleProjectDrawer(this)">'
);

// 5. TrustVault updates
html = html.replace(
  '<span class="proj-role-badge solo">Projet solo · Sécurité</span>',
  '<span class="proj-role-badge">Projet · Architecture Sécurisée</span>'
);
html = html.replace(
  '<span class="proj-cat-badge">Backend &amp; Intégrité ACID</span>',
  '<span class="proj-cat-badge">Backend &amp; API REST Sécurisée</span>'
);
html = html.replace(
  'Plateforme bancaire simulant des transactions financières réelles (dépôts, retraits, virements) avec intégrité transactionnelle stricte ACID, authentification JWT et validation des schémas Pydantic.',
  'Plateforme bancaire simulant des transactions financières réelles (dépôts, retraits, virements) avec gestion rigoureuse des transactions, authentification JWT et validation stricte des requêtes.'
);
html = html.replace(
  '<span>Pydantic v2</span>',
  '<span>Validation API</span>'
);
html = html.replace(
  '<span>PostgreSQL ACID</span>',
  '<span>PostgreSQL</span>'
);
html = html.replace(
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-trustvault" onclick="toggleProjectDrawer(this)">',
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-trustvault" data-label-open="Masquer les détails" data-label-closed="Explorer le projet" onclick="toggleProjectDrawer(this)">'
);
html = html.replace(
  '<li>Validation des schémas Pydantic, authentification JWT et hashage Bcrypt des mots de passe.</li>',
  '<li>Validation stricte des requêtes entrantes, authentification JWT et hashage Bcrypt des mots de passe.</li>'
);
html = html.replace(
  '<span class="tag">Pydantic v2</span>',
  '<span class="tag">API REST</span>'
);
html = html.replace(
  '<span class="tag">Transactions ACID</span>',
  '<span class="tag">Transactions Sécurisées</span>'
);
html = html.replace(
  '<button class="step-pill" onclick="goToStep(this, 1)" role="tab" aria-selected="false"><span class="step-num">STEP 02</span> Transactions ACID</button>',
  '<button class="step-pill" onclick="goToStep(this, 1)" role="tab" aria-selected="false"><span class="step-num">STEP 02</span> Transactions Sécurisées</button>'
);
html = html.replace(
  '<div class="step-mini-tags"><span class="mini-tag">PostgreSQL</span><span class="mini-tag">ACID</span></div>',
  '<div class="step-mini-tags"><span class="mini-tag">PostgreSQL</span><span class="mini-tag">Transactions</span></div>'
);
html = html.replace(
  '<div class="step-mini-tags"><span class="mini-tag">JWT</span><span class="mini-tag">Bcrypt</span><span class="mini-tag">Pydantic</span></div>',
  '<div class="step-mini-tags"><span class="mini-tag">FastAPI</span><span class="mini-tag">JWT</span><span class="mini-tag">Bcrypt</span></div>'
);
html = html.replace(
  '<h4 class="step-slide-title">Authentification Sécurisée &amp; Validation Pydantic</h4>',
  '<h4 class="step-slide-title">Authentification Sécurisée &amp; Validation des Requêtes</h4>'
);
html = html.replace(
  '<li>Validation rigoureuse des montants et formats via des schémas Pydantic typés.</li>',
  '<li>Validation rigoureuse des montants et formats des transactions financières.</li>'
);

// 6. BI Diabète updates
html = html.replace(
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-bi" onclick="toggleProjectDrawer(this)">',
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-bi" data-label-open="Masquer les détails" data-label-closed="Explorer le projet" onclick="toggleProjectDrawer(this)">'
);

// 7. Rendezy updates
html = html.replace(
  '<span class="proj-role-badge solo">Projet solo · Plateforme Web</span>',
  '<span class="proj-role-badge">Projet · Plateforme Web</span>'
);
html = html.replace(
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-rendezy" onclick="toggleProjectDrawer(this)">',
  '<button class="proj-expand-btn" aria-expanded="false" aria-controls="details-rendezy" data-label-open="Masquer les détails" data-label-closed="Explorer le projet" onclick="toggleProjectDrawer(this)">'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Sanitization of projects complete!');
