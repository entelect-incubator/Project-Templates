import styles from './FormDisclaimer.module.scss';

interface FormDisclaimerProps {
  /**
   * Custom disclaimer text. Defaults to standard form disclaimer.
   * @example "* Required fields. Your information is secure and will only be used for order delivery."
   */
  text?: string;
  /**
   * Optional CSS class name for additional styling
   */
  className?: string;
}

/**
 * FormDisclaimer Component
 * Displays a standardized disclaimer message for forms
 * Used across all form components for consistency
 */
export const FormDisclaimer = ({
  text = '* Required fields. Your information is secure and will only be used for order delivery.',
  className,
}: FormDisclaimerProps) => {
  return <p className={`${styles['disclaimer']} ${className || ''}`}>{text}</p>;
};

export default FormDisclaimer;
