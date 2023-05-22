import * as Yup from 'yup';

import { Button, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { KUIConnect } from '@kleeen/core-react';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import {
  DonorRegistrationFormElementInputs,
  DonorRegistrationFormProps,
} from './donor-registration-form.model';
import { FormHeader } from '../form-header/form-header';

import {
  addressFields,
  annualCommitmentField,
  annualCommitmentForPersonField,
  askByPersonField,
  businessField,
  cellularNumberField,
  donatingToPerson,
  emailField,
  faxNumberField,
  maxPerTransactionField,
  minPerTransactionField,
  personalInfoFields,
} from './donor-registration-fields';
import { useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';
import { DonorAddressGroupFormFields } from '../form-fields/address-group-form-fields';
import { DonorSingleFormFields } from '../form-fields/single-form-fields';
import { DonorSinglePhoneFormFields } from '../form-fields/single-phone-form-fields';
import { DonorSimpleGroupFormFields } from '../form-fields/simple-group-form-fields';
import { DonorSingleRadioFormFields } from '../form-fields/single-radio-form-fields';
import { useMember } from '../../hooks';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { Loader } from '@kleeen/react/components';
import { formatPhoneNumber } from '../../../components/auth/components/utils';

const entityName = 'donorName';
const taskName = 'registration';
const donatingOptions = [
  {
    label: 'Yes',
    value: '1',
  },
  {
    label: 'No',
    value: '0',
  },
];

export const DonorRegistrationForm = KUIConnect(({ translate }) => ({
  translate,
}))(DonorRegistrationFormBase);

function DonorRegistrationFormBase({ translate }) {
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
  const formOptions = { defaultValues: entity, resolver: yupResolver(validationSchema) };
  const { control, formState, handleSubmit, register, reset } =
    useForm<DonorRegistrationFormProps>(formOptions);
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
        <FormHeader formTitle={'Donor Form registration.'} />
        <DonorSimpleGroupFormFields
          fields={fields}
          fieldsName={'Name'}
          errors={formState.errors}
          register={register}
        />
        <DonorSingleFormFields
          field={businessField}
          fieldsName={'Provide your business name if donating as a business?'}
          errors={formState.errors}
          register={register}
        />
        <DonorAddressGroupFormFields
          control={control}
          errors={formState.errors}
          fields={addressFields}
          fieldsName={'Address'}
          register={register}
          value={isNilOrEmpty(entity) ? null : entity.country}
        />
        <DonorSingleFormFields
          field={emailField}
          fieldsName={'E-mail'}
          errors={formState.errors}
          register={register}
        />
        <DonorSinglePhoneFormFields
          control={control}
          disabled
          field={cellularNumberField}
          fieldsName={'Cellular Number'}
          errors={formState.errors}
          register={register}
          value={phoneNumber}
        />
        <DonorSinglePhoneFormFields
          control={control}
          field={faxNumberField}
          fieldsName={'Fax Number'}
          errors={formState.errors}
          register={register}
          value={isNilOrEmpty(entity) ? null : entity.faxNumber}
        />
        <DonorSingleFormFields
          field={annualCommitmentField}
          fieldsName={'Annual Commitment'}
          errors={formState.errors}
          register={register}
        />
        <DonorSingleRadioFormFields
          control={control}
          errors={formState.errors}
          field={donatingToPerson}
          fieldsName={'Are you donating to a specific person?'}
          options={donatingOptions}
          register={register}
          value={isNilOrEmpty(entity) ? null : entity.donatingToPerson}
        />
        <DonorSingleFormFields
          field={askByPersonField}
          fieldsName={'If Yes, what is that person´s name?'}
          errors={formState.errors}
          register={register}
        />
        <DonorSingleFormFields
          field={annualCommitmentForPersonField}
          fieldsName={'Annual Commitment for person'}
          errors={formState.errors}
          register={register}
        />
        <DonorSingleFormFields
          field={minPerTransactionField}
          fieldsName={'Minimum Per Transaction?'}
          errors={formState.errors}
          register={register}
        />
        <DonorSingleFormFields
          field={maxPerTransactionField}
          fieldsName={'Maximum Per Transaction?'}
          errors={formState.errors}
          register={register}
        />
        <Grid item xs={10} sm={10}>
          <SubmitButton member={entity} />
        </Grid>
      </Grid>
    </form>
  );
}

// //#region Private donors
function buildValidationSchema(translate) {
  return Yup.object().shape({
    firstName: Yup.string().required(translate('donorRegistration.submit.errors.first.name')),
    lastName: Yup.string().required(translate('donorRegistration.submit.errors.last.name')),
    donatingToPerson: Yup.boolean().required(translate('donorRegistration.submit.errors.last.name')),
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
    <Button
      data-testid={DonorRegistrationFormElementInputs.SubmitButton}
      fullWidth
      size="large"
      type="submit"
      variant="contained"
    >
      {isNilOrEmpty(member) ? 'Submit' : 'Update'}
    </Button>
  );
}

function useFormAction({ actions, entityKey, entity, phoneNumber }) {
  async function onSubmit(data: DonorRegistrationFormProps) {
    try {
      if (isNilOrEmpty(entity)) {
        const payload = {
          entityKey,
          entity: {
            ...data,
            cellularNumber: phoneNumber,
            faxNumber: formatPhoneNumber(data.faxNumber.toString()),
          },
        };
        actions.addRequest(payload);
      } else {
        actions.updateRequest({
          entity: entityKey,
          params: {
            ...entity,
            ...data,
            faxNumber: formatPhoneNumber(data.faxNumber.toString()),
          },
        });
      }
    } catch (e) {}
  }

  return { onSubmit };
}
// //#endregion
