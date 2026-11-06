(() => {
  'use strict';
  const STORAGE_THEME = 'robotos-setup-guide-theme';
  const STORAGE_LANG = 'robotos-setup-guide-lang';
  const UI = {
    en: {
      kicker: 'Follow-along guides',
      title: 'robotos workshop docs',
      lede: 'Student HTML guides with copyable commands, OS tracks, and progress. Shared styling across setup and labs.',
      setupKicker: 'Start here',
      setupTitle: 'Machine setup',
      setupBody: 'Install CLI, Python wheel, sim, and board bridge — one OS track at a time.',
      labsKicker: 'Coming next',
      labsTitle: 'Labs',
      labsBody: 'MW / WH / HW sheets in the same follow-along style, sharing this site’s CSS and JS.',
      foot: 'Built for GitHub Pages. Markdown sources stay in the workshop repo; this folder is the published HTML.',
      themeLight: 'Light',
      themeDark: 'Dark',
    },
    th: {
      kicker: 'คู่มือทำตามขั้นตอน',
      title: 'เอกสารเวิร์กช็อป robotos',
      lede: 'คู่มือ HTML สำหรับนักเรียน คัดลอกคำสั่งได้ แยกตาม OS และเก็บความคืบหน้า สไตล์ร่วมกันทั้ง setup และแล็บ',
      setupKicker: 'เริ่มที่นี่',
      setupTitle: 'ตั้งค่าเครื่อง',
      setupBody: 'ติดตั้ง CLI, Python wheel, sim และ bridge — ทำทีละ OS',
      labsKicker: 'เร็ว ๆ นี้',
      labsTitle: 'แล็บ',
      labsBody: 'แผ่น MW / WH / HW ในสไตล์เดียวกัน ใช้ CSS และ JS ร่วมกับไซต์นี้',
      foot: 'สำหรับ GitHub Pages แหล่ง Markdown อยู่ในเวิร์กช็อป โฟลเดอร์นี้คือ HTML ที่เผยแพร่',
      themeLight: 'สว่าง',
      themeDark: 'มืด',
    },
  };

  let lang = 'en';
  let theme = 'light';
  try { lang = localStorage.getItem(STORAGE_LANG) === 'th' ? 'th' : 'en'; } catch {}
  try {
    const saved = localStorage.getItem(STORAGE_THEME);
    if (saved === 'dark' || saved === 'light') theme = saved;
    else if (matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  } catch {}

  const $ = (s) => document.querySelector(s);
  const ui = () => UI[lang] || UI.en;

  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-theme', theme);
    const pack = ui();
    document.querySelectorAll('[data-ui]').forEach((el) => {
      const key = el.dataset.ui;
      if (pack[key]) el.textContent = pack[key];
    });
    $('#theme-toggle').textContent = theme === 'dark' ? pack.themeDark : pack.themeLight;
    $('#lang-toggle').textContent = lang === 'th' ? 'TH' : 'EN';
    try {
      localStorage.setItem(STORAGE_THEME, theme);
      localStorage.setItem(STORAGE_LANG, lang);
    } catch {}
  }

  $('#theme-toggle').onclick = () => { theme = theme === 'dark' ? 'light' : 'dark'; apply(); };
  $('#lang-toggle').onclick = () => { lang = lang === 'th' ? 'en' : 'th'; apply(); };
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input,textarea,select')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'd' || e.key === 'D') { e.preventDefault(); theme = theme === 'dark' ? 'light' : 'dark'; apply(); }
    if (e.key === 'l' || e.key === 'L') { e.preventDefault(); lang = lang === 'th' ? 'en' : 'th'; apply(); }
  });
  apply();
})();
