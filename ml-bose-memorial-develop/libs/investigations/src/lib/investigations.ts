import {
  Filters,
  InvestigationCard,
  InvestigationDataPoint,
  InvestigationMetadata,
  WidgetTypes,
} from '@kleeen/types';

export interface GetInitialInvestigation {
  investigationDataPoint: InvestigationDataPoint;
  investigationFilters: Filters;
  originWidgetChartType?: WidgetTypes;
  originWidgetId?: string;
  pageFilters: Filters;
  user?: string;
}

export function getInitialInvestigationCards({
  investigationDataPoint,
  investigationFilters,
  originWidgetChartType,
  originWidgetId,
  pageFilters,
  user,
}: GetInitialInvestigation): InvestigationCard {
  const metadata: InvestigationMetadata = {
    createdAt: new Date().toISOString(),
    user,
  };

  const firstInvestigationCard: InvestigationCard = {
    dataPoint: investigationDataPoint,
    filters: { ...pageFilters, ...investigationFilters },
    metadata,
  };
  const result: InvestigationCard = {
    filters: pageFilters,
    followUpCards: [firstInvestigationCard],
    metadata,
    widgetId: originWidgetId,
    widgetChartType: originWidgetChartType,
  };

  return result;
}

export interface GetInvestigationCardByDataPoint {
  inheritedFilters: Filters;
  dataPoint: InvestigationDataPoint;
  user?: string;
}

export function getInvestigationCardByDataPoint({
  dataPoint,
  inheritedFilters,
  user,
}: GetInvestigationCardByDataPoint): InvestigationCard {
  return {
    dataPoint,
    filters: inheritedFilters,
    followUpCards: [],
    metadata: {
      createdAt: new Date().toISOString(),
      user,
    },
  };
}
