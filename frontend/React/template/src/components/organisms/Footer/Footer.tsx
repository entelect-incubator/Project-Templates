import React, { forwardRef } from 'react';
import './Footer.scss';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Footer content - typically columns or sections */
  children: React.ReactNode;
  /** Copyright text */
  copyright?: string;
  /** Background style */
  variant?: 'light' | 'dark';
  /** Footer height variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show border on top */
  bordered?: boolean;
}

/**
 * Footer Organism Component
 *
 * Page footer typically containing links, copyright, and additional info.
 * Supports multi-column layout and customizable styling.
 *
 * @example
 * ```tsx
 * <Footer
 *   copyright="© 2024 Company"
 *   variant="dark"
 * >
 *   <div className="footer__column">
 *     <h4>Product</h4>
 *     <ul>
 *       <li><a href="/features">Features</a></li>
 *     </ul>
 *   </div>
 * </Footer>
 * ```
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    { children, copyright, variant = 'light', size = 'md', bordered = true, className, ...props },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={`footer footer--${variant} footer--${size} ${
          bordered ? 'footer--bordered' : ''
        } ${className || ''}`}
        {...props}
      >
        <div className="footer__container">
          <div className="footer__content">{children}</div>

          {copyright && (
            <div className="footer__copyright">
              <p>{copyright}</p>
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

/**
 * FooterColumn sub-component for organizing footer content
 */
export interface FooterColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column title */
  title?: string;
  /** Column content */
  children?: React.ReactNode;
}

export const FooterColumn = forwardRef<HTMLDivElement, FooterColumnProps>(
  ({ title, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={`footer__column ${className || ''}`} {...props}>
        {title && <h3 className="footer__column-title">{title}</h3>}
        <div className="footer__column-content">{children}</div>
      </div>
    );
  }
);

FooterColumn.displayName = 'FooterColumn';
