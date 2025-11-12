/**
 * Simple Theme Button Component
 * Uses Preact Signals for state management
 */

import { themeActions, themeSignal } from '@/stores/theme';
import './ThemeButton.scss';

export function ThemeButton() {
  const theme = themeSignal.value;

  return (
    <button
      type='button'
      className='theme-button'
      onClick={themeActions.toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
