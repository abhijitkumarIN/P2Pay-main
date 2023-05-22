import { KsScatter } from '../../scatter';
import { Loader } from '@kleeen/react/components';
import { ReactElement } from 'react';
import { WidgetProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './scatter-widget.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

export function ScatterWidget({ attributes, params, taskName, widgetId }: WidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (isNilOrEmpty(widgetData)) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <KsScatter attributes={attributes} context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}
