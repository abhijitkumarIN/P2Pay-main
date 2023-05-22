import {
  AccessControlCheckArgs,
  AccessControlCheckResults,
  FormatCheckArgs,
  FormatCheckResults,
} from '../../../types';

import { AccessControlPermission } from '@kleeen/types';
import { RESTDataSource } from 'apollo-datasource-rest';
import { getThingByName } from '@kleeen/things';

export class FormatCheckFakeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://localhost:3030/';
  }

  async formatCheck({ formField, formValue }: FormatCheckArgs): Promise<FormatCheckResults> {
    // TODO: validate when the thing is undefined. Should an error be throw?
    const { formatType } = getThingByName(formField) || {};

    // TODO: Move these to a common place.
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const hasSingleAt = /@{1}/g;

    const isValidDomain =
      /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    const errors: { message: string }[] = [];

    const hasMultipleAt = () => formValue.replace(/[^@]/g, '').length > 1;
    const isMissingAt = () => !hasSingleAt.test(formValue);
    const hasSpaces = () => formValue.replace(/[^ ]/g, '').length > 0;
    const isInvalidDomain = () => !isValidDomain.test(formValue);
    const isEmailInvalid = () => !emailRegEx.test(formValue);

    const addError = (message: string) => {
      errors.push({ message });
    };

    if (formatType === 'email' && isEmailInvalid()) {
      isValid = false;
      if (isMissingAt()) {
        addError("You are missing '@' on your email address");
      }
      if (hasMultipleAt()) {
        addError('Multiple "@" are not allowed');
      }
      if (hasSpaces()) {
        addError('No spaces are allowed');
      }
      if (isInvalidDomain()) {
        addError('Please write a valid domain');
      }
    }
    return { isValid, errors };
  }

  async accessControlCheck(args: AccessControlCheckArgs): Promise<AccessControlCheckResults> {
    return { accessLevel: AccessControlPermission.SHOW };
  }
}
