export enum PWIRegistrationFormElementInputs {
  ApartmentNumberHelperText = 'pwi-registration-apartment-number-helper-text',
  ApartmentNumberInput = 'pwi-registration-apartment-number-input',
  BalanceDueHelperText = 'pwi-registration-balance-due-helper-text',
  BalanceDueInput = 'pwi-registration-balance-due-input',
  BirthdayHelperText = 'pwi-registration-birthday-helper-text',
  BirthdayInput = 'pwi-registration-birthday-input',
  BusinessPhoneNumberHelperText = 'pwi-registration-business-phoneNumber-helper-text',
  BusinessPhoneNumberInput = 'pwi-registration-business-phoneNumber-input',
  CellularNumberHelperText = 'pwi-registration-cellular-number-helper-text',
  CellularNumberInput = 'pwi-registration-cellular-number-input',
  FirstNameHelperText = 'pwi-registration-first-name-helper-text',
  FirstNameInput = 'pwi-registration-first-name-input',
  GenderHelperText = 'pwi-registration-gender-helper-text',
  GenderInput = 'pwi-registration-gender-input',
  LastNameHelperText = 'pwi-registration-last-name-helper-text',
  LastNameInput = 'pwi-registration-last-name-input',
  PcpIdHelperText = 'pwi-registration-pcp-id-helper-text',
  PcpIdInput = 'pwi-registration-pcp-id-input',
  RegistrationDateHelperText = 'pwi-registration-registration-date-helper-text',
  RegistrationDateInput = 'pwi-registration-registration-date-input',
  StreetAddressHelperText = 'pwi-registration-street-address-helper-text',
  StreetAddressInput = 'pwi-registration-street-address-input',
  SubmitButton = 'submit-button',
  ZipCodeHelperText = 'pwi-registration-zip-code-helper-text',
  ZipCodeInput = 'pwi-registration-zip-code-input',
}

export interface PWIRegistrationFormProps {
  apartmentNumber: string;
  balanceDue: number;
  birthday: Date;
  businessPhoneNumber: number;
  cellularNumber: number;
  firstName: string;
  formType: string;
  gender: string;
  lastName: string;
  pcpId: number;
  registrationDate: Date;
  streetAddress: string;
  zipCode: number;
}
