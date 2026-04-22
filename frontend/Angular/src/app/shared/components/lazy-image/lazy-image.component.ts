/**
 * Lazy Image Component
 * Standalone component for lazy loading images with blur effect
 */
import {
  Component,
  Input,
  signal,
  computed,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  standalone: true,
  template: `
    <div class="lazy-image-container relative overflow-hidden" [class]="containerClass">
      <!-- Placeholder/Skeleton -->
      @if (!isLoaded()) {
      <div
        class="absolute inset-0 skeleton-image animate-pulse"
        style="background: linear-gradient(90deg, var(--color-bg-card) 25%, var(--color-bg) 50%, var(--color-bg-card) 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;"
      ></div>
      }

      <!-- Actual Image -->
      <img
        #imageRef
        [src]="src"
        [alt]="alt"
        [class]="imageClass + ' transition-all duration-500'"
        [class.opacity-0]="!isLoaded()"
        [class.opacity-100]="isLoaded()"
        [class.scale-105]="!isLoaded()"
        [class.scale-100]="isLoaded()"
        [style.filter]="isLoaded() ? 'blur(0)' : 'blur(10px)'"
        (load)="onImageLoad()"
        (error)="onImageError()"
        loading="lazy"
      />

      <!-- Error State -->
      @if (hasError()) {
      <div
        class="absolute inset-0 flex items-center justify-center"
        style="background-color: var(--color-bg-card);"
      >
        <span class="text-4xl">🍕</span>
      </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      .lazy-image-container {
        background-color: var(--color-bg-card);
      }
    `,
  ],
})
export class LazyImageComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) src!: string;
  @Input() alt = 'Image';
  @Input() containerClass = 'w-full h-48';
  @Input() imageClass = 'w-full h-full object-cover';

  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;

  private observer?: IntersectionObserver;

  readonly isLoaded = signal(false);
  readonly hasError = signal(false);

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image is in viewport, trigger load
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (this.imageRef?.nativeElement) {
      this.observer.observe(this.imageRef.nativeElement);
    }
  }

  onImageLoad(): void {
    this.isLoaded.set(true);
    this.hasError.set(false);
  }

  onImageError(): void {
    this.hasError.set(true);
    this.isLoaded.set(true);
  }
}
