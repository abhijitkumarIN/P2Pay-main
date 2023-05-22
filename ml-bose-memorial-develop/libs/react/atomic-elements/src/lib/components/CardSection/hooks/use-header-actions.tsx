import { Widget, WidgetScope } from '@kleeen/types';
import { useEffect, useState } from 'react';

import { ActionsDropdown } from '../components/actions-dropdown/actions-dropdown';
import { getInvestigationSimpleActions } from '@kleeen/react/hooks';
import { isNotNilOrEmpty } from '@kleeen/common/utils';
import { isTableWidget } from '@kleeen/widgets';

interface UseHeaderActionsProps {
  widget: Widget;
}

const actionsName = 'ksInvestigation';
const taskName = 'investigation';

export function useHeaderActions({ widget: widgetData }: UseHeaderActionsProps): JSX.Element | null {
  const [headerActionsComponent, setHeaderActionsComponent] = useState<JSX.Element>(null);
  const widget = transformWidgetsActionsForTables(widgetData);

  useEffect(() => {
    if (isNotNilOrEmpty(widget?.actions)) {
      setHeaderActionsComponent(
        <ActionsDropdown actionsName={actionsName} taskName={taskName} widget={widget} />,
      );
    }
  }, [widget.actions?.length]);

  return headerActionsComponent;
}

//#region Private members

function transformWidgetsActionsForTables(widget: Widget): Widget {
  const isSingleScopeWidget = widget.scope === WidgetScope.Single;

  return isTableWidget(widget.chartType) && isSingleScopeWidget
    ? {
        ...widget,
        entityId: widget.relatedEntityId,
        actions: getInvestigationSimpleActions(widget.relatedEntityId, widget.scope),
      }
    : widget;
}

//#endregion
