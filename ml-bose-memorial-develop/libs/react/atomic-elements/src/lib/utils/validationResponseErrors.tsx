import { Maybe } from '@kleeen/types';

/**
 * @deprecated use ValidationResponseErrors component instead.
 */
export function getValidationResponseErrors(
  response: Maybe<{ isValid?: boolean; errors?: { message: string }[] }>,
  className: string,
): JSX.Element | null {
  const { isValid, errors } = response || {};

  if (!Array.isArray(errors) || isValid) return null;

  return (
    <ul className={className}>
      {errors.map((error, i) => {
        return <li>{error.message}</li>;
      })}
    </ul>
  );
}
