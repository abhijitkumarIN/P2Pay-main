import React from 'react';
import { KUIConnect } from '@kleeen/core-react';
import { DonorRegistrationForm } from './donor-registration-form/donor-registration-form';
import { CardWidget } from '@kleeen/react/atomic-elements';

function CustomViewPae8HT2Fax6CcoADaYvh6P({ translate, ...widget }) {
  return (
    <CardWidget title="" icon={false}>
      <DonorRegistrationForm />
    </CardWidget>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(CustomViewPae8HT2Fax6CcoADaYvh6P);
