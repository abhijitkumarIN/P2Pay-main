import { Maybe } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface ValidationResponseErrorsProps {
  response: Maybe<{ isValid?: boolean; errors?: { message: string }[] }>;
  className?: string;
}

export const VALIDATION_RESPONSE_ERRORS_DATA_TESTID = 'validation-response-errors-element';

export function ValidationResponseErrors({
  response,
  className = '',
}: ValidationResponseErrorsProps): JSX.Element | null {
  if (isNilOrEmpty(response?.errors) || response?.isValid) return null;

  return (
    <ul data-testid={VALIDATION_RESPONSE_ERRORS_DATA_TESTID} className={className}>
      {response?.errors.map((error, i) => {
        return <li key={error.message}>{error.message}</li>;
      })}
    </ul>
  );
}
