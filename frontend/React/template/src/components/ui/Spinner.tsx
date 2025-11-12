import type React from 'react';
import './Spinner.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const classNames = ['spinner', `spinner--${size}`, className].filter(Boolean).join(' ');

  return (
    <output className={classNames} aria-live='polite' aria-label='Loading'>
      <div className='spinner__circle'></div>
    </output>
  );
};
