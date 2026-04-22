import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { GlobalErrorBoundary } from '@/components/common/GlobalErrorBoundary';
import { ToastProvider } from '@/components/common/Toast';
import { ThemeButton } from '@/components/ui/ThemeButton';
import { HeroSection } from '@/components/HeroSection/HeroSection';
import { FloatingCart } from '@/components/FloatingCart/FloatingCart';
import { NetworkProvider } from '@/context/NetworkContext';
import { CartProvider, useCart } from '@/context/CartContext';
import { themeActions } from '@/stores/theme';
import { HERO_POSTER_URL, HERO_VIDEO_URL } from '@/config/environment';
import styles from './App.module.scss';
import './App.scss';

const PizzaMenuPage = lazy(() => import('@/features/pizza/pages/PizzaMenuPage'));
const CheckoutPage = lazy(() => import('@/features/order/pages/CheckoutPage'));
const OrderTrackingPage = lazy(() => import('@/features/order/pages/OrderTrackingPage'));

/**
 * Main Application Component
 * Root component with error boundary and toast notifications
 * Features hero section, theme switcher, and floating cart
 */
function AppContent() {
  const { cart } = useCart();
  const [showFloatingCart, setShowFloatingCart] = useState(false);

  // Initialize theme on app start
  useEffect(() => {
    themeActions.initialize();
  }, []);

  return (
    <div className={styles['appContainer']}>
      {/* Hero Section with Video Background */}
      <HeroSection videoUrl={HERO_VIDEO_URL} posterUrl={HERO_POSTER_URL} />

      {/* Main Header */}
      <header className={styles['header']}>
        <div className={styles['header__content']}>
          <a href="/" className={styles['header__brand']}>
            🍕 Pezza Pizzeria
          </a>
          <div className={styles['header__actions']}>
            <ThemeButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles['main']}>
        <Suspense
          fallback={
            <output className="loading" aria-live="polite">
              <div className="loading__spinner">⏳</div>
              <p>Loading...</p>
            </output>
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

      {/* Footer */}
      <footer className={styles['footer']}>
        <p>&copy; 2025 Pezza Pizzeria. Fresh, delicious pizza made to order.</p>
      </footer>

      {/* Floating Cart Button */}
      <FloatingCart
        cart={cart}
        onClick={() => setShowFloatingCart(!showFloatingCart)}
        isHidden={cart.itemCount === 0}
      />
    </div>
  );
}

function App() {
  return (
    <GlobalErrorBoundary>
      <ToastProvider>
        <NetworkProvider>
          <CartProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <div className={styles['appContainer']}>
                <AppContent />
              </div>
            </Router>
          </CartProvider>
        </NetworkProvider>
      </ToastProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
