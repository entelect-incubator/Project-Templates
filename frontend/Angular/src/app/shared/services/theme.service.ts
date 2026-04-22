/**
 * Theme Service
 * Manages dark/light mode theming with cookie persistence
 */

import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_COOKIE_KEY = 'pizza-app-theme';
  private readonly THEME_COOKIE_EXPIRY_DAYS = 365;

  // Current theme signal
  private readonly _theme = signal<Theme>('system');

  // Public read-only theme
  readonly theme = this._theme.asReadonly();

  // Computed effective theme (resolves 'system' to actual preference)
  readonly effectiveTheme = () => {
    const theme = this._theme();
    if (theme === 'system') {
      return this.getSystemPreference();
    }
    return theme;
  };

  constructor() {
    // Load theme from cookie on initialization
    this.loadThemeFromCookie();

    // Apply theme changes to DOM
    effect(() => {
      this.applyTheme(this.effectiveTheme());
    });

    // Listen for system theme changes
    this.setupSystemThemeListener();
  }

  /**
   * Set the application theme
   */
  setTheme(theme: Theme): void {
    this._theme.set(theme);
    this.saveThemeToCookie(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const currentTheme = this._theme();
    if (currentTheme === 'system') {
      const systemPreference = this.getSystemPreference();
      this.setTheme(systemPreference === 'dark' ? 'light' : 'dark');
    } else {
      this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
  }

  /**
   * Check if current theme is dark
   */
  isDark(): boolean {
    return this.effectiveTheme() === 'dark';
  }

  /**
   * Get system theme preference
   */
  private getSystemPreference(): 'light' | 'dark' {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default to dark theme
  }

  /**
   * Apply theme to DOM
   */
  private applyTheme(theme: 'light' | 'dark'): void {
    if (typeof document === 'undefined') return;

    const htmlElement = document.documentElement;

    // Remove existing theme classes and add new one
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(theme);

    // Set data attribute for CSS
    htmlElement.setAttribute('data-theme', theme);

    // Set color scheme
    document.body.style.colorScheme = theme;

    // Update meta theme color for mobile browsers
    this.updateMetaThemeColor(theme);
  }

  /**
   * Update meta theme color for mobile browsers
   */
  private updateMetaThemeColor(theme: 'light' | 'dark'): void {
    if (typeof document === 'undefined') return;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const color = theme === 'dark' ? '#1f2937' : '#ffffff';
      metaThemeColor.setAttribute('content', color);
    }
  }

  /**
   * Setup listener for system theme changes
   */
  private setupSystemThemeListener(): void {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (this._theme() === 'system') {
        // Trigger effect to re-apply theme
        this._theme.set('system');
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
  }

  /**
   * Load theme from cookie
   */
  private loadThemeFromCookie(): void {
    if (typeof document === 'undefined') return;

    try {
      const cookieValue = this.getCookie(this.THEME_COOKIE_KEY);
      if (
        cookieValue &&
        (cookieValue === 'light' || cookieValue === 'dark' || cookieValue === 'system')
      ) {
        this._theme.set(cookieValue as Theme);
      }
    } catch (error) {
      console.warn('Failed to load theme from cookie:', error);
    }
  }

  /**
   * Save theme to cookie
   */
  private saveThemeToCookie(theme: Theme): void {
    if (typeof document === 'undefined') return;

    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + this.THEME_COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

      document.cookie = `${
        this.THEME_COOKIE_KEY
      }=${theme}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    } catch (error) {
      console.warn('Failed to save theme to cookie:', error);
    }
  }

  /**
   * Get cookie value by name
   */
  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }

    return null;
  }
}
