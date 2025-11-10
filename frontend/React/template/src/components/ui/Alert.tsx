import type React from 'react';
import './Alert.scss';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'info', children, className = '' }) => {
  const classNames = ['alert', `alert--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="alert">
      {children}
    </div>
  );
};
