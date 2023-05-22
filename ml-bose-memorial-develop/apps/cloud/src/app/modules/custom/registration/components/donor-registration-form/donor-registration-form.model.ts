export enum AddressField {
  City = 'city',
  Country = 'country',
}

export enum DonorRegistrationFormElementInputs {
  AnnualCommitmentForPersonHelperText = 'members-registration-annual-commitment-for-person--helper-text',
  AnnualCommitmentForPersonInput = 'members-registration-annual-commitment-for-person-input',
  AnnualCommitmentHelperText = 'members-registration-annual-commitment-helper-text',
  AnnualCommitmentInput = 'members-registration-annual-commitment-input',
  AskByPersonHelperText = 'members-registration-ask-by-person-helper-text',
  AskByPersonInput = 'members-registration-ask-by-person--input',
  BusinessHelperText = 'members-registration-business-helper-text',
  BusinessInput = 'members-registration-business--input',
  CellularNumberHelperText = 'members-registration-cellular-number-helper-text',
  CellularNumberInput = 'members-registration-cellular-number-input',
  CityHelperText = 'members-registration-city-helper-text',
  CityInput = 'members-registration-city-input',
  CountryHelperText = 'members-registration-country-helper-text',
  CountryInput = 'members-registration-country-input',
  DonatingToPersonHelperText = 'members-registration-donating-to-person-helper-text',
  DonatingToPersonInput = 'members-registration-donating-to-person-input',
  EmailHelperText = 'members-registration-email-helper-text',
  EmailInput = 'members-registration-email-input',
  FaxNumberHelperText = 'members-registration-fax-number-helper-text',
  FaxNumberInput = 'members-registration-fax-number-input',
  FirstNameHelperText = 'members-registration-first-name-helper-text',
  FirstNameInput = 'members-registration-first-name-input',
  LastNameHelperText = 'members-registration-last-name-helper-text',
  LastNameInput = 'members-registration--last-name-input',
  MaxPerTransactionHelperText = 'members-registration-max-per-transaction-helper-text',
  MaxPerTransactionInput = 'members-registration-max-per-transaction-input',
  MinPerTransactionHelperText = 'members-registration-min-per-transaction-helper-text',
  MinPerTransactionInput = 'members-registration-min-per-transaction-input',
  StateHelperText = 'members-registration-state-helper-text',
  StateInput = 'members-registration-state-input',
  StreetAddressHelperText = 'members-registration-street-address-helper-text',
  StreetAddressInput = 'members-registration-street-address-input',
  StreetAddressLine2HelperText = 'members-registration-street-address-line2-helper-text',
  StreetAddressLine2Input = 'members-registration-street-address-line2-input',
  SubmitButton = 'submit-button',
  ZipCodeHelperText = 'members-registration-zip-code-helper-text',
  ZipCodeInput = 'members-registration-zip-code-input',
}

export interface DonorRegistrationFormProps {
  annualCommitment: string;
  annualCommitmentForPerson: string;
  askByPerson: string;
  business: string;
  cellularNumber: string;
  city: string;
  country: string;
  donatingToPerson: string;
  email: string;
  faxNumber: string;
  firstName: string;
  formType: string;
  lastName: string;
  maxPerTransaction: string;
  minPerTransaction: string;
  state: string;
  streetAddress: string;
  streetAddressLine2: string;
  zipCode: number;
}
