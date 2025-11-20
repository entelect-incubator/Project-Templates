/**
 * Mode Selection Component
 * Allows users to choose between tracking current order or looking up an order
 */

import styles from './ModeSelection.module.scss';

export type TrackingMode = 'current' | 'lookup' | 'cookie';

interface ModeSelectionProps {
  trackingMode: TrackingMode;
  onModeChange: (mode: TrackingMode) => void;
  className?: string;
}

export function ModeSelection({ trackingMode, onModeChange, className = '' }: ModeSelectionProps) {
  const combinedClassName = `${styles.modeSelector} ${className}`.trim();

  return (
    <div className={combinedClassName} role='tablist' aria-label='Order tracking options'>
      <button
        type='button'
        role='tab'
        aria-selected={trackingMode === 'current'}
        aria-controls='current-order-panel'
        className={`${styles.modeButton} ${trackingMode === 'current' ? styles.active : ''}`}
        onClick={() => onModeChange('current')}
      >
        Current Order
      </button>
      <button
        type='button'
        role='tab'
        aria-selected={trackingMode === 'lookup'}
        aria-controls='lookup-order-panel'
        className={`${styles.modeButton} ${trackingMode === 'lookup' ? styles.active : ''}`}
        onClick={() => onModeChange('lookup')}
      >
        Look Up Order
      </button>
    </div>
  );
}
