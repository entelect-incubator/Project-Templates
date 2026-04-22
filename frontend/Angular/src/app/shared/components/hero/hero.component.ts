/**
 * Hero Section Component
 * 
 * Single Responsibility: Displays the hero section with video background
 * Open/Closed: Configurable via inputs, extendable without modification
 * 
 * @see https://angular.dev/style-guide
 */
import { Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Hero configuration interface for type safety */
export interface HeroConfig {
  videoSource: string;
  posterImage: string;
  logoImage: string;
  brandName: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
}

/** Default hero configuration */
const DEFAULT_HERO_CONFIG: HeroConfig = {
  videoSource: '/videos/hawaiian-pizza.mp4',
  posterImage: '/images/hero-poster.jpg',
  logoImage: '/images/logo.png',
  brandName: 'Pezza Pizzeria',
  tagline: 'A strong reputation built on passion since 1940',
  ctaText: 'Order Now',
  ctaLink: '#menu',
};

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  /** Video source URL */
  @Input() videoSource = DEFAULT_HERO_CONFIG.videoSource;

  /** Poster image for video */
  @Input() posterImage = DEFAULT_HERO_CONFIG.posterImage;

  /** Logo image URL */
  @Input() logoImage = DEFAULT_HERO_CONFIG.logoImage;

  /** Brand name to display */
  @Input() brandName = DEFAULT_HERO_CONFIG.brandName;

  /** Tagline text */
  @Input() tagline = DEFAULT_HERO_CONFIG.tagline;

  /** Call-to-action button text */
  @Input() ctaText = DEFAULT_HERO_CONFIG.ctaText;

  /** Call-to-action link */
  @Input() ctaLink = DEFAULT_HERO_CONFIG.ctaLink;

  @ViewChild('heroVideo') videoElement?: ElementRef<HTMLVideoElement>;

  private intersectionObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupVideoOptimization();
    }
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }

  /**
   * Optimizes video playback based on visibility
   * Pauses video when not visible to save resources
   */
  private setupVideoOptimization(): void {
    if (!this.videoElement?.nativeElement) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = this.videoElement?.nativeElement;
          if (!video) return;

          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked, fail silently
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    this.intersectionObserver.observe(this.videoElement.nativeElement);
  }
}
