import './Header.scss';

import {
  ActionsManagerProps,
  KsAutoRefreshControl,
  KsRefreshControl,
  useKsActionsManager,
} from '@kleeen/react/components';

import { ReactElement } from 'react';
import classnames from 'classnames';
import { isEmpty } from 'ramda';
import { useStyles } from './Header.style';

const bem = 'ks-header';

export function KsHeader(props: {
  actionsProps: ActionsManagerProps;
  hideRefreshControl: boolean;
  onRefresh: () => void;
  subTitle?: string;
  title: string | JSX.Element;
  upText?: string;
  withoutSubHeader?: boolean;
}): ReactElement {
  const { KsActionDialogs, KsActionsSection } = useKsActionsManager(props.actionsProps);
  const classes = useStyles(props);
  const { actions } = props.actionsProps;

  return (
    <>
      <header
        className={classnames(
          bem,
          'main-header',
          classes.header,
          `${props.withoutSubHeader && classes.withoutSubHeader} dataview`,
        )}
      >
        {/**TODO KSE3-4140 implement ks title here**/}
        <div className={classnames(`${bem}__container`, classes.infoContainer)}>
          <h5 className={classnames(`${bem}__title--up`, classes.withoutMargin)}>{props.upText}</h5>
          <h3 className={classnames(`${bem}__title`, classes.mainTitle)}>{props.title}</h3>
          <h5 className={classnames(`${bem}__title--sub`, classes.withoutMargin)}>{props.subTitle}</h5>
        </div>
        <div className="refresh-control-header">
          {!props.hideRefreshControl && (
            <>
              <KsRefreshControl onRefresh={props.onRefresh} taskName={props.actionsProps.taskName} />
              <KsAutoRefreshControl taskName={props.actionsProps.taskName} onRefresh={props.onRefresh} />
            </>
          )}
        </div>
        {!isEmpty(actions) && (
          <div className={classnames(`${bem}__actions`, classes.actionsContainer)}>{KsActionsSection}</div>
        )}
      </header>
      {KsActionDialogs}
    </>
  );
}
