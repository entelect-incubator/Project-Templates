/**
 * Header Component
 *
 * Single Responsibility: Fixed navigation header with cart indicator and theme toggle
 * Uses content projection for cart dropdown
 *
 * @see https://angular.dev/style-guide
 */
import {
  Component,
  inject,
  input,
  output,
  signal,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly platformId = inject(PLATFORM_ID);

  // Inputs
  cartCount = input<number>(0);

  // Outputs
  cartClick = output<void>();
  orderClick = output<void>();

  // State
  isScrolled = signal(false);

  isDarkMode(): boolean {
    return this.themeService.isDark();
  }

  private scrollListener: (() => void) | null = null;

  ngOnInit(): void {
    /* if (isPlatformBrowser(this.platformId)) {
      this.scrollListener = () => {
        this.isScrolled.set(window.scrollY > 50);
      };
      window.addEventListener('scroll', this.scrollListener);
    }*/
  }

  ngOnDestroy(): void {
    /* if (this.scrollListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
    }*/
  }
}
