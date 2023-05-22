import './CardSection02.scss';

import { AccessControlPermission, Widget } from '@kleeen/types';
import { CardSectionProps, RenderChildrenProps } from './CardWidget.model';
import React, { ReactElement, ReactNode, createRef, useRef } from 'react';
import { TableContent, TransformToWidgetComponent } from './components';

import { CardWidget02 } from './CardWidget02';
import { addCurrentWidgetTypeToViableSolutions } from './utils';
import classnames from 'classnames';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { useAccessControlCheckerByIds } from '@kleeen/core-react';

const bem = 'ks-card-section-02';

export const CardSection02 = ({
  children,
  containerId,
  fullWidth,
  hideSaveAndClose,
  hideTOC,
  justifyContent = 'flex-start',
  onInputChange,
  registerEvents,
  skipAccessControlCheck = false,
  taskName,
  widgets = [],
}: CardSectionProps): ReactElement => {
  const widgetsRefs = {};
  let filteredWidgets = [];

  const refsArray = useRef([]);
  refsArray.current = widgets.map((widget) => refsArray.current[widget.id] ?? createRef());

  if (!hideTOC) {
    widgets?.forEach((widget, i) => {
      widgetsRefs[widget.id] = refsArray.current[i];
    });
  }

  if (!skipAccessControlCheck) {
    const widgetIds = widgets.map((widget) => ({
      id: widget.id,
      roleId: roleAccessKeyTag(`${taskName}.WIDGETS.${widget.id}`),
    }));
    const permissions = useAccessControlCheckerByIds(widgetIds);

    filteredWidgets = widgets.filter((widget) => permissions[widget.id] === AccessControlPermission.SHOW);
  }

  return (
    <div
      className={classnames(bem, 'card-section02', { 'hide-toc': hideTOC, 'full-width': fullWidth })}
      key={`card-section-${taskName}`}
      style={{ justifyContent }}
    >
      {!hideTOC && (
        <TableContent widgets={filteredWidgets} widgetsRefs={widgetsRefs} containerId={containerId} />
      )}
      <div
        className={classnames(`${bem}__widgets`, 'card-widgets-section', { 'full-width': fullWidth })}
        data-testid="card-widgets-section"
      >
        {renderChildren({
          children,
          hideSaveAndClose,
          onInputChange,
          registerEvents,
          taskName,
          widgets: filteredWidgets,
          widgetsRefs,
        })}
      </div>
    </div>
  );
};

export default React.memo(CardSection02);

//#region Private members
function renderChildren({
  children,
  hideSaveAndClose,
  onInputChange,
  registerEvents,
  taskName,
  widgets,
  widgetsRefs,
}: RenderChildrenProps): JSX.Element | ReactNode {
  if (widgets && !children) {
    return widgets.map((widget: Widget, widgetIndex) => {
      const widgetCompleted = addCurrentWidgetTypeToViableSolutions(widget);

      return (
        <div ref={widgetsRefs[widget.id]} id={widget?.id?.toString()}>
          <TransformToWidgetComponent
            hideSaveAndClose={hideSaveAndClose}
            key={`card-section-widget-${widget.id}-${widgetIndex}`}
            onInputChange={onInputChange}
            registerEvents={registerEvents}
            taskName={taskName}
            widget={widgetCompleted}
            CardWidgetElement={CardWidget02}
          />
        </div>
      );
    });
  }

  if (typeof children === 'function') {
    return children({ widgetsRefs });
  }

  return children;
}
//#endregion
