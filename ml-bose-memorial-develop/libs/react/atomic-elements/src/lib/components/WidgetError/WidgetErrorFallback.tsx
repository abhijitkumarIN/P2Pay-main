import './WidgetError.styles.scss';
import { CardWidget } from '@kleeen/react/atomic-elements';
import { environment } from '@kleeen/environment';
import { useTheme } from '@kleeen/react/hooks';
import classnames from 'classnames';
import { app } from '@kleeen/settings';

import { KsIcon } from '@kleeen/react/components';
import { isNilOrEmpty } from '@kleeen/common/utils';

function WidgetErrorFallback({ error, info }): JSX.Element {
  const { themeClass } = useTheme();
  const bem = 'ks-error-fallback';
  return (
    <div className={classnames(bem, themeClass, 'error-widget')}>
      <div className={'container-robot'}>
        <KsIcon icon="ks-robot"></KsIcon>
      </div>
      <CardWidget title="Oops, something went wrong!" icon={false}>
        <div>
          <div className={classnames(`${bem}__version`, 'error-version')}>
            <span>Product Version: {environment.deployment.version}</span>
            <br />
            {!isNilOrEmpty(app.rootVersion) && <span>Root Version: {app.rootVersion}</span>}
          </div>
          <p>{error?.message}</p>
          <div
            className={classnames(`${bem}__log`, 'error-log')}
            onClick={() => navigator.clipboard.writeText(`${error?.message} \n ${info?.componentStack}`)}
          >
            {info?.componentStack}
          </div>
        </div>
      </CardWidget>
    </div>
  );
}

export default WidgetErrorFallback;
