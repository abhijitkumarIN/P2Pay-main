import { InvestigationCard, InvestigationWidget, Maybe } from '@kleeen/types';
import { getWidget, getWidgetsByEntity } from '@kleeen/widgets';

import { WidgetWithMetadata } from '../types';
import { getWidgetWithFilters } from '../utils';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function resolveInvestigationCardWidget(
  investigationCard: InvestigationCard,
): Maybe<InvestigationWidget> {
  // *Compute the best widget
  if (investigationCard.dataPoint) {
    const { entityId, scope, value } = investigationCard.dataPoint;
    const entityWidgets = getWidgetsByEntity({ entityId, scope });

    if (isNilOrEmpty(entityWidgets)) {
      return;
    }

    // *Decorate the widgets with the data point value
    const decoratedWidgetsByEntity = entityWidgets.map((widget) => ({
      ...widget,
      focusDataPointValue: value,
    }));

    // *If there's a specific widgetId, try to use that one
    if (!isNilOrEmpty(investigationCard.widgetId)) {
      const widgetIdMatch = decoratedWidgetsByEntity.find(
        (widget) => widget.id === investigationCard.widgetId,
      );

      if (isNilOrEmpty(widgetIdMatch)) {
        // TODO: Decide what to do if the requested widget id is not a valid solution
        // For now, return the first valid widget
        return decoratedWidgetsByEntity[0];
      }

      return widgetIdMatch;
    }

    // *There's no specified widget to use, return the first one from the widget library response
    return decoratedWidgetsByEntity[0];
  }

  // *There's no data point to evaluate, just try to find by widgetId
  if (!isNilOrEmpty(investigationCard.widgetId)) {
    const widget = getWidget(investigationCard.widgetId);
    if (widget) {
      return {
        focusDataPointValue: investigationCard?.mainContextDataPoint?.value,
        ...widget,
      };
    }
    return;
  }

  return;
}

interface ResolveInvestigationProps {
  cardLevel?: number;
  investigationCard: InvestigationCard;
}

export function resolveInvestigation(props: ResolveInvestigationProps): WidgetWithMetadata[] {
  const resolvedCards = resolveInvestigationCard(props);

  return getSortedWidgets({ widgets: resolvedCards });
}

function resolveInvestigationCard({
  cardLevel = 0,
  investigationCard,
}: ResolveInvestigationProps): WidgetWithMetadata[] {
  const widgets: WidgetWithMetadata[] = [];
  const resolvedWidget = resolveInvestigationCardWidget(investigationCard);

  if (!isNilOrEmpty(resolvedWidget)) {
    const resolvedWidgetWithSelectedViableSolution = {
      ...resolvedWidget,
      selectedViableSolution: investigationCard?.widgetChartType,
    };
    const resolvedWidgetWithFilters = getWidgetWithFilters({
      widget: resolvedWidgetWithSelectedViableSolution,
      filters: investigationCard.filters,
    });

    widgets.push({ ...resolvedWidgetWithFilters, metadata: { ...investigationCard.metadata, cardLevel } });
  }

  if (!isNilOrEmpty(investigationCard.followUpCards)) {
    const resolvedInvestigations = investigationCard.followUpCards.reduce(
      (acc: WidgetWithMetadata[], followUpCard): WidgetWithMetadata[] => {
        const resolvedInvestigation = resolveInvestigationCard({
          investigationCard: followUpCard,
          cardLevel: cardLevel + 1,
        });

        acc.push(...resolvedInvestigation);

        return acc;
      },
      [],
    );

    widgets.push(...resolvedInvestigations);
  }

  return widgets;
}

//#region Private members
function getSortedWidgets({ widgets }: { widgets: WidgetWithMetadata[] }): WidgetWithMetadata[] {
  return widgets.sort((a, b) => {
    const aCreatedAt = Date.parse(a.metadata.createdAt);
    const bCreatedAt = Date.parse(b.metadata.createdAt);

    if (aCreatedAt == bCreatedAt) {
      return b.metadata.cardLevel - a.metadata.cardLevel;
    }

    return aCreatedAt - bCreatedAt;
  });
}
//#endregion
