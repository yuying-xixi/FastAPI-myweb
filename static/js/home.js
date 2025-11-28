(() => {
  const storedTheme = localStorage.getItem('theme');
  const root = document.documentElement;
  // 定义一个applyTheme函数，接受theme参数
  const applyTheme = (theme) => {
    if (theme === 'auto') {
      //   判断系统色
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-bs-theme', theme);
    }
  };

  const dropdownItems = document.querySelectorAll('[data-bs-theme-value]');
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const theme = item.getAttribute('data-bs-theme-value');
      localStorage.setItem('theme', theme);
      dropdownItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      applyTheme(theme);
    });
  });

  applyTheme(storedTheme || 'auto');

  // Detect system theme changes (auto mode)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if ((localStorage.getItem('theme') || 'auto') === 'auto') {
      applyTheme('auto');
    }
  });
})();
