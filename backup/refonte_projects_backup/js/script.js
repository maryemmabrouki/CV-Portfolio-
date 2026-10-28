// 0. Toile d'arrière-plan algorithmique & courbes orbitales
    (function initHeroBackground() {
      const canvas = document.getElementById('heroBgCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const hero = document.getElementById('heroSection');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let width = 0;
      let height = 0;
      let dpr = Math.min(window.devicePixelRatio || 1, 2);
      let animationFrameId = null;
      let isVisible = true;
      let time = 0;

      // Configuration des nœuds
      const nodeCount = 32;
      const nodes = [];
      const goldIndices = [3, 8, 14, 21, 27]; // Nœuds d'ancrage or

      function resize() {
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.scale(dpr, dpr);

        if (nodes.length === 0) {
          for (let i = 0; i < nodeCount; i++) {
            nodes.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.22,
              vy: (Math.random() - 0.5) * 0.22,
              baseRadius: goldIndices.includes(i) ? 2.2 : 1.2,
              isGold: goldIndices.includes(i),
              phase: Math.random() * Math.PI * 2
            });
          }
        } else {
          nodes.forEach(n => {
            if (n.x > width) n.x = Math.random() * width;
            if (n.y > height) n.y = Math.random() * height;
          });
        }

        if (prefersReduced) {
          drawFrame(0);
        }
      }

      window.addEventListener('resize', resize);
      resize();

      // Courbes orbitales élégantes & discrètes
      function drawOrbitalCurves(t) {
        ctx.save();
        const centerX = width * 0.72;
        const centerY = height * 0.42;

        // Ellipse 1 (Or doux très discret)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(0.35 + t * 0.00012);
        ctx.beginPath();
        ctx.ellipse(0, 0, width * 0.28, height * 0.45, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(184, 146, 90, 0.09)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 10]);
        ctx.stroke();
        ctx.restore();

        // Ellipse 2 (Lavande subtil)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(-0.5 + t * 0.00008);
        ctx.beginPath();
        ctx.ellipse(0, 0, width * 0.22, height * 0.32, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201, 184, 218, 0.07)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 8]);
        ctx.stroke();
        ctx.restore();

        // Onde mathématique harmonique au bas de la section
        ctx.beginPath();
        const waveY = height * 0.94;
        ctx.moveTo(0, waveY);
        for (let x = 0; x <= width; x += 30) {
          const y = waveY + Math.sin(x * 0.004 + t * 0.0006) * 12 + Math.cos(x * 0.002 + t * 0.0004) * 8;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(201, 184, 218, 0.05)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([]);
        ctx.stroke();

        ctx.restore();
      }

      function drawFrame(timestamp) {
        ctx.clearRect(0, 0, width, height);
        time = timestamp;

        // 1. Dessin des courbes orbitales mathématiques
        drawOrbitalCurves(time);

        // 2. Mise à jour et dessin des connexions de réseau
        const maxDist = 125;
        for (let i = 0; i < nodes.length; i++) {
          const n1 = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.16;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              if (n1.isGold && n2.isGold) {
                ctx.strokeStyle = 'rgba(184, 146, 90, ' + (alpha * 1.2) + ')';
              } else {
                ctx.strokeStyle = 'rgba(201, 184, 218, ' + alpha + ')';
              }
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }

        // 3. Dessin des nœuds
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (!prefersReduced) {
            n.x += n.vx;
            n.y += n.vy;

            // Rebond doux sur les bords
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;
          }

          let r = n.baseRadius;
          if (n.isGold && !prefersReduced) {
            r += Math.sin(time * 0.002 + n.phase) * 0.6;
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, Math.max(r, 0.5), 0, Math.PI * 2);
          if (n.isGold) {
            ctx.fillStyle = 'rgba(232, 217, 192, 0.85)';
            ctx.shadowColor = 'rgba(184, 146, 90, 0.4)';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = 'rgba(237, 231, 243, 0.55)';
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      function loop(timestamp) {
        if (!isVisible) return;
        drawFrame(timestamp);
        animationFrameId = requestAnimationFrame(loop);
      }

      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(loop);

        // Mettre en pause hors écran pour économiser batterie & CPU
        if ('IntersectionObserver' in window && hero) {
          const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                if (!isVisible) {
                  isVisible = true;
                  animationFrameId = requestAnimationFrame(loop);
                }
              } else {
                isVisible = false;
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
              }
            });
          }, { threshold: 0.05 });
          observer.observe(hero);
        }
      } else {
        drawFrame(0);
      }
    })();

    // 1. Gestion du menu mobile
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      });

      // Fermeture lors du clic sur un lien
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Fermeture du menu si clic en dehors
    document.addEventListener('click', function (e) {
      if (navLinks && navLinks.classList.contains('open')) {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // 2. Scrollspy & Bouton Flottant
    const sections = document.querySelectorAll('section[id], header[id="top"]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const floatingTopBtn = document.getElementById('floatingTopBtn');

    window.addEventListener('scroll', function () {
      const scrollY = window.pageYOffset;
      const siteNav = document.getElementById('siteNav');

      // Effet d'ombre sur la navbar
      if (scrollY > 40) {
        siteNav.classList.add('scrolled');
      } else {
        siteNav.classList.remove('scrolled');
      }

      // Bouton flottant retour en haut
      if (scrollY > 350) {
        floatingTopBtn.classList.add('visible');
      } else {
        floatingTopBtn.classList.remove('visible');
      }

      // Scrollspy
      let currentSectionId = '';
      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navAnchors.forEach(function (a) {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + currentSectionId) {
          a.classList.add('active');
        }
      });
    });

    // 3. Scroll Reveal avec IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('in-view'));
    }

    // 4. Animation des chiffres clés (Count-Up fluide)
    let metricsAnimated = false;
    const metricsStrip = document.getElementById('metricsStrip');
    if (metricsStrip && 'IntersectionObserver' in window) {
      const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !metricsAnimated) {
            metricsAnimated = true;
            animateNumbers();
          }
        });
      }, { threshold: 0.3 });
      metricObserver.observe(metricsStrip);
    }

    function animateNumbers() {
      const numbers = document.querySelectorAll('.metric-num[data-target]');
      numbers.forEach(numEl => {
        const target = parseFloat(numEl.getAttribute('data-target'));
        const suffix = numEl.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing easeOutQuart
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          const currentVal = target * easeProgress;

          if (isDecimal) {
            numEl.textContent = currentVal.toFixed(1).replace('.', ',') + suffix;
          } else {
            numEl.textContent = Math.floor(currentVal) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            if (isDecimal) {
              numEl.textContent = target.toFixed(1).replace('.', ',') + suffix;
            } else {
              numEl.textContent = target + suffix;
            }
          }
        }

        requestAnimationFrame(updateCount);
      });
    }

    // 5. Filtrage dynamique des projets & Calcul des compteurs
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function updateProjectCounts() {
      let counts = {
        all: projectCards.length,
        ia: 0,
        fullstack: 0,
        data: 0,
        algo: 0
      };

      projectCards.forEach(card => {
        const cats = card.getAttribute('data-category') || '';
        if (cats.includes('ia')) counts.ia++;
        if (cats.includes('fullstack')) counts.fullstack++;
        if (cats.includes('data')) counts.data++;
        if (cats.includes('algo')) counts.algo++;
      });

      filterButtons.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') btn.textContent = `Tous les projets (${counts.all})`;
        if (filter === 'ia') btn.textContent = `IA & Vision (${counts.ia})`;
        if (filter === 'fullstack') btn.textContent = `Full-Stack & Logiciel (${counts.fullstack})`;
        if (filter === 'data') btn.textContent = `Data & BI (${counts.data})`;
        if (filter === 'algo') btn.textContent = `Algorithmique (${counts.algo})`;
      });
    }
    updateProjectCounts();

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(function (card) {
          const categories = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 200);
          }
        });
      });
    });

    // 6. Accordéon interactif pour les détails d'un projet
    function toggleProjectExtra(button) {
      const panel = button.nextElementSibling;
      if (panel && panel.classList.contains('project-extra-panel')) {
        const isOpen = panel.classList.toggle('open');
        button.classList.toggle('open', isOpen);
        const span = button.querySelector('span');
        if (span) {
          span.textContent = isOpen ? "Masquer les spécifications techniques" : "Afficher les spécifications d'orchestration";
        }
      }
    }

    // 7. Pipeline interactif MrcLens
    const pipelineData = [
      "<strong>Étape 01 — Capture & Expérience Mobile :</strong> Application développée en React Native via Expo pour la prise de vue fluide des monuments et éléments artisanaux, avec géolocalisation instantanée des sites patrimoniaux.",
      "<strong>Étape 02 — Modèle de Vision par Ordinateur :</strong> Modèle EfficientNetV2-S entraîné sur 24 classes patrimoniales marocaines avec 93,5% d'accuracy de validation (F1 macro 0,93), converti et exécuté sous ONNX Runtime pour une inférence ultra-rapide.",
      "<strong>Étape 03 — Pipeline RAG & Assistant Culturel :</strong> Assistant multilingue exploitant ChromaDB et LangChain pour injecter l'histoire et les détails architecturaux dans le contexte du modèle GPT-4o, garantissant des réponses culturelles vérifiées sans hallucination.",
      "<strong>Étape 04 — Microservices & Billetterie Sécurisée :</strong> Backend FastAPI robuste, billetterie à QR codes dynamiques anti-fraude, calcul de Geofencing et déploiement continu conteneurisé sur Vercel et Render."
    ];

    function switchPipelineStep(index) {
      const buttons = document.querySelectorAll('.pipeline-step-btn');
      const contentBox = document.getElementById('pipelineContent');

      buttons.forEach((btn, idx) => {
        if (idx === index) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      if (contentBox && pipelineData[index]) {
        contentBox.innerHTML = pipelineData[index];
      }
    }

    // 8. Recherche instantanée dans les compétences avec état vide
    const skillSearchInput = document.getElementById('skillSearch');
    const skillCards = document.querySelectorAll('.skill-cat-card');
    const searchFeedback = document.getElementById('searchFeedback');
    const skillEmptyState = document.getElementById('skillEmptyState');

    if (skillSearchInput) {
      skillSearchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        let matchCount = 0;
        let visibleCardsCount = 0;

        skillCards.forEach(function (card) {
          const tags = card.querySelectorAll('.tag');
          let cardHasMatch = false;

          tags.forEach(function (tag) {
            const tagText = tag.textContent.toLowerCase();
            if (query === '' || tagText.includes(query)) {
              tag.style.display = 'inline-flex';
              if (query !== '' && tagText.includes(query)) {
                tag.style.backgroundColor = '#E8D9C0';
                tag.style.borderColor = '#B8925A';
                cardHasMatch = true;
                matchCount++;
              } else {
                tag.style.backgroundColor = '';
                tag.style.borderColor = '';
              }
            } else {
              tag.style.display = 'none';
            }
          });

          if (query === '' || cardHasMatch) {
            card.style.display = 'block';
            visibleCardsCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (skillEmptyState) {
          if (visibleCardsCount === 0 && query !== '') {
            skillEmptyState.style.display = 'block';
          } else {
            skillEmptyState.style.display = 'none';
          }
        }

        if (searchFeedback) {
          if (query === '') {
            searchFeedback.textContent = '';
          } else {
            searchFeedback.textContent = matchCount + ' compétence(s) trouvée(s)';
          }
        }
      });
    }

    // 9. Action de copie dans le presse-papier avec Toast
    function copyText(text, label) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          showToast(label);
        }).catch(function () {
          fallbackCopyText(text, label);
        });
      } else {
        fallbackCopyText(text, label);
      }
    }

    function fallbackCopyText(text, label) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showToast(label);
      } catch (err) {
        showToast('Erreur de copie');
      }
      document.body.removeChild(textArea);
    }

    function showToast(msg) {
      const toast = document.getElementById('toastBox');
      const toastMsg = document.getElementById('toastMsg');
      if (toast && toastMsg) {
        toastMsg.textContent = msg;
        toast.classList.add('show');
        setTimeout(function () {
          toast.classList.remove('show');
        }, 2800);
      }
    }

    // 10. Gestion du formulaire de contact
    function handleFormSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('cName').value.trim();
      const email = document.getElementById('cEmail').value.trim();
      const subjectInput = document.getElementById('cSubject').value.trim();
      const msg = document.getElementById('cMsg').value.trim();

      const subject = encodeURIComponent((subjectInput || 'Opportunité Alternance / Contact') + ' — ' + name);
      const body = encodeURIComponent(msg + '\n\n—\nNom / Organisation : ' + name + '\nEmail de réponse : ' + email);

      showToast('Ouverture de votre client de messagerie...');
      setTimeout(function () {
        window.location.href = 'mailto:mabrouki.maryem37@gmail.com?subject=' + subject + '&body=' + body;
      }, 500);

      return false;
    }