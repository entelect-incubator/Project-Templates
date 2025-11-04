/**
 * Toast Notification System
 * Provides toast notifications with different types and auto-dismiss
 */

import { createContext, useContext, useCallback, ReactNode } from 'react';
import { Toaster, toast as sonnerToast } from 'sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  dismiss: (id: string | number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Toast Provider Component
 * Wraps the application and provides toast functionality
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const showToast = useCallback((message: string, type: ToastType, options?: ToastOptions) => {
    const duration = options?.duration ?? 3000;

    switch (type) {
      case 'success':
        sonnerToast.success(message, {
          duration,
          description: options?.description,
          action: options?.action,
        });
        break;
      case 'error':
        sonnerToast.error(message, {
          duration,
          description: options?.description,
          action: options?.action,
        });
        break;
      case 'warning':
        sonnerToast.warning(message, {
          duration,
          description: options?.description,
          action: options?.action,
        });
        break;
      case 'info':
      default:
        sonnerToast.info(message, {
          duration,
          description: options?.description,
          action: options?.action,
        });
    }
  }, []);

  const success = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, 'success', options),
    [showToast]
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, 'error', options),
    [showToast]
  );

  const warning = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, 'warning', options),
    [showToast]
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, 'info', options),
    [showToast]
  );

  const dismiss = useCallback((id: string | number) => {
    sonnerToast.dismiss(id);
  }, []);

  const value: ToastContextType = {
    showToast,
    success,
    error,
    warning,
    info,
    dismiss,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toaster position="top-right" theme="light" richColors closeButton expand={true} />
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast functionality
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
