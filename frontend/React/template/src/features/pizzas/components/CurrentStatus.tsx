/**
 * Current Status Component
 * Displays the current order status with icon and timestamp
 */

import { formatDate } from '../../../lib/utils';
import { getStatusColor, getStatusIcon, getStatusLabel } from '../utils/orderStatus';

interface CurrentStatusProps {
  status?: string;
  createdAt?: string;
  className?: string;
}

export function CurrentStatus({ status, createdAt, className = '' }: CurrentStatusProps) {
  return (
    <div className={`order-current-status ${getStatusColor(status)} ${className}`}>
      <div className='status-icon'>{getStatusIcon(status)}</div>
      <div className='status-info'>
        <p className='status-label'>{getStatusLabel(status)}</p>
        <p className='status-time'>Ordered: {formatDate(createdAt)}</p>
      </div>
    </div>
  );
}
