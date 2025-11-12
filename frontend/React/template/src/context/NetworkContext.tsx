/**
 * Network Status Context
 * Monitors network connectivity and provides status globally
 */

import type React from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface NetworkContextType {
  isOnline: boolean;
  isSlowConnection: boolean;
  connectionType: string | undefined;
  retryFailedRequests: () => Promise<void>;
  addPendingRequest: (request: () => Promise<void>) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

/**
 * NetworkProvider Component
 * Wraps app to monitor and provide network status
 */
export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [connectionType, setConnectionType] = useState<string | undefined>();
  const [pendingRequests, setPendingRequests] = useState<(() => Promise<void>)[]>([]);

  const retryFailedRequests = useCallback(async () => {
    const requests = [...pendingRequests];
    setPendingRequests([]);

    for (const request of requests) {
      try {
        await request();
      } catch (error) {
        console.error('Failed to retry request:', error);
      }
    }
  }, [pendingRequests]);

  const addPendingRequest = useCallback((request: () => Promise<void>) => {
    setPendingRequests((prev) => [...prev, request]);
  }, []);

  useEffect(() => {
    // Handle online status
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored! 🟢');
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('No internet connection 🔴', {
        description: 'Some features may not work properly.',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle retry when coming back online
  useEffect(() => {
    if (isOnline && pendingRequests.length > 0) {
      retryFailedRequests();
    }
  }, [isOnline, pendingRequests.length, retryFailedRequests]);

  // Monitor connection speed
  useEffect(() => {
    const checkConnectionSpeed = () => {
      if ('connection' in navigator) {
        const connection = (
          navigator as unknown as {
            connection: {
              effectiveType: string;
              removeEventListener?: (type: string, fn: () => void) => void;
            };
          }
        ).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          setConnectionType(effectiveType);
          setIsSlowConnection(effectiveType === '2g' || effectiveType === '3g');
        }
      }
    };

    checkConnectionSpeed();

    if ('connection' in navigator) {
      const conn = (
        navigator as unknown as {
          connection: {
            addEventListener: (type: string, fn: () => void) => void;
            removeEventListener: (type: string, fn: () => void) => void;
          };
        }
      ).connection;
      conn?.addEventListener('change', checkConnectionSpeed);

      return () => {
        conn?.removeEventListener('change', checkConnectionSpeed);
      };
    }
  }, []);

  const contextValue: NetworkContextType = {
    isOnline,
    isSlowConnection,
    connectionType,
    retryFailedRequests,
    addPendingRequest,
  };

  return <NetworkContext.Provider value={contextValue}>{children}</NetworkContext.Provider>;
}

/**
 * Hook to use network status
 */
export function useNetworkStatus() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetworkStatus must be used within NetworkProvider');
  }
  return context;
}

/**
 * Hook to register a request that should be retried on network recovery
 */
export function usePendingRequest() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('usePendingRequest must be used within NetworkProvider');
  }

  return (request: () => Promise<void>) => {
    if (!context.isOnline) {
      // Store request to retry later
      context.addPendingRequest(request);
      return false;
    }
    return true;
  };
}
