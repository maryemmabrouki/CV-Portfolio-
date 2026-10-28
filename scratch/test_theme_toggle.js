const fs = require('fs');

// Create mock environment
let storedTheme = null;
const localStorage = {
  getItem: (k) => (k === 'mm-theme' ? storedTheme : null),
  setItem: (k, v) => { if (k === 'mm-theme') storedTheme = v; }
};

let docAttr = {};
const documentElement = {
  getAttribute: (k) => docAttr[k] || null,
  setAttribute: (k, v) => { docAttr[k] = v; },
  removeAttribute: (k) => { delete docAttr[k]; }
};

let listeners = {};
const themeToggle = {
  addEventListener: (event, fn) => { listeners[event] = fn; },
  click: () => { if (listeners['click']) listeners['click'](); }
};

function showToast(msg) { /* mock */ }

// Extract and test the theme logic
function runThemeInit() {
  const currentStored = localStorage.getItem('mm-theme');
  if (currentStored) {
    if (currentStored === 'dark') {
      documentElement.setAttribute('data-theme', 'dark');
    } else {
      documentElement.removeAttribute('data-theme');
    }
  }

  themeToggle.addEventListener('click', function () {
    const currentTheme = documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      documentElement.setAttribute('data-theme', 'dark');
    } else {
      documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('mm-theme', newTheme);
    showToast(newTheme === 'dark' ? 'Mode sombre activé' : 'Mode clair activé');
  });
}

console.log('--- TEST 1: Initial state (default light) ---');
runThemeInit();
console.log('data-theme attribute:', documentElement.getAttribute('data-theme'));
console.log('localStorage mm-theme:', localStorage.getItem('mm-theme'));

console.log('--- TEST 2: Click to toggle to DARK ---');
themeToggle.click();
console.log('data-theme attribute:', documentElement.getAttribute('data-theme'));
console.log('localStorage mm-theme:', localStorage.getItem('mm-theme'));
if (documentElement.getAttribute('data-theme') !== 'dark' || localStorage.getItem('mm-theme') !== 'dark') {
  throw new Error('Toggle to dark failed');
}

console.log('--- TEST 3: Reload simulation with stored dark theme ---');
docAttr = {};
runThemeInit();
console.log('data-theme after reload:', documentElement.getAttribute('data-theme'));
if (documentElement.getAttribute('data-theme') !== 'dark') {
  throw new Error('Persistence of dark theme failed');
}

console.log('--- TEST 4: Click to toggle back to LIGHT ---');
themeToggle.click();
console.log('data-theme attribute:', documentElement.getAttribute('data-theme'));
console.log('localStorage mm-theme:', localStorage.getItem('mm-theme'));
if (documentElement.getAttribute('data-theme') !== null || localStorage.getItem('mm-theme') !== 'light') {
  throw new Error('Toggle back to light failed');
}

console.log('--- TEST 5: Reload simulation with stored light theme ---');
docAttr = {};
runThemeInit();
console.log('data-theme after reload:', documentElement.getAttribute('data-theme'));
if (documentElement.getAttribute('data-theme') !== null) {
  throw new Error('Persistence of light theme failed');
}

console.log('\nAll 5 theme switching and persistence tests PASSED successfully!');

