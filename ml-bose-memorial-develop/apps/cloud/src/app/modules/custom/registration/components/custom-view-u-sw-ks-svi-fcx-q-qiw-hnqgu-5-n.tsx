import React from 'react';
import { KUIConnect } from '@kleeen/core-react';
import { PWIRegistrationForm } from './pwi-registration-form/pwi-registration-form';
import { CardWidget } from '@kleeen/react/atomic-elements';

function CustomViewUSwKsSviFcxQQiwHnqgu5N({ translate, ...widget }) {
  return (
    <CardWidget title="" icon={false}>
      <PWIRegistrationForm />
    </CardWidget>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(CustomViewUSwKsSviFcxQQiwHnqgu5N);
