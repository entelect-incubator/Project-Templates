/**
 * Toast Notification System
 * Provides toast notifications with different types and auto-dismiss
 */

import { createContext, type ReactNode, useCallback, useContext } from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';

/**
 * Toast types constant with 'as const' for type-safe enum-like behavior
 */
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

/**
 * Derive ToastType from TOAST_TYPES constant
 * This ensures type and runtime values stay in sync
 */
export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

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
 * Toast handler composition mapping
 * Maps toast types to their sonner handler functions
 * Eliminates switch statement repetition
 */
const TOAST_HANDLERS: Record<ToastType, typeof sonnerToast.success> = {
  [TOAST_TYPES.SUCCESS]: sonnerToast.success,
  [TOAST_TYPES.ERROR]: sonnerToast.error,
  [TOAST_TYPES.WARNING]: sonnerToast.warning,
  [TOAST_TYPES.INFO]: sonnerToast.info,
};

/**
 * Toast Provider Component
 * Wraps the application and provides toast functionality
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const showToast = useCallback((message: string, type: ToastType, options?: ToastOptions) => {
    const duration = options?.duration ?? 3000;
    const handler = TOAST_HANDLERS[type];

    handler(message, {
      duration,
      description: options?.description,
      action: options?.action,
    });
  }, []);

  const success = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, TOAST_TYPES.SUCCESS, options),
    [showToast]
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, TOAST_TYPES.ERROR, options),
    [showToast]
  );

  const warning = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, TOAST_TYPES.WARNING, options),
    [showToast]
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, TOAST_TYPES.INFO, options),
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
      <Toaster position='top-right' theme='light' richColors closeButton expand={true} />
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
