/**
 * Empty State Component
 * Displays when no content is available
 * Supports different empty state types with appropriate icons and messages
 */

type EmptyStateType = 'order' | 'search' | 'cart' | 'custom';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  icon?: string;
  className?: string;
}

const emptyStateDefaults: Record<
  EmptyStateType,
  { icon: string; title: string; description: string }
> = {
  order: {
    icon: '📦',
    title: 'No active order',
    description: 'Switch to "Look Up Order" to find a previous order',
  },
  search: {
    icon: '🔍',
    title: 'No results found',
    description: 'Try adjusting your search criteria',
  },
  cart: {
    icon: '🛒',
    title: 'Your cart is empty',
    description: 'Add items from the menu to get started',
  },
  custom: {
    icon: '📭',
    title: 'Nothing here',
    description: 'No content available',
  },
};

export function EmptyState({
  type = 'order',
  title,
  description,
  icon,
  className = '',
}: EmptyStateProps) {
  const defaults = emptyStateDefaults[type];
  const displayIcon = icon || defaults.icon;
  const displayTitle = title || defaults.title;
  const displayDescription = description || defaults.description;

  return (
    <div className={`order-empty-state ${className}`}>
      <div className='empty-state-icon'>{displayIcon}</div>
      <h3>{displayTitle}</h3>
      <p>{displayDescription}</p>
    </div>
  );
}
