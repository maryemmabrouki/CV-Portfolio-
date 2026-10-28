import re

print("=== 1. Updating index.html ===")
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# A. Header brand-mark
old_header_brand = '<div class="brand-mark" aria-hidden="true">MM</div>'
new_header_brand = """<div class="brand-mark" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="7 8 3 12 7 16" />
            <polyline points="17 8 21 12 17 16" />
            <line x1="14" y1="4" x2="10" y2="20" />
            <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
          </svg>
        </div>"""
if old_header_brand in html:
    html = html.replace(old_header_brand, new_header_brand)

# B. Footer brand-mark
old_footer_brand = '<div class="brand-mark" style="width:32px; height:32px; font-size:0.85rem;" aria-hidden="true">MM</div>'
new_footer_brand = """<div class="brand-mark" style="width:32px; height:32px;" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="7 8 3 12 7 16" />
              <polyline points="17 8 21 12 17 16" />
              <line x1="14" y1="4" x2="10" y2="20" />
              <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
            </svg>
          </div>"""
if old_footer_brand in html:
    html = html.replace(old_footer_brand, new_footer_brand)

# C. Harmonize tags in reseaux card
old_tag = """              <span class="tag">Capture et analyse de trafic réseau <small style="opacity:0.75">(projet
                  SharkWeb)</small></span>"""
new_tags = """              <span class="tag">Analyse de trafic réseau</span>
              <span class="tag">Projet SharkWeb</span>"""
assert old_tag in html, "old_tag not found in index.html"
html = html.replace(old_tag, new_tags)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("index.html updated successfully!")


print("=== 2. Updating js/script.js ===")
with open('js/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# A. Fix nav-pill-indicator logic
old_pill_logic = """        if (activeAnchor) {
          movePillTo(activeAnchor);
        } else if (scrollY < 120 && navAnchors.length > 0) {
          navAnchors[0].classList.add('active');
          movePillTo(navAnchors[0]);
        } else if (pillIndicator) {
          pillIndicator.style.opacity = '0';
        }"""

new_pill_logic = """        if (activeAnchor) {
          movePillTo(activeAnchor);
        } else {
          navAnchors.forEach(a => a.classList.remove('active'));
          if (pillIndicator) {
            pillIndicator.style.opacity = '0';
          }
        }"""
assert old_pill_logic in js, "old_pill_logic not found in js/script.js"
js = js.replace(old_pill_logic, new_pill_logic)

# B. Responsive search placeholder
old_search_logic = """    // 8. Recherche instantanée dans les compétences avec état vide
    const skillSearchInput = document.getElementById('skillSearch');
    const skillCards = document.querySelectorAll('.skill-cat-card');
    const searchFeedback = document.getElementById('searchFeedback');
    const skillEmptyState = document.getElementById('skillEmptyState');

    if (skillSearchInput) {"""

new_search_logic = """    // 8. Recherche instantanée dans les compétences avec état vide & placeholder adaptatif
    const skillSearchInput = document.getElementById('skillSearch');
    const skillCards = document.querySelectorAll('.skill-cat-card');
    const searchFeedback = document.getElementById('searchFeedback');
    const skillEmptyState = document.getElementById('skillEmptyState');

    if (skillSearchInput) {
      function updateSearchPlaceholder() {
        if (window.innerWidth <= 600) {
          skillSearchInput.placeholder = "Rechercher (ex. Python, Scapy, RAG)...";
        } else {
          skillSearchInput.placeholder = "Rechercher une technologie (ex: Python, Docker, C++, RAG, Scapy, TCP/IP, React)...";
        }
      }
      updateSearchPlaceholder();
      window.addEventListener('resize', updateSearchPlaceholder, { passive: true });"""
assert old_search_logic in js, "old_search_logic not found in js/script.js"
js = js.replace(old_search_logic, new_search_logic)

with open('js/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("js/script.js updated successfully!")


print("=== 3. Updating css/style.css ===")
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# A. Accelerate heroEntrance delays
old_hero_anim = """    /* Animation d'apparition séquentielle dans le Hero */
    .hero-copy>* {
      opacity: 0;
      transform: translateY(20px);
      animation: heroEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .hero-copy>*:nth-child(1) {
      animation-delay: 0.1s;
    }

    .hero-copy>*:nth-child(2) {
      animation-delay: 0.22s;
    }

    .hero-copy>*:nth-child(3) {
      animation-delay: 0.34s;
    }

    .hero-copy>*:nth-child(4) {
      animation-delay: 0.46s;
    }

    .hero-copy>*:nth-child(5) {
      animation-delay: 0.58s;
    }

    .hero-copy>*:nth-child(6) {
      animation-delay: 0.7s;
    }"""

new_hero_anim = """    /* Animation d'apparition séquentielle dans le Hero (accélérée et fluide) */
    .hero-copy>* {
      opacity: 0;
      transform: translateY(18px);
      animation: heroEntrance 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .hero-copy>*:nth-child(1) {
      animation-delay: 0.06s;
    }

    .hero-copy>*:nth-child(2) {
      animation-delay: 0.14s;
    }

    .hero-copy>*:nth-child(3) {
      animation-delay: 0.22s;
    }

    .hero-copy>*:nth-child(4) {
      animation-delay: 0.30s;
    }

    .hero-copy>*:nth-child(5) {
      animation-delay: 0.38s;
    }

    .hero-copy>*:nth-child(6) {
      animation-delay: 0.45s;
    }"""
assert old_hero_anim in css, "old_hero_anim not found in css/style.css"
css = css.replace(old_hero_anim, new_hero_anim)

# B. Brand-mark SVG support styling
brand_svg_target = """.brand:hover .brand-mark {
      transform: scale(1.05);
      box-shadow: 0 3px 8px rgba(184, 146, 90, 0.3);
    }"""

brand_svg_repl = """.brand:hover .brand-mark {
      transform: scale(1.05);
      box-shadow: 0 3px 8px rgba(184, 146, 90, 0.3);
    }

    .brand-mark svg {
      display: block;
      pointer-events: none;
      transition: transform 0.2s ease;
    }

    .brand:hover .brand-mark svg {
      transform: scale(1.06);
    }"""
assert brand_svg_target in css, "brand_svg_target not found in css/style.css"
css = css.replace(brand_svg_target, brand_svg_repl)

# C. Mobile horizontal scrolling projects filter bar
mq_target = """    @media (max-width: 520px) {
      .site-nav .wrap {
        padding-left: 0.85rem;
        padding-right: 0.85rem;
      }"""

mq_repl = """    @media (max-width: 520px) {
      .site-nav .wrap {
        padding-left: 0.85rem;
        padding-right: 0.85rem;
      }

      /* Rangée horizontale défilante des filtres projets sur mobile */
      .projects-filter-bar {
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding-bottom: 0.5rem;
        margin-bottom: 1.6rem;
        gap: 0.5rem;
        width: 100%;
      }

      .projects-filter-bar::-webkit-scrollbar {
        display: none;
      }

      .projects-filter-bar .filter-btn {
        flex-shrink: 0;
        white-space: nowrap;
      }"""
assert mq_target in css, "mq_target not found in css/style.css"
css = css.replace(mq_target, mq_repl)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("css/style.css updated successfully!")

print("\nALL PHASE 4 MODIFICATIONS APPLIED CLEANLY!")
