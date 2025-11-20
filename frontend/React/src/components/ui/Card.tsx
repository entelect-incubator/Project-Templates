import type React from 'react';
import './Card.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const classNames = ['card', className].filter(Boolean).join(' ');

  return <div className={classNames}>{children}</div>;
};
