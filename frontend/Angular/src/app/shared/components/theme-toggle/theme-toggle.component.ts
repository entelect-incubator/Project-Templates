/**
 * Theme Toggle Component
 * Standalone component for switching between light/dark themes
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="themeMenu"
      [matTooltip]="getTooltipText()"
      matTooltipPosition="below"
      class="theme-toggle"
      [class.dark-active]="themeService.effectiveTheme() === 'dark'"
    >
      <mat-icon>{{ getCurrentIcon() }}</mat-icon>
    </button>

    <mat-menu #themeMenu="matMenu" class="theme-menu">
      <button
        mat-menu-item
        (click)="setTheme('light')"
        [class.active]="themeService.theme() === 'light'"
      >
        <mat-icon>light_mode</mat-icon>
        <span>Light</span>
      </button>

      <button
        mat-menu-item
        (click)="setTheme('dark')"
        [class.active]="themeService.theme() === 'dark'"
      >
        <mat-icon>dark_mode</mat-icon>
        <span>Dark</span>
      </button>

      <button
        mat-menu-item
        (click)="setTheme('system')"
        [class.active]="themeService.theme() === 'system'"
      >
        <mat-icon>computer</mat-icon>
        <span>System</span>
      </button>
    </mat-menu>
  `,
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  getCurrentIcon(): string {
    const currentTheme = this.themeService.theme();

    switch (currentTheme) {
      case 'light':
        return 'light_mode';
      case 'dark':
        return 'dark_mode';
      case 'system':
        return 'computer';
      default:
        return 'brightness_6';
    }
  }

  getTooltipText(): string {
    const currentTheme = this.themeService.theme();
    const effectiveTheme = this.themeService.effectiveTheme();

    if (currentTheme === 'system') {
      return `Theme: System (${effectiveTheme})`;
    }

    return `Theme: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}`;
  }
}
