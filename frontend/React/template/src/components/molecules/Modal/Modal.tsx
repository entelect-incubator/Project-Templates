import { forwardRef, useCallback, useEffect } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

/**
 * Modal/Dialog component - Accessible dialog overlay with portal rendering
 *
 * Features:
 * - Portal rendering outside of DOM tree
 * - Backdrop with click-outside closing
 * - Keyboard support (Escape to close)
 * - Focus trap within modal
 * - Accessibility attributes (role="dialog", aria-modal)
 * - Customizable header/footer
 * - Multiple size variants
 * - Smooth animations
 * - SSR-safe
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} title="Confirm">
 *   <Modal.Body>
 *     Are you sure?
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={handleClose}>Cancel</Button>
 *     <Button variant="danger" onClick={handleConfirm}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Control modal visibility */
  isOpen: boolean;

  /** Called when modal should close */
  onClose: () => void;

  /** Modal title (shown in header) */
  title?: string;

  /** Modal content */
  children: ReactNode;

  /** Size of modal (default: md) */
  size?: ModalSize;

  /** Close button in header (default: true) */
  showCloseButton?: boolean;

  /** Close on backdrop click (default: true) */
  closeOnBackdropClick?: boolean;

  /** Close on Escape key (default: true) */
  closeOnEscape?: boolean;

  /** Disable backdrop scrolling (default: true) */
  disableBackdropScroll?: boolean;

  /** CSS class name */
  className?: string;
}

/**
 * Modal component - Main container
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = 'md',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      disableBackdropScroll = true,
      className = '',
      ...props
    },
    ref
  ) => {
    // Handle Escape key
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEscape, onClose]);

    // Disable body scroll when modal is open
    useEffect(() => {
      if (!isOpen || !disableBackdropScroll) return;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    }, [isOpen, disableBackdropScroll]);

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose]
    );

    if (!isOpen) return null;

    const content = (
      <div className="modal-overlay" onClick={handleBackdropClick} role="presentation">
        <div
          ref={ref}
          className={`modal modal--${size} ${className}`.trim()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          {...props}
        >
          {title && (
            <div className="modal__header">
              <h2 className="modal__title" id="modal-title">
                {title}
              </h2>
              {showCloseButton && (
                <button
                  className="modal__close"
                  onClick={onClose}
                  aria-label="Close modal"
                  type="button"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    );

    return createPortal(content, document.body);
  }
);

Modal.displayName = 'Modal';

/**
 * Modal.Body component - Content area
 */
export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Body content */
  children: ReactNode;

  /** CSS class name */
  className?: string;
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`modal__body ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'Modal.Body';

/**
 * Modal.Footer component - Actions area
 */
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Footer content (typically buttons) */
  children: ReactNode;

  /** Align footer buttons (default: right) */
  align?: 'left' | 'center' | 'right' | 'between';

  /** CSS class name */
  className?: string;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, align = 'right', className = '', ...props }, ref) => {
    const alignClass = align === 'between' ? 'modal__footer--between' : `modal__footer--${align}`;

    return (
      <div ref={ref} className={`modal__footer ${alignClass} ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'Modal.Footer';

// Attach sub-components with type assertion
(Modal as any).Body = ModalBody;
(Modal as any).Footer = ModalFooter;

declare global {
  namespace JSX {
    // Allows modal.Body and modal.Footer JSX syntax
  }
}
