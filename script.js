/* =========================================================
   StrainName.com — script.js (regenerated)
   - Generator, history, share, rating, toasts, easter eggs
   ========================================================= */

(() => {
  /* ---------- Element refs ---------- */
  const el = {
    name: document.getElementById('strain-name'),
    desc: document.getElementById('strain-description'),
    box: document.getElementById('strain-box'),
    seeds: document.getElementById('strain-seeds'),
    historyList: document.getElementById('history-list'),
    ratingWrap: document.getElementById('rating'),
    nowPlaying: document.getElementById('now-playing'),
    toast: document.getElementById('toast'),
    generateBtn: document.getElementById('generate-btn'),
    shareBtn: document.getElementById('share-btn'),
    eggMsg: document.getElementById('easter-egg-message'),
  };

  /* ---------- Utilities ---------- */
  const LS_KEYS = {
    HISTORY: 'sn_history',
    RATINGS: 'sn_ratings',
    LAST: 'sn_last',
  };

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function titleCase(str) {
    return str.replace(/\b[a-z]/g, c => c.toUpperCase());
  }

  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function loadJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  }

  function copyToClipboard(text) {
    return navigator.clipboard?.writeText(text);
  }

  /* ---------- Toasts ---------- */
  let toastTimer = null;
  function showToast(msg, ms = 2200) {
    if (!el.toast) return;
    el.toast.textContent = msg;
    el.toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.classList.remove('visible');
    }, ms);
  }

  /* ---------- Now Playing (simple helper) ---------- */
  function showNowPlaying(msg = 'Now playing: [dadishigh]') {
    if (!el.nowPlaying) return;
    el.nowPlaying.textContent = msg;
    el.nowPlaying.classList.add('show-now-playing');
    setTimeout(() => el.nowPlaying.classList.remove('show-now-playing'), 4000);
  }

  /* ---------- Name Parts ---------- */
  const PREFIX = [
    'Blue', 'Granddaddy', 'Sour', 'Pineapple', 'Northern', 'Afghan',
    'Mendo', 'Alaskan', 'OG', 'Lemon', 'Cherry', 'Purple', 'Gorilla',
    'Ghost', 'Kosher', 'Golden', 'Silver', 'Sunset', 'Space', 'Maui',
    'Z', 'Gelato', 'Grape', 'Banana', 'Alien', 'Critical', 'Electric',
    'Chem', 'Moon', 'Emerald', 'Sugar', 'Skunk', 'Cactus', 'Bubba',
    'Jack', 'Kush', 'Diesel', 'Cereal', 'Wedding', 'Animal'
  ];

  const CORE = [
    'Haze', 'Cookies', 'Punch', 'Glue', 'Kush', 'Sorbet', 'Dream', 'Runts',
    'Fuel', 'Gelato', 'Lassi', 'Quasar', 'Nebula', 'Sundae', 'Cake',
    'Crackle', 'Bomb', 'Riptide', 'Storm', 'Ranger', 'Wizard', 'Frost',
    'Fritter', 'Drizzle', 'Lava', 'Mochi', 'Mimosa', 'Jelly', 'Sherb',
    'Blast', 'Razz', 'Thunder', 'Whip', 'Skunk', 'Hash', 'Diesel'
  ];

  const MUTATORS = [
    'XL', '2000', 'Mk.II', 'Prime', '∞', 'Ultra', 'Reserve', 'Select',
    '707', 'Heavy', 'Light', 'Hybrid', 'Auto', 'Pheno #7', 'Secret Cut',
    'Nightshade', 'Dayglow', 'Stashbox', 'Backyard', 'Moonbeam', '420',
    'Cincy Cut', 'NKY', 'Deep Cut', 'Midnight', 'Afterhours', 'Greenhouse'
  ];

  /* ---------- Description bits ---------- */
  const NOTES = [
    'pine sap', 'lime zest', 'ripe mango', 'earthy hash', 'peppercorn',
    'gasoline', 'wildflower honey', 'fresh ground coffee', 'vanilla pod',
    'dank forest floor', 'candied citrus', 'sweet cream', 'blueberry jam',
    'black cherry cola', 'sage & rosemary', 'fresh-cut cedar'
  ];
  const EFFECTS = [
    'floaty body buzz', 'laser-focus clarity', 'giggle storms', 'time dilation vibes',
    'couch-melt calm', 'creative spark', 'friendly munchies', 'quiet euphoria',
    'midnight musings', 'social sparkle', 'zen glide', 'slow-motion warmth'
  ];
  const PAIRS = [
    'lo-fi beats', 'retro sci-fi flicks', 'late-night sketching',
    'bird-watching playlists', 'open-world grinding', 'vinyl clean-ups',
    'campfire chats', 'noodling on guitar', 'micro-adventures'
  ];

  /* ---------- Ratings ---------- */
  function renderRating(strain) {
    if (!el.ratingWrap) return;
    el.ratingWrap.innerHTML = '';
    const ratings = loadJSON(LS_KEYS.RATINGS, {});
    const current = ratings[strain] || 0;

    for (let i = 1; i <= 5; i++) {
      const span = document.createElement('span');
      span.className = 'leaf-rating';
      span.role = 'button';
      span.ariaLabel = `Rate ${i} out of 5`;
      span.textContent = i <= current ? '🍀' : '🍃';
      span.addEventListener('click', () => {
        ratings[strain] = i;
        saveJSON(LS_KEYS.RATINGS, ratings);
        renderRating(strain);
        showToast(`Rated "${strain}" ${i}/5`);
      });
      el.ratingWrap.appendChild(span);
    }
  }

  /* ---------- History ---------- */
  function addToHistory(strain) {
    const hist = loadJSON(LS_KEYS.HISTORY, []);
    // avoid duplicates side-by-side; keep newest first
    if (hist[0] !== strain) hist.unshift(strain);
    if (hist.length > 25) hist.length = 25;
    saveJSON(LS_KEYS.HISTORY, hist);
    paintHistory();
  }

  function paintHistory() {
    if (!el.historyList) return;
    const hist = loadJSON(LS_KEYS.HISTORY, []);
    el.historyList.innerHTML = '';
    hist.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      li.addEventListener('click', () => {
        setStrain(name, true); // restore
        showToast(`Loaded "${name}" from history`);
      });
      el.historyList.appendChild(li);
    });
  }

  /* ---------- Generator ---------- */
  function generateName() {
    let parts = [rand(PREFIX), rand(CORE)];
    if (Math.random() < 0.6) parts.push(rand(CORE));
    if (Math.random() < 0.7) parts.push(rand(MUTATORS));
    // Clean spacing and title case
    return titleCase(parts.join(' ').replace(/\s+/g, ' ').trim());
  }

  function generateDescription() {
    const n1 = rand(NOTES), n2 = rand(NOTES.filter(n => n !== n1));
    const e1 = rand(EFFECTS);
    const p1 = rand(PAIRS);
    return `Aromas of ${n1} and ${n2}. Expect ${e1}. Best paired with ${p1}.`;
  }

  function setStrain(name, skipHistory = false) {
    el.name.textContent = name;
    el.desc.textContent = generateDescription();
    el.box.classList.add('glow420');
    if (!prefersReducedMotion) {
      el.box.style.transition = 'transform .15s ease';
      el.box.style.transform = 'scale(1.015)';
      setTimeout(() => (el.box.style.transform = 'scale(1)'), 180);
    }
    if (!skipHistory) addToHistory(name);
    saveJSON(LS_KEYS.LAST, { name, ts: Date.now() });
    renderRating(name);
  }

  function generateStrain() {
    const name = generateName();
    setStrain(name);
    showToast(`Cultivated: ${name}`);
  }

  /* expose for onclick in HTML */
  window.generateStrain = generateStrain;

  /* ---------- Share ---------- */
  async function shareStrain() {
    const name = el.name?.textContent?.trim() || '';
    const desc = el.desc?.textContent?.trim() || '';
    const text = `${name} — ${desc}\nGenerated at StrainName.com`;
    try {
      if (navigator.share) {
        await navigator.share({ title: name, text });
        showToast('Shared successfully');
      } else {
        await copyToClipboard(text);
        showToast('Copied to clipboard');
      }
    } catch {
      try {
        await copyToClipboard(text);
        showToast('Copied to clipboard');
      } catch {
        showToast('Could not share');
      }
    }
  }
  window.shareStrain = shareStrain;

  /* ---------- Easter Eggs ---------- */
  // Konami Code => bonus toast + gentle glow
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let buffer = [];
  window.addEventListener('keydown', (e) => {
    buffer.push(e.key);
    if (buffer.length > KONAMI.length) buffer.shift();
    if (KONAMI.every((k, i) => buffer[i]?.toLowerCase() === k.toLowerCase())) {
      buffer = [];
      el.eggMsg && (el.eggMsg.textContent = 'Konami unlocked: extra dank vibes.');
      document.body.classList.toggle('psychedelic');
      showToast('Konami unlocked!');
    }
  });

  // Type 4-2-0 quickly => green glow
  let typed = '';
  let lastTypeTime = 0;
  window.addEventListener('keypress', (e) => {
    const now = performance.now();
    if (now - lastTypeTime > 1200) typed = '';
    lastTypeTime = now;
    typed += e.key;
    if (typed.replace(/\D/g,'') === '420') {
      typed = '';
      el.box && el.box.classList.add('glow420');
      setTimeout(() => el.box && el.box.classList.remove('glow420'), 2500);
      showToast('420 mode ☘️');
    }
  });

  /* ---------- Init ---------- */
  function init() {
    // reduced motion nicety: slow leaf drift by halving animation via CSS var class if desired
    if (prefersReducedMotion) {
      document.body.classList.add('no-anim'); // CSS already removes animations via media query
    }

    paintHistory();

    // restore last strain if present
    const last = loadJSON(LS_KEYS.LAST, null);
    if (last?.name) {
      setStrain(last.name, true);
    } else {
      // initial placeholder description tweak
      el.desc.textContent = 'Hit “Cultivate” to grow something new.';
    }

    // tiny onboarding ping
    setTimeout(() => showNowPlaying(), 1200);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
