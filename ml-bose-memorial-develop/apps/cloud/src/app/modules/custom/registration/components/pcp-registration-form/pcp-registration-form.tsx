import * as Yup from 'yup';

import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { KUIConnect } from '@kleeen/core-react';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { PCPRegistrationFormElementInputs, PCPRegistrationFormProps } from './pcp-registration-form.model';
import { FormHeader } from '../form-header/form-header';
import {
  cellularNumberField,
  emailField,
  personalInfoFields,
  workNumberField,
  officeDaysField,
  officeHoursField,
  insurancePlansAcceptedField,
  BasicFeeField,
  SpecialistFeeField,
  MedicareAccepted,
} from './pcp-registration-fields';

import { useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';
import { PCPSimpleGroupFormFields } from '../form-fields/simple-group-form-fields';
import { PCPSingleFormFields } from '../form-fields/single-form-fields';
import { PCPSinglePhoneFormFields } from '../form-fields/single-phone-form-fields';
import { PCPSingleCheckGroupFormFields } from '../form-fields/single-check-group-form-fields';
import { PCPSingleRadioFormFields } from '../form-fields/single-radio-form-fields';
import { KsButton, Loader } from '@kleeen/react/components';
import { useMember } from '../../hooks';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { PhoneNumber } from '../../../components/auth/components/auth.styles';

const entityName = 'pcpMember';
const taskName = 'registration';
const medicareAcceptedOptions = [
  {
    label: 'Yes',
    value: '1',
  },
  {
    label: 'No',
    value: '0',
  },
];
const daysOptions = [
  {
    label: 'Monday',
    value: 'Monday',
  },
  {
    label: 'Tuesday',
    value: 'Tuesday',
  },
  {
    label: 'Wednesday',
    value: 'Wednesday',
  },
  {
    label: 'Thursday',
    value: 'Thursday',
  },
  {
    label: 'Friday',
    value: 'Friday',
  },
  {
    label: 'Saturday',
    value: 'Saturday',
  },
  {
    label: 'Sunday',
    value: 'Sunday',
  },
];
export const PCPRegistrationForm = KUIConnect(({ translate }) => ({
  translate,
}))(PCPRegistrationFormBase);

function PCPRegistrationFormBase({ translate }) {
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
    defaultValues: entity,
    resolver: yupResolver(validationSchema),
  };
  const { control, formState, handleSubmit, register, reset } =
    useForm<PCPRegistrationFormProps>(formOptions);
  const fields = getFields();

  useEffect(() => {
    reset(entity);
  }, [entity]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '50px' }}>
      <input id="formType" type="hidden" value="submit" {...register('formType')} />
      <Grid container>
        <FormHeader formTitle={'PCP Form Registration.'} />

        <PCPSimpleGroupFormFields
          fields={fields}
          fieldsName={'Name'}
          errors={formState.errors}
          register={register}
        />

        <PCPSingleFormFields
          field={emailField}
          fieldsName={'E-mail'}
          errors={formState.errors}
          register={register}
        />

        <PCPSinglePhoneFormFields
          control={control}
          disabled
          field={cellularNumberField}
          fieldsName={'Cellular Number'}
          errors={formState.errors}
          register={register}
          value={phoneNumber}
        />

        <PCPSinglePhoneFormFields
          control={control}
          field={workNumberField}
          fieldsName={'Work Number'}
          errors={formState.errors}
          register={register}
          value={isNilOrEmpty(entity) ? null : entity.workNumber}
        />

        <PCPSingleCheckGroupFormFields
          control={control}
          errors={formState.errors}
          field={officeDaysField}
          fieldsName={'Office Days'}
          options={daysOptions}
          register={register}
          defaultValue={isNilOrEmpty(entity) ? null : entity.officeDays}
        />

        <PCPSingleFormFields
          errors={formState.errors}
          field={officeHoursField}
          fieldsName={'Office Hours'}
          helperText={'Example: 9am-5pm PST'}
          register={register}
        />

        <PCPSingleFormFields
          errors={formState.errors}
          field={insurancePlansAcceptedField}
          fieldsName={'Insurance Plans Accepted'}
          helperText={'Separate Carriers with a Comma'}
          register={register}
        />

        <PCPSingleFormFields
          errors={formState.errors}
          field={BasicFeeField}
          fieldsName={'Basic Fee'}
          register={register}
        />

        <PCPSingleFormFields
          errors={formState.errors}
          field={SpecialistFeeField}
          fieldsName={'Specialist Fee'}
          register={register}
        />

        <PCPSingleRadioFormFields
          control={control}
          errors={formState.errors}
          field={MedicareAccepted}
          fieldsName={'Medicare Accepted *'}
          options={medicareAcceptedOptions}
          register={register}
          value={isNilOrEmpty(entity) ? null : Number(entity.medicareAccepted).toString()}
        />

        <Grid item xs={10} sm={10}>
          <SubmitButton member={entity} />
        </Grid>
      </Grid>
    </form>
  );
}

// //#region Private PCPs
function buildValidationSchema(translate) {
  return Yup.object().shape({
    firstName: Yup.string().required(translate('pcpRegistration.submit.errors.first.name')),
    lastName: Yup.string().required(translate('pcpRegistration.submit.errors.last.name')),
    medicareAccepted: Yup.boolean().required(translate('pcpRegistration.submit.errors.last.name')),
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
      data-testid={PCPRegistrationFormElementInputs.SubmitButton}
      fullWidth
      size="large"
      type="submit"
    >
      {isNilOrEmpty(member) ? 'Submit' : 'Update'}
    </KsButton>
  );
}

function useFormAction({ actions, entityKey, entity, phoneNumber }) {
  async function onSubmit(data: PCPRegistrationFormProps) {
    try {
      if (isNilOrEmpty(entity)) {
        const payload = {
          entityKey,
          entity: {
            ...data,
            cellularNumber: phoneNumber,
            officeDays: data.officeDays ? data.officeDays.toString() : '',
          },
        };

        actions.addRequest(payload);
      } else {
        actions.updateRequest({
          entity: entityKey,
          params: {
            ...entity,
            ...data,
            officeDays: data.officeDays ? data.officeDays.toString() : '',
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
