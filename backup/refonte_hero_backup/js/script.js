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

    // 0.1 Gestion du Thème (Clair par défaut + Bascule Sombre optionnelle)
    (function initTheme() {
      const themeToggle = document.getElementById('themeToggle');
      const storedTheme = localStorage.getItem('mm-theme');

      if (storedTheme) {
        if (storedTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }

      if (themeToggle) {
        themeToggle.addEventListener('click', function () {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            document.documentElement.removeAttribute('data-theme');
          }
          localStorage.setItem('mm-theme', newTheme);
          showToast(newTheme === 'dark' ? 'Mode sombre activé' : 'Mode clair activé');
        });
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

    // 5. Filtrage dynamique des projets & Animation FLIP
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
        if (filter === 'ia') btn.textContent = `IA & ML (${counts.ia})`;
        if (filter === 'fullstack') btn.textContent = `Full-Stack & Logiciel (${counts.fullstack})`;
        if (filter === 'data') btn.textContent = `Data & BI (${counts.data})`;
        if (filter === 'algo') btn.textContent = `Algorithmique (${counts.algo})`;
      });
    }
    updateProjectCounts();

    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('active')) return;

        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filterValue = btn.getAttribute('data-filter');
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Capturer les positions initiales pour animation FLIP
        const firstPositions = new Map();
        projectCards.forEach(card => {
          if (card.style.display !== 'none') {
            firstPositions.set(card, card.getBoundingClientRect());
          }
        });

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          const isMatch = (filterValue === 'all' || categories.includes(filterValue));

          if (isMatch) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });

        // Jouer la transition FLIP fluide sans saut
        if (!prefersReduced) {
          projectCards.forEach(card => {
            if (card.style.display !== 'none' && firstPositions.has(card)) {
              const first = firstPositions.get(card);
              const last = card.getBoundingClientRect();
              const deltaX = first.left - last.left;
              const deltaY = first.top - last.top;

              if (deltaX !== 0 || deltaY !== 0) {
                card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                card.style.transition = 'none';
                requestAnimationFrame(() => {
                  card.style.transition = 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease';
                  card.style.transform = '';
                });
              }
            }
          });
        }
      });
    });

    // 6. Dépliage fluide des détails de projet (Accordéon aria-expanded)
    function toggleProjectDrawer(button) {
      const drawerId = button.getAttribute('aria-controls');
      const drawer = document.getElementById(drawerId);
      if (!drawer) return;

      const isOpen = drawer.classList.toggle('open');
      button.setAttribute('aria-expanded', isOpen);
      const span = button.querySelector('span');
      if (span) {
        span.textContent = isOpen ? "Masquer les détails" : "Explorer le projet";
      }
    }

    // 7. Contrôleur universel de Stepper interactif (« Étape 1 / N »)
    function goToStep(pill, targetIndex) {
      const stepper = pill.closest('.proj-stepper');
      if (!stepper) return;

      const pills = stepper.querySelectorAll('.step-pill');
      const slides = stepper.querySelectorAll('.step-slide');
      const bar = stepper.querySelector('.stepper-bar');
      const prevBtn = stepper.querySelector('.stepper-btn.prev');
      const nextBtn = stepper.querySelector('.stepper-btn.next');
      const counterDisplay = stepper.querySelector('.current-step-display');
      const total = slides.length;

      if (targetIndex < 0 || targetIndex >= total) return;
      stepper.setAttribute('data-current-step', targetIndex);

      pills.forEach((p, idx) => {
        const active = (idx === targetIndex);
        p.classList.toggle('active', active);
        p.setAttribute('aria-selected', active);
      });

      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === targetIndex);
      });

      if (bar && total > 1) {
        const pct = (targetIndex / (total - 1)) * 100;
        bar.style.width = pct + '%';
      }

      if (prevBtn) prevBtn.disabled = (targetIndex === 0);
      if (nextBtn) nextBtn.disabled = (targetIndex === total - 1);
      if (counterDisplay) counterDisplay.textContent = (targetIndex + 1);
    }

    function navigateStep(btn, delta) {
      const stepper = btn.closest('.proj-stepper');
      if (!stepper) return;
      const current = parseInt(stepper.getAttribute('data-current-step') || '0', 10);
      const pills = stepper.querySelectorAll('.step-pill');
      const target = current + delta;
      if (pills[target]) {
        goToStep(pills[target], target);
      }
    }

    // Navigation clavier pour les steppers (Touches Flèche Gauche / Droite)
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const activeEl = document.activeElement;
      const stepper = activeEl ? activeEl.closest('.proj-stepper') : null;
      if (!stepper) return;

      const current = parseInt(stepper.getAttribute('data-current-step') || '0', 10);
      const total = parseInt(stepper.getAttribute('data-total-steps') || '3', 10);

      if (e.key === 'ArrowLeft' && current > 0) {
        e.preventDefault();
        const prevPill = stepper.querySelectorAll('.step-pill')[current - 1];
        if (prevPill) goToStep(prevPill, current - 1);
      } else if (e.key === 'ArrowRight' && current < total - 1) {
        e.preventDefault();
        const nextPill = stepper.querySelectorAll('.step-pill')[current + 1];
        if (nextPill) goToStep(nextPill, current + 1);
      }
    });

    // 7.1 Tilt 3D subtil et spotlight doré qui suit le curseur au survol
    (function initProjectTilt() {
      const cards = document.querySelectorAll('.project-card');
      const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!canHover || prefersReduced) return;

      cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Position du spotlight radial doré
          card.style.setProperty('--mouse-x', x + 'px');
          card.style.setProperty('--mouse-y', y + 'px');

          // Calcul d'inclinaison subtile (±2.5 degrés max)
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -2.2;
          const rotateY = ((x - centerX) / centerX) * 2.2;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
        });

        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
          card.style.setProperty('--mouse-x', '-600px');
          card.style.setProperty('--mouse-y', '-600px');
        });
      });
    })();

    // 7.2 Mini-démo interactive vivante : Table de Hachage C++
    const hashBucketsData = [[], [], [], [], [], [], [], []];

    function insertHashDemoKey() {
      const input = document.getElementById('hashKeyInput');
      if (!input) return;
      const key = input.value.trim();
      if (!key) {
        input.focus();
        return;
      }
      processHashKey(key);
      input.value = '';
    }

    function insertPresetKey(preset) {
      processHashKey(preset);
    }

    function processHashKey(key) {
      let hashVal = 0;
      for (let i = 0; i < key.length; i++) {
        hashVal = (hashVal * 31 + key.charCodeAt(i)) & 0x7fffffff;
      }
      const bucketIdx = hashVal % 8;
      const bucketList = hashBucketsData[bucketIdx];
      const isCollision = bucketList.length > 0;

      bucketList.push(key);

      const cell = document.querySelector(`.hash-bucket-cell[data-bucket="${bucketIdx}"]`);
      const chainEl = document.getElementById(`bchain-${bucketIdx}`);
      const feedback = document.getElementById('hashFeedbackMsg');

      if (chainEl) {
        chainEl.innerHTML = bucketList.map(k => `<strong style="color:var(--violet-strong);">${k}</strong>`).join(' ➔ ');
      }

      if (cell) {
        cell.classList.remove('highlight');
        void cell.offsetWidth; // Reflow pour redéclencher l'animation
        cell.classList.add('highlight');
        setTimeout(() => cell.classList.remove('highlight'), 1200);
      }

      if (feedback) {
        if (isCollision) {
          feedback.innerHTML = `⚠️ <strong style="color:var(--gold-accessible);">Collision sur le Bucket ${bucketIdx}</strong> pour "<em>${key}</em>" : résolue par chaînage séparé (taille maillons : ${bucketList.length}).`;
        } else {
          feedback.innerHTML = `✔ Clé "<em>${key}</em>" insérée avec succès dans le <strong>[Bucket ${bucketIdx}]</strong> (hash: ${hashVal}).`;
        }
      }
    }

    // 7.3 Sélecteur de créneau interactif Rendezy
    function selectRendezySlot(btn, time) {
      const row = btn.closest('.rendezy-slots-row');
      if (!row) return;
      row.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const feedback = document.getElementById('rendezySlotFeedback');
      if (feedback) {
        feedback.textContent = `${time} sélectionné (créneau disponible)`;
      }
    }

    // 7.4 Action uniforme « Code disponible sur demande » orientant vers #contact
    function prepareContactProject(projectName) {
      const subjectInput = document.getElementById('cSubject');
      const msgInput = document.getElementById('cMsg');
      const formCard = document.querySelector('.contact-card');

      if (subjectInput) {
        subjectInput.value = `Demande d'accès au code — ${projectName}`;
      }
      if (msgInput && (!msgInput.value || msgInput.value.trim() === '')) {
        msgInput.value = `Bonjour Maryem,\n\nJe souhaiterais échanger avec vous et consulter le code source et la documentation d'architecture du projet "${projectName}".`;
      }

      showToast(`Demande de code préparée pour "${projectName}"`);
      if (formCard) {
        formCard.style.boxShadow = '0 0 28px rgba(184, 146, 90, 0.45)';
        setTimeout(() => { formCard.style.boxShadow = ''; }, 2200);
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