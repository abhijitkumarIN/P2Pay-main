import * as Yup from 'yup';

import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { KUIConnect } from '@kleeen/core-react';

import { PWISinglePhoneFormFields } from '../form-fields/single-phone-form-fields';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { PWIRegistrationFormElementInputs, PWIRegistrationFormProps } from './pwi-registration-form.model';
import { FormHeader } from '../form-header/form-header';

import {
  addressFields,
  balanceDueField,
  birthdayField,
  businessPhoneNumberField,
  cellularNumberField,
  genderField,
  pcpIdField,
  personalInfoFields,
  registrationDateField,
} from './pwi-registration-fields';
import { useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';
import { PWISimpleGroupFormFields } from '../form-fields/simple-group-form-fields';
import { PWISingleFormFields } from '../form-fields/single-form-fields';
import { PWISingleSelectFormField } from '../form-fields/single-select-form-field';
import { PWIAddressGroupFormFields } from '../form-fields/address-group-form-fields';
import { KsButton, Loader } from '@kleeen/react/components';
import { formatPhoneNumber } from '../../../components/auth/components/utils';
import { useMember } from '../../hooks';
import { isNilOrEmpty } from '@kleeen/common/utils';

const entityName = 'patientsPcp';
const taskName = 'registration';
const genderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'I prefer not to say',
    value: 'I prefer not to say',
  },
];

export const PWIRegistrationForm = KUIConnect(({ translate }) => ({
  translate,
}))(PWIRegistrationFormBase);

function PWIRegistrationFormBase({ translate }) {
  const pcpMemberActions = useKleeenActions(taskName);
  const { currentUser } = useKleeenContext('endUser');
  const phoneNumber = currentUser?.attributes?.phone_number;
  const { entity, isLoading } = useMember(phoneNumber, entityName);

  const { onSubmit } = useFormAction({
    actions: pcpMemberActions,
    entityKey: entityName,
    entity,
    phoneNumber,
  });
  const validationSchema = buildValidationSchema(translate);
  const formOptions = {
    defaultValues: isNilOrEmpty(entity) ? {} : entity,
    resolver: yupResolver(validationSchema),
  };
  const { control, formState, handleSubmit, register, reset } =
    useForm<PWIRegistrationFormProps>(formOptions);
  const fields = getFields();

  useEffect(() => {
    if (!isNilOrEmpty(entity)) {
      reset(entity);
    }
  }, [entity]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '50px' }}>
      <input id="formType" type="hidden" value="submit" {...register('formType')} />
      <Grid container>
        <FormHeader formTitle={'PWI Form Registration.'} />

        <PWISimpleGroupFormFields
          errors={formState.errors}
          fields={fields}
          fieldsName={'Name'}
          register={register}
        />

        <PWISingleFormFields
          errors={formState.errors}
          field={birthdayField}
          fieldsName={'Birthday'}
          register={register}
        />

        <PWISingleSelectFormField
          control={control}
          errors={formState.errors}
          field={genderField}
          fieldsName={'Gender'}
          options={genderOptions}
          register={register}
        />

        <PWIAddressGroupFormFields
          errors={formState.errors}
          fields={addressFields}
          fieldsName={'Address'}
          register={register}
        />

        <PWISinglePhoneFormFields
          control={control}
          disabled
          errors={formState.errors}
          field={cellularNumberField}
          fieldsName={'Cellular Number'}
          register={register}
          value={phoneNumber}
        />

        <PWISinglePhoneFormFields
          control={control}
          errors={formState.errors}
          field={businessPhoneNumberField}
          fieldsName={'Business Phone'}
          register={register}
          value={entity?.businessPhoneNumber}
        />

        <PWISingleFormFields
          errors={formState.errors}
          field={pcpIdField}
          fieldsName={'PCP Id'}
          register={register}
        />

        <PWISingleFormFields
          errors={formState.errors}
          field={registrationDateField}
          fieldsName={'Registration Date'}
          register={register}
        />

        <PWISingleFormFields
          errors={formState.errors}
          field={balanceDueField}
          fieldsName={'Balance Due'}
          register={register}
        />

        <Grid item xs={10} sm={10}>
          <SubmitButton member={entity} />
        </Grid>
      </Grid>
    </form>
  );
}

// //#region Private PWIs
function buildValidationSchema(translate) {
  return Yup.object().shape({
    firstName: Yup.string().required(translate('pcpRegistration.submit.errors.first.name')),
    lastName: Yup.string().required(translate('pcpRegistration.submit.errors.last.name')),
  });
}

function getFields() {
  return personalInfoFields.map((field) => {
    return {
      ...field,
      inputProps: { 'data-testid': field.testId },
      label: field.label,
    };
  });
}

function SubmitButton({ member }) {
  return (
    <KsButton
      data-testid={PWIRegistrationFormElementInputs.SubmitButton}
      fullWidth
      size="large"
      type="submit"
    >
      {isNilOrEmpty(member) ? 'Submit' : 'Update'}
    </KsButton>
  );
}

function useFormAction({ actions, entityKey, entity, phoneNumber }) {
  async function onSubmit(data: PWIRegistrationFormProps) {
    try {
      if (isNilOrEmpty(entity)) {
        const payload = {
          entityKey,
          entity: {
            ...data,
            businessPhoneNumber: formatPhoneNumber(data.businessPhoneNumber.toString()),
            cellularNumber: phoneNumber,
          },
        };
        actions.addRequest(payload);
      } else {
        actions.updateRequest({
          entity: entityKey,
          params: {
            ...entity,
            ...data,
            businessPhoneNumber: formatPhoneNumber(data.businessPhoneNumber.toString()),
          },
        });
      }
    } catch (e) {
      console.log('error :: ', e);
    }
  }

  return { onSubmit };
}
// //#endregion
