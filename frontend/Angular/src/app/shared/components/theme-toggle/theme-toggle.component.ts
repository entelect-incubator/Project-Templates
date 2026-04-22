/**
 * Theme Toggle Component
 * Standalone component for switching between light/dark themes
 */

import { Component, inject, computed } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <div class="theme-switcher fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        (click)="toggleTheme()"
        class="theme-toggle w-12 h-12 rounded-full flex items-center justify-center
               border border-primary-500/30 hover:border-primary-500
               transition-all duration-300 hover:scale-110 hover:shadow-lg
               focus:outline-none focus:ring-2 focus:ring-primary-500"
        [style.background-color]="isDark() ? 'var(--color-bg-card)' : 'var(--color-surface)'"
        [attr.aria-label]="'Switch to ' + (isDark() ? 'light' : 'dark') + ' mode'"
        [title]="'Switch to ' + (isDark() ? 'light' : 'dark') + ' mode'"
      >
        <span class="text-2xl transition-transform duration-300 hover:rotate-12">
          {{ isDark() ? '☀️' : '🌙' }}
        </span>
      </button>
      <span
        class="theme-label text-sm font-medium hidden sm:block"
        [style.color]="isDark() ? '#e5e7eb' : '#1a1a1a'"
      >
        {{ isDark() ? 'Light' : 'Dark' }}
      </span>
    </div>
  `,
  styles: [
    `
      .theme-toggle:hover span {
        animation: wiggle 0.3s ease-in-out;
      }
      @keyframes wiggle {
        0%,
        100% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(-10deg);
        }
        75% {
          transform: rotate(10deg);
        }
      }
    `,
  ],
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  readonly isDark = computed(() => this.themeService.effectiveTheme() === 'dark');

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
