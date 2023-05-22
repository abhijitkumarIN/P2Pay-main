import { ActionType, ThingAction, Widget, WidgetScope } from '@kleeen/types';

import { State } from '@kleeen/react/state-management';
import { getThingById } from '@kleeen/things';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useKleeenContext } from './useKleeenContext';

const INVESTIGATE_SUFFIX = '-investigation-';

export type AddInvestigationWidgetProperties = (widget: Widget) => Widget;

export function addInvestigationWidgetProperties({
  index,
  widget,
}: {
  index: number;
  widget: Widget;
}): Widget {
  return {
    ...widget,
    actions: getInvestigationSimpleActions(widget.entityId, widget.scope),
    id: `${widget.id}${INVESTIGATE_SUFFIX}${index}`,
  };
}

// This function is to remove the suffix from widgets that need the original id
// TODO: @marimba we should use another key for those cases
export function removeInvestigateSuffix(widgetId: string) {
  return widgetId.substring(0, widgetId.indexOf(INVESTIGATE_SUFFIX));
}

export function useAddInvestigateWidgetProperties(): AddInvestigationWidgetProperties {
  const { investigationWidgets } = useKleeenContext<State.InvestigationState>('ksInvestigation');

  return (widget: Widget) =>
    isNilOrEmpty(investigationWidgets)
      ? widget
      : addInvestigationWidgetProperties({ widget, index: investigationWidgets?.length });
}

export function getInvestigationSimpleActions(entityId: number, scope: WidgetScope): ThingAction[] {
  if (scope !== WidgetScope.Single) return [];

  const isNotDeleteAdd = (e: ThingAction) => ![ActionType.Add, ActionType.Delete].includes(e.type);

  const thing = getThingById(entityId);
  if (isNilOrEmpty(thing)) return [];

  const actions = thing.actions.filter(isNotDeleteAdd);

  return actions;
}
