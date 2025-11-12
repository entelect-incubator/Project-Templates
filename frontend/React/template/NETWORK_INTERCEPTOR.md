# Network Interceptor & API Client Enhancement

## Summary

I've successfully implemented a comprehensive network status monitoring system and enhanced the API client with network awareness. The system now detects when the network goes offline and provides automatic recovery.

## Changes Made

### 1. **New NetworkContext** (`src/context/NetworkContext.tsx`)
Global context provider that monitors network status and handles automatic retry of failed requests.

**Features:**
- ✅ Detects when network goes online/offline using `navigator.onLine` events
- ✅ Monitors connection speed (2G, 3G, 4G detection)
- ✅ Provides global network status to all components via context hooks
- ✅ Queues failed requests when offline and retries when connection is restored
- ✅ Shows toast notifications for network status changes:
  - 🟢 "Connection restored!" when coming back online
  - 🔴 "No internet connection" when going offline
  - ⚠️ "Slow connection detected" for 2G/3G networks

**Hooks Available:**
- `useNetworkStatus()` - Get current network status
- `usePendingRequest()` - Register requests for retry on network recovery

### 2. **Enhanced API Client** (`src/api/client.ts`)
Updated with network awareness and improved error handling.

**New Features:**
- ✅ Checks `navigator.onLine` before making requests
- ✅ Throws clear error if network is unavailable
- ✅ Integrated with telemetry for monitoring API calls
- ✅ Network error events logged for debugging
- ✅ Retry mechanism for both network errors and 5xx server errors
- ✅ Exponential backoff retry delays

**Error Tracking:**
- `api-request` - Span for all API requests
- `api-success` - Event when request succeeds
- `api-error` - Event when request fails
- `api-network-error` - Event when network error occurs
- `api-retry` - Event when retry attempt is made
- `api-max-retries` - Event when max retries exceeded

### 3. **Updated App.tsx**
Integrated NetworkProvider into the app component hierarchy.

**Changes:**
- Added `<NetworkProvider>` wrapper around entire app
- Placed after `GlobalErrorBoundary` and `ToastProvider` for proper event hierarchy
- Fixed semantic HTML: Changed `<div role="status">` to `<output>` element for loading state

## How It Works

```
User's Network Drops
        ↓
navigator.offline event fired
        ↓
Toast notification shown: 🔴 "No internet connection"
        ↓
Pending requests stored in NetworkContext
        ↓
User's Network Restored
        ↓
navigator.online event fired
        ↓
Toast notification shown: 🟢 "Connection restored!"
        ↓
All pending requests automatically retried
        ↓
Application continues normally
```

## Integration with Existing Systems

### GlobalErrorBoundary
- Works alongside error boundary for component-level errors
- Network errors are caught by API client and raised to GlobalErrorBoundary if needed

### ToastProvider
- Network status updates shown via toast notifications
- Non-blocking, user-friendly notifications

### API Hooks (usePizzas, etc.)
- No changes needed - continue using existing hooks
- Network detection is transparent to hook implementations
- Requests automatically fail gracefully if offline

### TanStack Query
- React Query will handle retry logic at the query level
- Can now combine with network detection for smarter retries

## Usage Examples

### Check Network Status in Components

```typescript
import { useNetworkStatus } from '@/context/NetworkContext';

function MyComponent() {
  const { isOnline, isSlowConnection } = useNetworkStatus();
  
  return (
    <div>
      {!isOnline && <div>You're offline</div>}
      {isSlowConnection && <div>Slow connection detected</div>}
    </div>
  );
}
```

### Register Requests for Retry

```typescript
import { usePendingRequest } from '@/context/NetworkContext';

function MyComponent() {
  const registerPending = usePendingRequest();
  
  const handleSubmit = async () => {
    const canRetry = registerPending(async () => {
      await submitForm();
    });
    
    if (!canRetry) {
      // Request was queued for later
      toast.info('Request queued for when you go online');
    }
  };
}
```

## Browser Compatibility

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Online/offline events supported in all modern browsers
- ✅ Connection speed API is optional (gracefully degrades)
- ✅ Works with SSR (events only fire on client-side)

## Next Steps (Optional)

1. **Service Worker Integration** - Add service worker for offline caching
2. **Request Persistence** - Persist pending requests to localStorage for recovery after browser close
3. **Connection Quality Indicators** - Show bandwidth quality in UI
4. **Automatic Sync** - Sync data when coming back online using React Query's `refetchOnMount`
5. **Generated API Client** - When generated client is ready, wrap it with the network-aware fetch handler

## Testing Network Offline

In DevTools:
```
1. Open DevTools (F12)
2. Go to Network tab
3. Click on throttling dropdown (normally says "No throttling")
4. Select "Offline"
5. App will show offline message and queue requests
6. Click dropdown again and select "No throttling"
7. App will retry queued requests automatically
```

## Files Modified

- `src/context/NetworkContext.tsx` - NEW
- `src/api/client.ts` - Enhanced with network awareness
- `src/app/App.tsx` - Added NetworkProvider, fixed semantic HTML
- `src/context/ThemeContext.tsx` - No changes

## TypeScript Safety

- ✅ Full TypeScript support
- ✅ Type-safe network status
- ✅ Proper error handling with ApiError class
- ✅ No use of `any` type (except necessary for generated code compatibility)
