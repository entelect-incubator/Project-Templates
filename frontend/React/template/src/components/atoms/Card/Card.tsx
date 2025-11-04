/**
 * Card Atom Component
 * Container component for grouped content
 * Accessibility-first design
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Card.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children: ReactNode;

  /** If true, add hover/interactive styling */
  interactive?: boolean;

  /** If true, remove padding */
  flush?: boolean;
}

/**
 * Card Component
 * Container for grouped content
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, flush = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={['card', interactive && 'card--interactive', flush && 'card--flush', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';

/**
 * CardHeader Component
 * Header section of a card
 */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={['card__header', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

/**
 * CardBody Component
 * Body section of a card
 */
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={['card__body', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

/**
 * CardFooter Component
 * Footer section of a card
 */
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={['card__footer', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
