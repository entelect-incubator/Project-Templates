import { useRef, useEffect } from 'react';
import styles from './HeroSection.module.scss';

interface HeroSectionProps {
  videoUrl?: string;
  posterUrl?: string;
}

/**
 * Hero Section Component
 * Displays branded hero with video background, logo, and title
 * Matches theme template styling
 */
export function HeroSection({ videoUrl, posterUrl }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Autoplay muted video for best browser compatibility
      videoRef.current.play().catch(() => {
        // Video autoplay prevented by browser, which is expected
      });
    }
  }, []);

  return (
    <section className={styles['hero']}>
      {/* Video background */}
      {videoUrl && (
        <video
          ref={videoRef}
          className={styles['heroVideo']}
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterUrl}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Content overlay */}
      <div className={styles['heroContent']}>
        {/* Logo - Pizza emoji or custom logo */}
        <div className={styles['heroLogo']}>🍕</div>

        {/* Main title */}
        <h1 className={styles['heroTitle']}>Our Premium Menu</h1>

        {/* Subtitle */}
        <p className={styles['heroSubtitle']}>Choose your favorite pizzas</p>
      </div>
    </section>
  );
}
