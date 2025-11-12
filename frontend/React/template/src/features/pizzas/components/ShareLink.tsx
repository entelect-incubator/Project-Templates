/**
 * Share Link Component
 * Allows users to copy a shareable tracking link
 */

import { useMemo, useState } from 'react';
import { copyToClipboard } from '../../../lib/utils';

interface ShareLinkProps {
  orderId: number | string;
  className?: string;
}

export function ShareLink({ orderId, className = '' }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shareUrl = useMemo(() => {
    return `${window.location.origin}/order/${orderId}`;
  }, [orderId]);

  const handleCopyLink = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const success = await copyToClipboard(shareUrl);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    setIsLoading(false);
  };

  return (
    <div className={`order-share-section ${className}`}>
      <p>Share your tracking link:</p>
      <div className='share-controls'>
        <input
          type='text'
          readOnly
          value={shareUrl}
          className='share-link-input'
          aria-label='Shareable tracking link'
        />
        <button
          type='button'
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopyLink}
          disabled={isLoading}
          aria-label={copied ? 'Link copied!' : 'Copy link'}
        >
          {copied ? '✓ Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
