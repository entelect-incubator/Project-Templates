/**
 * Theme Store using Preact Signals
 * Simple global state management for theme switching
 */

import { computed, signal } from '@preact/signals-react';

export type Theme = 'light' | 'dark';

// Theme signal - this is our global state
const getInitialTheme = (): Theme => {
  // Check localStorage first
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored && (stored === 'light' || stored === 'dark')) {
    return stored;
  }

  // Check system preference
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

export const themeSignal = signal<Theme>(getInitialTheme());

// Computed value for theme class
export const themeClass = computed(() => `${themeSignal.value}-theme`);

// Theme actions
export const themeActions = {
  toggle: () => {
    const newTheme = themeSignal.value === 'light' ? 'dark' : 'light';
    themeSignal.value = newTheme;
    localStorage.setItem('theme', newTheme);

    // Update DOM
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${newTheme}-theme`);
  },

  setTheme: (theme: Theme) => {
    themeSignal.value = theme;
    localStorage.setItem('theme', theme);

    // Update DOM
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
  },

  initialize: () => {
    // Set initial theme class on DOM
    document.documentElement.classList.add(themeClass.value);
  },
};
