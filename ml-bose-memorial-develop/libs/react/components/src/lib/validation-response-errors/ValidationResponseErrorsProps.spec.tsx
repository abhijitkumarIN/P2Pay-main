import '@testing-library/jest-dom';

import * as React from 'react';

import { VALIDATION_RESPONSE_ERRORS_DATA_TESTID, ValidationResponseErrors } from './index';
import { render, screen } from '@testing-library/react';

interface ValidationResponseErrorsProps {
  isValid?: boolean;
  errors?: { message: string }[];
}

const invalidFormatEmail = 'Invalid Email';
const mustContainAtSymbol = 'Must contain @ symbol';

test('show empty document when there are no errors', () => {
  const response: ValidationResponseErrorsProps = {
    isValid: true,
  };
  render(<ValidationResponseErrors className="" response={response} />);

  expect(screen.queryByText(invalidFormatEmail)).not.toBeInTheDocument();
  expect(screen.queryByText(mustContainAtSymbol)).not.toBeInTheDocument();
  expect(screen.queryByTestId(VALIDATION_RESPONSE_ERRORS_DATA_TESTID)).not.toBeInTheDocument();
});

test('show errors when errors array contains messages', () => {
  const response: ValidationResponseErrorsProps = {
    errors: [
      {
        message: invalidFormatEmail,
      },
      {
        message: mustContainAtSymbol,
      },
    ],
  };
  render(<ValidationResponseErrors className="" response={response} />);

  expect(screen.getByText(invalidFormatEmail)).toBeInTheDocument();
  expect(screen.getByText(mustContainAtSymbol)).toBeInTheDocument();
});

test('show empty document when isValid is true even when there are errors', () => {
  const response: ValidationResponseErrorsProps = {
    errors: [
      {
        message: invalidFormatEmail,
      },
      {
        message: mustContainAtSymbol,
      },
    ],
    isValid: true,
  };
  render(<ValidationResponseErrors className="" response={response} />);

  expect(screen.queryByText(invalidFormatEmail)).not.toBeInTheDocument();
  expect(screen.queryByText(mustContainAtSymbol)).not.toBeInTheDocument();
  expect(screen.queryByTestId(VALIDATION_RESPONSE_ERRORS_DATA_TESTID)).not.toBeInTheDocument();
});
