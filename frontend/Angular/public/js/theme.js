// ============================================
// THEME SWITCHER FUNCTIONALITY
// ============================================

class ThemeSwitcher {
  constructor() {
    this.html = document.documentElement;
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = document.getElementById('theme-icon');
    this.themeLabel = document.getElementById('theme-label');
    this.storageKey = 'pezza-theme';

    // If required elements are missing, avoid initializing and fail gracefully.
    if (!this.themeToggle || !this.themeIcon || !this.themeLabel) {
      console.warn('ThemeSwitcher: Required elements not found. Theme switcher disabled.');
      return;
    }

    this.init();
  }

  init() {
    this.loadTheme();
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.storageKey)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    this.setTheme(theme);
  }

  toggleTheme() {
    const isDark = this.html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    if (theme === 'dark') {
      this.html.classList.add('dark');
      if (this.themeIcon) this.themeIcon.textContent = '☀️';
      if (this.themeLabel) this.themeLabel.textContent = 'Light';
      document.body.style.colorScheme = 'dark';
    } else {
      this.html.classList.remove('dark');
      if (this.themeIcon) this.themeIcon.textContent = '🌙';
      if (this.themeLabel) this.themeLabel.textContent = 'Dark';
      document.body.style.colorScheme = 'light';
    }
    localStorage.setItem(this.storageKey, theme);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
  });
} else {
  new ThemeSwitcher();
}
