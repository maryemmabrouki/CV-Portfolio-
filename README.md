# Portfolio — Maryem Mabrouki

Portfolio professionnel de **Maryem Mabrouki**, étudiante en **Master 1 Ingénierie des Systèmes d'Information et Intelligence Artificielle (IS2IA)** à l'**ESISA** (Fès, Maroc).

🔗 **Site en ligne :** [cv-portfolio-meryam.vercel.app](https://cv-portfolio-meryam.vercel.app)

---

## 🎯 Objectif Professionnel
À la recherche d'une opportunité d'**alternance** stimulante en :
- **Développement Logiciel & Ingénierie Full-Stack**
- **Intelligence Artificielle & Data Science** (Computer Vision, NLP, GenAI / RAG)

---

## 📂 Architecture Modulaire du Projet

Le projet est structuré selon une architecture web statique claire, performante et sans dépendance externe lourde :

```text
CV-Portfolio-/
├── index.html                  # Structure HTML5 sémantique et contenu principal
├── css/
│   └── style.css               # Système de design, surfaces glassmorphism et animations
├── js/
│   └── script.js               # Logique vanilla JS (canvas orbital, filtres, recherche, scrollspy)
├── assets/
│   ├── CV_Maryem_MABROUKI.pdf  # Curriculum Vitæ officiel au format PDF (téléchargement direct)
│   └── profile.jpg             # Photo de profil originale optimisée (JPEG)
├── backup/
│   └── index.html.backup       # Copie de sauvegarde de sécurité
└── README.md                   # Documentation du projet et guide de déploiement
```

---

## 💼 Projets Mis en Valeur

1. **MrcLens — Plateforme Touristique & Culturelle Intelligente**
   * *Projet d'équipe de fin d'année (PFA, mars — août 2026)* — React Native / Expo, React.js, Node.js / Express, FastAPI, EfficientNetV2-S (résultats de validation : ~93,5% d'accuracy et F1-macro ~0,93 sur 24 classes patrimoniales), ChromaDB + GPT-4o, MongoDB Atlas, Redis, Socket.IO.
   * *Contributions personnelles :* participation au développement de la billetterie par QR code, aux fonctionnalités temps réel, au pipeline RAG multilingue, à la modélisation UML, à la gestion des événements et types de salles, ainsi qu'aux déploiements sur Vercel et Render.

2. **Kenza — Agent Commercial IA**
   * *Hackathon ESISA × Numeos Technology (septembre 2026 — 55 heures en autonomie)*.
   * Projet individuel d'agent conversationnel autonome multilingue (français, arabe, darija) : orchestration agentique avec LangGraph.js, Azure OpenAI (GPT-4.1 et GPT-5.5), Fastify, Redis / BullMQ, PostgreSQL et Next.js. Outils métier, gestion de mémoire de l'agent et invitation à un entretien d'échange avec les organisateurs.

3. **INCUBOOSTER — Application Desktop de Gestion des Coûts & Pilotage Financier**
   * *Stage de développement logiciel (juillet — octobre 2026)* pour la PME Délices Benkirane.
   * Application desktop sous Java 17, JavaFX, Hibernate/JPA et SQLite : architecture en couches, calcul des coûts de revient et marges, tableau de bord financier, exports PDF/Excel/CSV et suite de 56 tests automatisés sous JUnit 5 (unitaires, intégration, end-to-end).

4. **Techniques de Hachage & Résolution des Collisions en C++**
   * *Projet académique — Algorithmique & Structures de Données* (ESISA, encadrement : M. O. Mekouar et M. Genoun).
   * Fonctions de hachage par division et polynomiales, résolution des collisions par chaînage séparé et adressage ouvert (sondage linéaire), analyse de complexité moyenne O(1) et pire cas O(n), avec démonstration interactive intégrée.

5. **TrustVault — API Bancaire Simulée Sécurisée**
   * Architecture backend en Python (FastAPI) et PostgreSQL pour une application bancaire simulée.
   * Gestion des dépôts, retraits et virements avec transactions atomiques SQL, authentification JWT, hachage des mots de passe avec bcrypt et validation stricte des requêtes via Pydantic.

6. **Analyse BI & Statistiques — 177 Patients Diabète CHU**
   * *Projet académique décisionnel et statistique (avril — juin 2026)* à partir des données anonymisées de 177 patients diabétiques fournies par un CHU sur un mois.
   * Préparation et nettoyage sous Power Query, modélisation DAX, 3 tableaux de bord Power BI et analyses statistiques multivariées sous R (FactoMineR, AFC, K-means, CHA). Projet à visée décisionnelle et statistique, sans diagnostic médical direct.

7. **Rendezy — Plateforme Web de Prise de RDV Multi-services**
   * Plateforme web de réservation et gestion de créneaux multi-services : architecture MVC avec API RESTful en Node.js et Express, persistance NoSQL MongoDB & Mongoose, sécurisation JWT / bcrypt et géolocalisation Leaflet.js.

---

## 🏆 Distinctions & Engagements

- **Présidente du Club de Débat ESISA** (2026 — Présent) : Coordination des ateliers de rhétorique et d'éloquence, formation des membres et organisation de compétitions.
- **2ᵉ place lors de la première phase — Hackathon ESISA Senior Developers** (Juillet 2025) : 2ᵉ place lors de la première phase de sélection (quiz technique et épreuve algorithmique parmi 45 équipes), suivie de l'épreuve de live coding de 3 heures en C++, Python et JavaScript.
- **Membre du Jury — The 2nd Elite High-School Debate (TEHD)** (29–30 novembre 2025, ENCG Fès) : Évaluation officielle de la structure argumentative et de l'art oratoire pour les débats en arabe.
- **ESISA CREATORS** (10 janvier 2026) : Participation à l'événement entrepreneurial et tables rondes avec des innovateurs technologiques.
- **Attestation de Mérite — BDE ESISA** (Juin 2025) : Reconnaissance décernée par le Bureau des Étudiants pour l'engagement actif et l'animation de la vie étudiante.

---

## 🎨 Design, Glassmorphism & Animations

- **Surfaces Frosted Glass (Glassmorphism) :** Les cartes projets, compétences, timeline et formulaires bénéficient d'une finition en verre dépoli translucide avec `backdrop-filter: blur(14px)`, bordures semi-transparentes soignées et ombre portée subtile. Une texture ambiante d'arrière-plan offre une profondeur organique sans assombrir la page.
- **Animations Progressives & Stagger :** Révélation échelonnée des cartes au défilement (`IntersectionObserver`), élévations délicates au survol (`translateY(-4px)`), micro-interactions fluides sur les tags techniques et compteurs animés à l'affichage.
- **Toile Algorithmique & Orbitale :** Fond animé en Canvas 2D dans le Hero mettant en scène des nœuds algorithmiques interconnectés et des courbes orbitales dorées/lavande, mis en pause automatique hors écran pour optimiser les performances.
- **Accessibilité :** Respect strict de `prefers-reduced-motion` et fallback CSS natif `@supports not (backdrop-filter: blur(10px))`.

---

## 🚀 Test Local & Déploiement

### Exécution locale
Aucun gestionnaire de paquets (npm, yarn) n'est nécessaire. Lancez simplement un serveur HTTP statique :

```bash
# Avec Python
python -m http.server 8080

# Ou avec npx serve
npx serve .
```

Puis ouvrez `http://localhost:8080` dans votre navigateur.

### Déploiement sur Vercel
Le projet est immédiatement prêt pour un déploiement continu sur **Vercel** :
- Tous les chemins de fichiers (CSS, JS, PDF, images) sont strictement **relatifs** (`css/style.css`, `js/script.js`, `assets/...`).
- Déploiement statique automatique via GitHub ou la commande `vercel --prod`.

---

## 📬 Contact & Liens Professionnels

- 📄 **CV PDF officiel :** [assets/CV_Maryem_MABROUKI.pdf](assets/CV_Maryem_MABROUKI.pdf)
- 📧 **Email :** [mabrouki.maryem37@gmail.com](mailto:mabrouki.maryem37@gmail.com)
- 💼 **LinkedIn :** [linkedin.com/in/maryem-mabrouki-0058942a5](https://www.linkedin.com/in/maryem-mabrouki-0058942a5/)
- 💻 **GitHub :** [github.com/maryemmabrouki](https://github.com/maryemmabrouki)
- 💬 **WhatsApp :** [+212 642 683 395](https://wa.me/212642683395)
