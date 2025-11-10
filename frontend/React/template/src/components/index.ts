/**
 * Main Components Barrel Export
 * Simplified architecture without atomic design
 */

// UI Components (Basic reusable components)
export { Button } from './ui/Button';
export { Alert } from './ui/Alert';
export { Card } from './ui/Card';
export { Badge } from './ui/Badge';
export { Spinner } from './ui/Spinner';
export { ThemeButton } from './ui/ThemeButton';

// Common Components (Shared functionality)
export { GlobalErrorBoundary } from './common/GlobalErrorBoundary';
export { ToastProvider } from './common/Toast';
export { Pagination } from './common/Pagination';
