import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalErrorBoundary } from '@/components/common/GlobalErrorBoundary';
import { ToastProvider } from '@/components/common/Toast';
import { ThemeButton } from '@/components/ui/ThemeButton';
import { themeActions } from '@/stores/theme';
import './App.scss';

const PizzaMenuPage = lazy(() => import('@/features/pizzas/pages/PizzaMenuPage'));
const CheckoutPage = lazy(() => import('@/features/pizzas/pages/CheckoutPage'));
const OrderTrackingPage = lazy(() => import('@/features/pizzas/pages/OrderTrackingPage'));

/**
 * Main Application Component
 * Root component with error boundary and toast notifications
 */
function App() {
  // Initialize theme on app start
  useEffect(() => {
    themeActions.initialize();
  }, []);

  return (
    <GlobalErrorBoundary>
      <ToastProvider>
        <Router>
          <div className="app-container">
            <header className="app-header">
              <div className="app-header__content">
                <h1 className="app-header__title">🍕 Pezza Pizzeria</h1>
                <p className="app-header__subtitle">
                  Fresh pizzas, delivered fast. Built with React 19.2 + TanStack Query + TypeScript
                </p>
              </div>
              <div className="app-header__actions">
                <ThemeButton />
              </div>
            </header>

            <main className="app-main">
              <Suspense
                fallback={
                  <div className="loading" role="status" aria-live="polite">
                    <div className="loading__spinner">⏳</div>
                    <p>Loading...</p>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/pizzas" replace />} />
                  <Route path="/pizzas" element={<PizzaMenuPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order/:orderId" element={<OrderTrackingPage />} />
                  <Route path="/order/find" element={<OrderTrackingPage />} />
                  <Route path="*" element={<Navigate to="/pizzas" replace />} />
                </Routes>
              </Suspense>
            </main>

            <footer className="app-footer">
              <p>&copy; 2025 Pezza Pizzeria. Fresh, delicious pizza made to order.</p>
            </footer>
          </div>
        </Router>
      </ToastProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
