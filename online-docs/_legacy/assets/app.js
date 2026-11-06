(() => {
  'use strict';
  const STORAGE_OS = 'robotos-setup-guide-os';
  const STORAGE_CHECKS = 'robotos-setup-guide-checks';
  const STORAGE_LANG = 'robotos-setup-guide-lang';
  const STORAGE_THEME = 'robotos-setup-guide-theme';
  const STORAGE_DIR = 'robotos-setup-guide-dir';
  const STORAGE_CONFIG_OPEN = 'robotos-setup-guide-config-open';
  const DIR_TOKEN = 'YOUR_WORKSHOP_DIR';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const UI = {
    en: {
      skip: 'Skip to guide',
      brandQuiet: 'setup guide',
      configHeading: 'Your setup',
      configExpand: 'Expand setup',
      configCollapse: 'Collapse setup',
      workshopDir: 'Workshop folder',
      workshopDirPlaceholder: '/Users/you/robotos-workshop',
      pathNotSet: 'path not set',
      progressLabel: 'Track progress',
      copy: 'Copy',
      copied: 'Copied',
      doneAt: 'Done',
      language: 'Language',
      languageSwitch: 'L to switch',
      theme: 'Theme',
      themeSwitch: 'D to switch',
      themeLight: 'Light',
      themeDark: 'Dark',
      osPicker: 'Your computer',
      locale: 'en',
    },
    th: {
      skip: 'ข้ามไปยังคู่มือ',
      brandQuiet: 'คู่มือ setup',
      configHeading: 'การตั้งค่าของคุณ',
      configExpand: 'ขยายการตั้งค่า',
      configCollapse: 'ย่อการตั้งค่า',
      workshopDir: 'โฟลเดอร์เวิร์กช็อป',
      workshopDirPlaceholder: '/Users/you/robotos-workshop',
      pathNotSet: 'ยังไม่ได้ตั้ง path',
      progressLabel: 'ความคืบหน้าแทร็ก',
      copy: 'คัดลอก',
      copied: 'คัดลอกแล้ว',
      doneAt: 'เสร็จ',
      language: 'ภาษา',
      languageSwitch: 'กด L เพื่อสลับ',
      theme: 'ธีม',
      themeSwitch: 'กด D เพื่อสลับ',
      themeLight: 'สว่าง',
      themeDark: 'มืด',
      osPicker: 'คอมพิวเตอร์ของคุณ',
      locale: 'th',
    },
  };

  const OS_LABEL = { win: 'Windows', mac: 'macOS', linux: 'Linux' };

  let lang = 'en';
  let theme = 'light';
  try {
    lang = localStorage.getItem(STORAGE_LANG) === 'th' ? 'th' : 'en';
  } catch { /* ignore */ }
  try {
    const saved = localStorage.getItem(STORAGE_THEME);
    if (saved === 'dark' || saved === 'light') theme = saved;
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  } catch { /* ignore */ }

  function ui() {
    return UI[lang] || UI.en;
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch { /* ignore */ }
    const pack = ui();
    const btn = $('#theme-toggle');
    const label = theme === 'dark' ? pack.themeDark : pack.themeLight;
    btn.textContent = label;
    btn.setAttribute('aria-label', `${pack.theme}: ${label} (${pack.themeSwitch})`);
    btn.title = `${pack.theme}: ${label} · ${pack.themeSwitch}`;
  }

  function setTheme(next) {
    theme = next === 'dark' ? 'dark' : 'light';
    applyTheme();
  }

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-lang]').forEach((el) => {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    const pack = ui();
    $$('[data-ui]').forEach((el) => {
      const key = el.dataset.ui;
      if (key && pack[key] && typeof pack[key] === 'string') el.textContent = pack[key];
    });
    const nav = $('.os-picker');
    if (nav) nav.setAttribute('aria-label', pack.osPicker);
    const langBtn = $('#lang-toggle');
    const code = lang === 'th' ? 'TH' : 'EN';
    langBtn.textContent = code;
    langBtn.setAttribute('aria-label', `${pack.language} ${code} (${pack.languageSwitch})`);
    langBtn.title = `${pack.language}: ${code} · ${pack.languageSwitch}`;
    const dirInput = $('#workshop-dir');
    if (dirInput) dirInput.placeholder = pack.workshopDirPlaceholder;
    applyTheme();
    applyChecks(); // refresh Done · timestamp locale
    updateConfigSummary();
    syncConfigToggleLabel();
  }

  function currentOsKey() {
    return $$('.os-picker button[aria-pressed="true"]')[0]?.dataset.os || 'win';
  }

  function updateConfigSummary() {
    const el = $('#config-summary');
    if (!el) return;
    const pack = ui();
    const os = OS_LABEL[currentOsKey()] || 'Windows';
    const dir = normalizeWorkshopDir($('#workshop-dir')?.value || '');
    el.textContent = `${os} · ${dir || pack.pathNotSet}`;
  }

  function syncConfigToggleLabel() {
    const card = $('#config-card');
    const btn = $('#config-toggle');
    if (!card || !btn) return;
    const open = card.getAttribute('data-open') !== 'false';
    const pack = ui();
    btn.setAttribute('aria-expanded', String(open));
    btn.title = open ? pack.configCollapse : pack.configExpand;
    btn.setAttribute('aria-label', `${pack.configHeading}: ${open ? pack.configCollapse : pack.configExpand}`);
  }

  function setConfigOpen(open) {
    const card = $('#config-card');
    if (!card) return;
    card.setAttribute('data-open', open ? 'true' : 'false');
    try {
      localStorage.setItem(STORAGE_CONFIG_OPEN, open ? '1' : '0');
    } catch { /* ignore */ }
    syncConfigToggleLabel();
  }

  let autoCollapseArmed = true;
  function maybeAutoCollapseSetup() {
    if (!autoCollapseArmed) return;
    const dir = normalizeWorkshopDir($('#workshop-dir')?.value || '');
    if (!dir) return;
    const card = $('#config-card');
    if (!card || card.getAttribute('data-open') === 'false') return;
    autoCollapseArmed = false;
    setConfigOpen(false);
  }

  function updateTrackProgress() {
    const wrap = $('#track-progress');
    const countEl = $('#track-progress-count');
    const fill = $('#track-progress-fill');
    const bar = $('#track-progress-bar');
    if (!wrap || !countEl || !fill || !bar) return;
    const os = currentOsKey();
    const inputs = $$(`.os-panel[data-os="${os}"] input[data-check]`);
    const total = inputs.length;
    const done = inputs.filter((i) => i.checked).length;
    if (!total) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    const pct = Math.round((done / total) * 100);
    countEl.textContent = `${done} / ${total}`;
    fill.style.width = `${pct}%`;
    bar.setAttribute('aria-valuemax', String(total));
    bar.setAttribute('aria-valuenow', String(done));
    wrap.classList.toggle('is-complete', done === total);
  }

  function normalizeWorkshopDir(raw) {
    return String(raw || '')
      .trim()
      .replace(/^['"]|['"]$/g, '')
      .replace(/[\\/]+$/, ''); // drop trailing slash
  }

  function quoteDirForFence(dir, fence) {
    if (!dir || !/[\s"'`$]/.test(dir)) return dir;
    const kind = (fence || '').toLowerCase();
    if (kind === 'powershell' || kind === 'ps1') return `'${dir.replace(/'/g, "''")}'`;
    return `'${dir.replace(/'/g, `'\\''`)}'`;
  }

  function substituteDir(template, dir, fence) {
    if (!dir) return template;
    return template.split(DIR_TOKEN).join(quoteDirForFence(dir, fence));
  }

  function saveWorkshopDir(raw) {
    const dir = normalizeWorkshopDir(raw);
    try {
      if (dir) localStorage.setItem(STORAGE_DIR, dir);
      else localStorage.removeItem(STORAGE_DIR);
    } catch { /* ignore */ }
    return dir;
  }

  function applyWorkshopDir({ normalizeInput = true } = {}) {
    const input = $('#workshop-dir');
    if (!input) return;
    const dir = saveWorkshopDir(input.value);
    if (normalizeInput) input.value = dir;
    document.body.classList.toggle('has-workshop-dir', Boolean(dir));
    updateConfigSummary();
    $$('.code-block[data-template]').forEach((block) => {
      const template = block.getAttribute('data-template') || '';
      const fence = block.getAttribute('data-fence') || '';
      const text = substituteDir(template, dir, fence);
      const code = block.querySelector('pre code');
      const copy = block.querySelector('button.copy');
      if (code) {
        code.textContent = text;
        if (window.guideHighlight) window.guideHighlight.highlightElement(code);
      }
      if (copy) copy.setAttribute('data-copy', text);
    });
  }

  function setLang(next) {
    lang = next === 'th' ? 'th' : 'en';
    try {
      localStorage.setItem(STORAGE_LANG, lang);
    } catch { /* ignore */ }
    applyLang();
  }

  function toggleLang() {
    setLang(lang === 'th' ? 'en' : 'th');
  }

  function loadChecks() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_CHECKS) || '{}') || {};
      const map = {};
      let migrated = false;
      for (const [id, val] of Object.entries(raw)) {
        if (val && typeof val === 'object' && val.at) {
          map[id] = { at: String(val.at) };
        } else if (val) {
          map[id] = { at: new Date().toISOString() }; // old `true` → stamp once
          migrated = true;
        }
      }
      if (migrated) saveChecks(map);
      return map;
    } catch {
      return {};
    }
  }
  function saveChecks(map) {
    try {
      localStorage.setItem(STORAGE_CHECKS, JSON.stringify(map));
    } catch { /* ignore */ }
  }

  function formatDoneAt(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    const pack = ui();
    try {
      return d.toLocaleString(pack.locale === 'th' ? 'th-TH' : 'en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return d.toISOString();
    }
  }

  function syncStepDone(step, entry) {
    if (!step) return;
    const done = Boolean(entry && entry.at);
    step.classList.toggle('is-done', done);
    const stamp = step.querySelector('.step-done-at');
    if (!stamp) return;
    if (!done) {
      stamp.hidden = true;
      stamp.removeAttribute('datetime');
      stamp.textContent = '';
      return;
    }
    stamp.hidden = false;
    stamp.dateTime = entry.at;
    stamp.textContent = `${ui().doneAt} · ${formatDoneAt(entry.at)}`;
  }

  function setOs(os, { scroll = true } = {}) {
    document.body.classList.add('os-chosen');
    $$('.os-picker button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.os === os));
    });
    $$('.os-panel').forEach((panel) => {
      panel.hidden = panel.dataset.os !== os;
    });
    updateConfigSummary();
    updateTrackProgress();
    try {
      localStorage.setItem(STORAGE_OS, os);
    } catch { /* ignore */ }
    const hash = '#os-' + os;
    if (location.hash !== hash) {
      try {
        history.replaceState(null, '', hash);
      } catch { /* ignore */ }
    }
    if (!scroll) return;
    const panel = $(`.os-panel[data-os="${os}"]`);
    if (panel) panel.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function applyChecks() {
    const map = loadChecks();
    $$('input[data-check]').forEach((input) => {
      const id = input.dataset.check;
      const entry = map[id];
      input.checked = Boolean(entry);
      syncStepDone(input.closest('.step'), entry);
    });
    updateTrackProgress();
  }

  $$('.os-picker button').forEach((b) => {
    b.addEventListener('click', () => setOs(b.dataset.os));
  });
  $('#lang-toggle').onclick = () => toggleLang();
  $('#theme-toggle').onclick = () => toggleTheme();
  $('#config-toggle')?.addEventListener('click', () => {
    const open = $('#config-card')?.getAttribute('data-open') !== 'false';
    setConfigOpen(!open);
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input,textarea,select')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'l' || e.key === 'L') {
      e.preventDefault();
      toggleLang();
    } else if (e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      toggleTheme();
    }
  });

  document.addEventListener('change', (e) => {
    const input = e.target.closest('input[data-check]');
    if (!input) return;
    const map = loadChecks();
    const id = input.dataset.check;
    if (input.checked) map[id] = { at: new Date().toISOString() };
    else delete map[id];
    saveChecks(map);
    syncStepDone(input.closest('.step'), map[id]);
    updateTrackProgress();
  });

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('button.copy');
    if (!btn) return;
    const text = btn.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    const label = btn.querySelector('[data-ui="copy"]') || btn;
    btn.classList.add('copied');
    label.textContent = ui().copied;
    setTimeout(() => {
      btn.classList.remove('copied');
      label.textContent = ui().copy;
    }, 1400);
  });

  const dirInput = $('#workshop-dir');
  if (dirInput) {
    try {
      const savedDir = localStorage.getItem(STORAGE_DIR);
      if (savedDir) dirInput.value = savedDir;
    } catch { /* ignore */ }
    let dirTimer = 0;
    dirInput.addEventListener('input', () => {
      // Persist immediately so a quick reload still remembers the path.
      saveWorkshopDir(dirInput.value);
      clearTimeout(dirTimer);
      dirTimer = setTimeout(() => applyWorkshopDir({ normalizeInput: false }), 200);
    });
    dirInput.addEventListener('change', () => {
      applyWorkshopDir({ normalizeInput: true });
      maybeAutoCollapseSetup();
    });
    dirInput.addEventListener('blur', () => {
      applyWorkshopDir({ normalizeInput: true });
      maybeAutoCollapseSetup();
    });
  }

  if (window.guideHighlight) window.guideHighlight.highlightAll();

  applyChecks();
  applyLang();

  // Restore open/closed before applying path so load does not re-trigger auto-collapse.
  try {
    const savedDir = localStorage.getItem(STORAGE_DIR);
    const savedOpen = localStorage.getItem(STORAGE_CONFIG_OPEN);
    if (savedDir) autoCollapseArmed = false;
    if (savedOpen === '0' || (savedOpen === null && savedDir)) setConfigOpen(false);
    else setConfigOpen(true);
  } catch {
    setConfigOpen(true);
  }

  applyWorkshopDir({ normalizeInput: true });
  updateTrackProgress();

  function osFromHash() {
    const h = location.hash.replace(/^#/, '');
    if (h === 'os-win' || h === 'windows') return 'win';
    if (h === 'os-mac' || h === 'macos') return 'mac';
    if (h === 'os-linux' || h === 'linux') return 'linux';
    return null;
  }

  let savedOs = null;
  try {
    savedOs = localStorage.getItem(STORAGE_OS);
  } catch { /* ignore */ }
  const fromHash = osFromHash();
  // Prefer URL hash, then last chosen OS, then Windows.
  if (fromHash) setOs(fromHash, { scroll: false });
  else if (savedOs === 'win' || savedOs === 'mac' || savedOs === 'linux') setOs(savedOs, { scroll: false });
  else setOs('win', { scroll: false });

  window.addEventListener('hashchange', () => {
    const os = osFromHash();
    if (os) setOs(os);
  });

  window.addEventListener('beforeunload', () => {
    if (dirInput) saveWorkshopDir(dirInput.value);
  });
})();
