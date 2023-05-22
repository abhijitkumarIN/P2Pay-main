import React from 'react';
import { KUIConnect } from '@kleeen/core-react';

import { PCPRegistrationForm } from './pcp-registration-form/pcp-registration-form';
import { CardWidget } from '@kleeen/react/atomic-elements';

function CustomViewGBmpAGzL3X6Rk4NNteUmZa({ translate, ...widget }) {
  return (
    <CardWidget title="" icon={false}>
      <PCPRegistrationForm />
    </CardWidget>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(CustomViewGBmpAGzL3X6Rk4NNteUmZa);
