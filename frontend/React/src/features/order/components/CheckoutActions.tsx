/**
 * Checkout Actions Component
 * Reusable action buttons for checkout steps
 */

import { Button } from '@/components';

interface CheckoutActionsProps {
  onBack: () => void;
  onContinue?: () => void;
  backLabel?: string;
  continueLabel?: string;
  showContinue?: boolean;
}

export function CheckoutActions({
  onBack,
  onContinue,
  backLabel = 'Back',
  continueLabel = 'Continue',
  showContinue = true,
}: CheckoutActionsProps) {
  return (
    <div className='checkout-actions'>
      <Button variant='secondary' onClick={onBack} className='btn btn--secondary'>
        {backLabel}
      </Button>
      {showContinue && (
        <Button variant='primary' onClick={onContinue} className='btn btn--primary'>
          {continueLabel}
        </Button>
      )}
    </div>
  );
}
