/**
 * Checkout Steps Indicator Component
 * Displays the current step in the checkout process
 */

interface CheckoutStepsProps {
  currentStep: 'review' | 'customer-info' | 'confirmation';
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: 'review', number: 1, label: 'Review Order' },
    { id: 'customer-info', number: 2, label: 'Customer Info' },
    { id: 'confirmation', number: 3, label: 'Confirmation' },
  ] as const;

  return (
    <div className='checkout-page__header'>
      <h1>Checkout</h1>
      <div className='checkout-page__steps'>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`step ${
              currentStep === step.id
                ? 'active'
                : steps.findIndex((s) => s.id === currentStep) >
                    steps.findIndex((s) => s.id === step.id)
                  ? 'completed'
                  : ''
            }`}
          >
            <span className='step-number'>{step.number}</span>
            <span className='step-label'>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
