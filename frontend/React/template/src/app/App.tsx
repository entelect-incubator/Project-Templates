import { Suspense, lazy } from 'react';
import { GlobalErrorBoundary } from '@/components/common/GlobalErrorBoundary';
import { ToastProvider } from '@/components/common/Toast';
import './App.scss';

const TodoPage = lazy(() => import('@/features/todos/pages/TodoPage'));

/**
 * Main Application Component
 * Root component with error boundary and toast notifications
 */
function App() {
  return (
    <GlobalErrorBoundary>
      <ToastProvider>
        <div className="app-container">
          <header className="app-header">
            <div className="app-header__content">
              <h1 className="app-header__title">Todo Application</h1>
              <p className="app-header__subtitle">
                Built with React 19.2 + TanStack Query + TypeScript + Tailwind CSS
              </p>
            </div>
          </header>

          <main className="app-main">
            <Suspense
              fallback={
                <div className="loading" role="status" aria-live="polite">
                  <div className="loading__spinner">⏳</div>
                  <p>Loading application...</p>
                </div>
              }
            >
              <TodoPage />
            </Suspense>
          </main>

          <footer className="app-footer">
            <p>&copy; 2025 Todo App. Built with modern React practices.</p>
          </footer>
        </div>
      </ToastProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
