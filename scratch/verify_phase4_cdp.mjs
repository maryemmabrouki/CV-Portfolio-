import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;
const FILE_URL = "file:///c:/Users/pc/OneDrive/Desktop/CV-Portfolio-/index.html";

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getWsUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const data = await res.json();
      if (data.webSocketDebuggerUrl) return data.webSocketDebuggerUrl;
    } catch (e) {
      await wait(300);
    }
  }
  throw new Error('Chrome remote debugging not available');
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.pending = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception.description);
    }
    return res.result.value;
  }
}

async function run() {
  const tmpDir = `C:\\Users\\pc\\OneDrive\\Desktop\\CV-Portfolio-\\scratch\\chrome_test_${Date.now()}`;
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${tmpDir}`,
    FILE_URL
  ]);

  try {
    const wsUrl = await getWsUrl();
    // Get target page ws url
    const targetsRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const targets = await targetsRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('DOM.enable');
    await wait(800); // wait for initial scripts & IntersectionObserver

    console.log('=== TEST 1: BRAND MARK SVG (HEADER & FOOTER) ===');
    const brandMarkCheck = await client.eval(`
      (() => {
        const headerSvg = document.querySelector('header .brand-mark svg');
        const footerSvg = document.querySelector('footer .brand-mark svg');
        const headerText = document.querySelector('header .brand-mark').innerText.trim();
        const footerText = document.querySelector('footer .brand-mark').innerText.trim();
        return {
          headerSvgExists: !!headerSvg,
          headerSvgViewBox: headerSvg ? headerSvg.getAttribute('viewBox') : null,
          headerSvgChildren: headerSvg ? headerSvg.children.length : 0,
          headerText: headerText,
          footerSvgExists: !!footerSvg,
          footerSvgViewBox: footerSvg ? footerSvg.getAttribute('viewBox') : null,
          footerText: footerText
        };
      })()
    `);
    console.log('Brand mark check:', brandMarkCheck);

    console.log('\n=== SET VIEWPORT 1440x900 ===');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await client.eval(`window.dispatchEvent(new Event('resize'));`);
    await wait(300);

    console.log('\n=== TEST 2: ACTIVE NAV INDICATOR (SCROLLSPY) AT HERO TOP ===');
    const indicatorAtTop = await client.eval(`
      (() => {
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('scroll'));
        const indicator = document.querySelector('.nav-pill-indicator');
        const activeNav = document.querySelectorAll('.nav-menu a.active');
        const opacity = window.getComputedStyle(indicator).opacity;
        const scrollY = window.scrollY;
        return {
          scrollY: scrollY,
          indicatorOpacity: opacity,
          activeNavCount: activeNav.length,
          activeNavHrefs: Array.from(activeNav).map(a => a.getAttribute('href'))
        };
      })()
    `);
    console.log('Indicator at Hero top:', indicatorAtTop);

    console.log('\n=== TEST 2b: ACTIVE NAV INDICATOR AFTER SCROLL TO #profil ===');
    const indicatorAfterScroll = await client.eval(`
      (async () => {
        const profilSection = document.getElementById('profil');
        profilSection.scrollIntoView();
        window.dispatchEvent(new Event('scroll'));
        await new Promise(r => setTimeout(r, 200));
        const indicator = document.querySelector('.nav-pill-indicator');
        const activeNav = document.querySelectorAll('.nav-menu a.active');
        const opacity = window.getComputedStyle(indicator).opacity;
        return {
          scrollY: window.scrollY,
          indicatorOpacity: opacity,
          activeNavCount: activeNav.length,
          activeNavHrefs: Array.from(activeNav).map(a => a.getAttribute('href')),
          pillLeft: indicator.style.left,
          pillWidth: indicator.style.width
        };
      })()
    `);
    console.log('Indicator at #profil:', indicatorAfterScroll);

    console.log('\n=== TEST 3: DESKTOP SEARCH PLACEHOLDER (1440px) ===');
    const searchDesktop = await client.eval(`
      (() => {
        const searchInput = document.getElementById('skillSearch');
        return {
          placeholder: searchInput ? searchInput.getAttribute('placeholder') : null
        };
      })()
    `);
    console.log('Desktop placeholder (1440px):', searchDesktop);

    console.log('\n=== TEST 4: MOBILE (390px) - FILTERS BAR & SEARCH PLACEHOLDER ===');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await client.eval(`window.dispatchEvent(new Event('resize'));`);
    await wait(200);

    const mobile390 = await client.eval(`
      (() => {
        const searchInput = document.getElementById('skillSearch');
        const filterBar = document.querySelector('.projects-filter-bar');
        const filterStyle = window.getComputedStyle(filterBar);
        const filterButtons = Array.from(filterBar.querySelectorAll('.filter-btn'));
        const btnTops = [...new Set(filterButtons.map(b => b.getBoundingClientRect().top))];

        return {
          searchPlaceholder: searchInput ? searchInput.getAttribute('placeholder') : null,
          filterDisplay: filterStyle.display,
          filterFlexWrap: filterStyle.flexWrap,
          filterOverflowX: filterStyle.overflowX,
          scrollWidth: filterBar.scrollWidth,
          clientWidth: filterBar.clientWidth,
          isHorizontalScrollable: filterBar.scrollWidth > filterBar.clientWidth,
          distinctButtonRows: btnTops.length, // should be 1 (single horizontal row!)
          buttonCount: filterButtons.length
        };
      })()
    `);
    console.log('Mobile 390px verification:', mobile390);

    console.log('\n=== TEST 5: MOBILE (360px) - FILTERS BAR & SEARCH PLACEHOLDER ===');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 800,
      deviceScaleFactor: 2,
      mobile: true
    });
    await client.eval(`window.dispatchEvent(new Event('resize'));`);
    await wait(200);

    const mobile360 = await client.eval(`
      (() => {
        const searchInput = document.getElementById('skillSearch');
        const filterBar = document.querySelector('.projects-filter-bar');
        const filterStyle = window.getComputedStyle(filterBar);
        const filterButtons = Array.from(filterBar.querySelectorAll('.filter-btn'));
        const btnTops = [...new Set(filterButtons.map(b => b.getBoundingClientRect().top))];

        return {
          searchPlaceholder: searchInput ? searchInput.getAttribute('placeholder') : null,
          filterDisplay: filterStyle.display,
          filterFlexWrap: filterStyle.flexWrap,
          filterOverflowX: filterStyle.overflowX,
          scrollWidth: filterBar.scrollWidth,
          clientWidth: filterBar.clientWidth,
          isHorizontalScrollable: filterBar.scrollWidth > filterBar.clientWidth,
          distinctButtonRows: btnTops.length,
          buttonCount: filterButtons.length
        };
      })()
    `);
    console.log('Mobile 360px verification:', mobile360);

    console.log('\n=== TEST 6: 10TH CARD (RÉSEAUX & PROTOCOLES) TAGS ===');
    const reseauxTags = await client.eval(`
      (() => {
        const card = document.querySelector('[data-cat="reseaux"]');
        const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.trim());
        const rawHtml = card.innerHTML;
        return {
          tags: tags,
          hasAnalyseTag: tags.includes('Analyse de trafic réseau'),
          hasSharkWebTag: tags.includes('Projet SharkWeb'),
          hasOldLongTag: rawHtml.includes('Capture et analyse de trafic')
        };
      })()
    `);
    console.log('Réseaux tags check:', reseauxTags);

    console.log('\n=== TEST 7: HERO ENTRANCE ANIMATION DELAYS ===');
    const heroDelays = await client.eval(`
      (() => {
        const heroElements = [
          '.hero-greeting',
          '.hero-title',
          '.hero-badges',
          '.hero-desc',
          '.hero-stats-row',
          '.hero-cta'
        ];
        return heroElements.map(sel => {
          const el = document.querySelector(sel);
          if (!el) return { selector: sel, found: false };
          const style = window.getComputedStyle(el);
          return {
            selector: sel,
            animationName: style.animationName,
            animationDuration: style.animationDuration,
            animationDelay: style.animationDelay
          };
        });
      })()
    `);
    console.log('Hero animation elements delays:', heroDelays);

  } finally {
    chromeProc.kill();
    await wait(500);
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

run().catch(err => {
  console.error('CDP test failed:', err);
  process.exit(1);
});
