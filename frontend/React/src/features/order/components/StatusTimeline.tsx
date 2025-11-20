/**
 * Status Timeline Component
 * Displays the order status progression timeline
 */

import { isStatusCompleted, ORDER_STATUSES } from '../utils/orderStatus';

interface StatusTimelineProps {
  currentStatus?: string;
  className?: string;
}

export function StatusTimeline({ currentStatus, className = '' }: StatusTimelineProps) {
  return (
    <div className={`order-timeline ${className}`}>
      {ORDER_STATUSES.map((status) => {
        const isActive = currentStatus === status;
        const isPast = isStatusCompleted(currentStatus, status);

        return (
          <div
            key={status}
            className={`timeline-item ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
          >
            <div className='timeline-dot'>{isPast && <span>✓</span>}</div>
            <div className='timeline-label'>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
          </div>
        );
      })}
    </div>
  );
}
