import { ReactElement, Suspense, lazy, useCallback } from 'react';

import { Loader } from '@kleeen/react/components';
import classnames from 'classnames';
import { useStyles } from './custom-view.styles';

const bem = 'ks-custom-view';

// TODO: add props interface
export const CustomView = ({ widget }, ...props: any[]): ReactElement => {
  const classes = useStyles();
  const widgetComponent = widget?.component;

  const customWidgetProps = {
    ...props,
    className: classnames(bem, classes.divContainer),
    key: widget.id,
    title: widget.title,
  };

  const CustomWidget = useCallback(
    lazy(() => import(`../../../../../../../apps/cloud/src/app/modules/custom/${widgetComponent}`)),
    [widgetComponent],
  );

  return (
    <Suspense fallback={<Loader />}>
      <CustomWidget {...customWidgetProps} />
    </Suspense>
  );
};

export default CustomView;
