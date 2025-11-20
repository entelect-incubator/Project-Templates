import type { ButtonHTMLAttributes } from 'react';
import { Button } from './Button';

interface SubmitButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  label: string;
  isLoading?: boolean;
  loadingLabel?: string;
}

export function SubmitButton({
  label,
  isLoading = false,
  loadingLabel = 'Processing...',
  ...props
}: SubmitButtonProps) {
  return (
    <Button type='submit' isLoading={isLoading} {...props}>
      {isLoading ? loadingLabel : label}
    </Button>
  );
}
