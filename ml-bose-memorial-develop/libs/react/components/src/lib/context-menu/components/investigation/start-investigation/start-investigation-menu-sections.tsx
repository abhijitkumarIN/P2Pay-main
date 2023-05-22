import {
  ContextMenuClickHandler,
  ContextMenuSectionItem,
  ContextMenuSectionProps,
} from '../../../context-menu.model';
import {
  DataPointValue,
  InvestigationDataPoint,
  KsManagedModulePaths,
  WidgetScope,
  WidgetTypes,
} from '@kleeen/types';
import {
  INVESTIGATION_URL_PARAM,
  getEncodedInvestigationCard,
  getInitialInvestigationCards,
} from '@kleeen/investigations';
import { useEffect, useState } from 'react';
import {
  useGetDisplayValue,
  useIsInvestigation,
  useUrlQueryParams,
  useWorkflowContext,
} from '@kleeen/react/hooks';

import { ContextMenuItemView } from '../../context-menu-item';
import { ContextMenuSection } from './../../context-menu-section';
import { InvestigationItem } from '../investigation-item.model';
import { Translate } from '@kleeen/core-react';
import { camelCase } from 'lodash';
import { getInvestigationSectionLabel } from '../utils';
import { getStartInvestigationItems } from './start-investigation-items';
import { getThingByName } from '@kleeen/things';
import { isNilOrEmpty } from '@kleeen/common/utils';

const DISABLE_INVESTIGATION = true;

export function KsContextMenuStartInvestigationSection({
  dataPoints,
  dataPointsToShow,
  handleClose,
  widgetChartType,
  widgetContextParams,
  widgetId,
}: ContextMenuSectionProps) {
  const isInvestigationPage = useIsInvestigation();
  const [investigationSections, setInvestigationSections] = useState<ContextMenuSectionItem[]>([]);
  const { paramsBasedOnRoute } = useUrlQueryParams({
    useNestedObjects: true,
  });

  const workflow = useWorkflowContext();
  const workflowObjectFocus = camelCase(workflow.entity);

  const { displayValue, objectValueId } = useGetDisplayValue({
    objectValue: workflowObjectFocus,
    taskName: workflow.taskName,
  });

  useEffect(() => {
    if (isNilOrEmpty(dataPointsToShow) || DISABLE_INVESTIGATION) {
      return;
    }

    const entity = getThingByName(workflowObjectFocus);
    const mainContextDataPoint = getMainContextDataPoint({
      displayValue,
      entityId: entity?.id,
      id: objectValueId,
    });

    const tempInvestigationSections = dataPointsToShow.reduce(
      (acc: ContextMenuSectionItem[], dataPoint, dataPointIndex) => {
        const investigationItems = getStartInvestigationItems({
          dataPoint,
          dataPoints,
          paramsBasedOnRoute,
          widgetContextParams,
        });

        if (isNilOrEmpty(investigationItems)) {
          return acc;
        }

        const { stringTranslationKey, values } = getInvestigationSectionLabel(dataPoint);
        const investigationSection: ContextMenuSectionItem = {
          key: `start-investigation-label-${dataPointIndex}`,
          label: <Translate id={stringTranslationKey} type="html" values={values} />,
          menuItems: investigationItems.map((item, itemIndex) => {
            return {
              handleClick: getStartInvestigationClickHandler({
                handleClose,
                item,
                widgetChartType,
                widgetId,
                mainContextDataPoint,
              }),
              key: `start-investigation-${itemIndex}`,
              label: item.label,
              roleAccessKey: `start-investigation`,
            };
          }),
        };

        acc.push(investigationSection);

        return acc;
      },
      [],
    );

    setInvestigationSections(tempInvestigationSections);
  }, [dataPointsToShow?.length, isInvestigationPage]);

  return (
    <>
      {investigationSections.map((section) => {
        const { key, menuItems } = section;

        return (
          <ContextMenuSection key={key} section={section}>
            {menuItems.map((item, index) => (
              <ContextMenuItemView key={item.key} index={index} item={item} />
            ))}
          </ContextMenuSection>
        );
      })}
    </>
  );
}

//#region Private members
interface StartInvestigationItemClickHandler extends ContextMenuClickHandler<InvestigationItem> {
  mainContextDataPoint?: InvestigationDataPoint;
  widgetChartType?: WidgetTypes;
  widgetId?: string;
}

interface GetDataPointArg extends DataPointValue {
  entityId: number;
}

function getMainContextDataPoint({ displayValue, id, entityId }: GetDataPointArg): InvestigationDataPoint {
  if (isNilOrEmpty(entityId) || isNilOrEmpty(displayValue)) return;
  return {
    scope: WidgetScope.Single,
    entityId,
    value: {
      displayValue,
      id,
    },
  };
}

function getStartInvestigationClickHandler({
  handleClose,
  item,
  widgetChartType,
  widgetId,
  mainContextDataPoint,
}: StartInvestigationItemClickHandler) {
  return () => () => {
    const { investigationDataPoint, investigationFilters, pageFilters } = item;
    const initialInvestigationCard = getInitialInvestigationCards({
      investigationDataPoint,
      investigationFilters,
      originWidgetChartType: widgetChartType,
      originWidgetId: widgetId,
      pageFilters,
    });

    const encodedInvestigationCard = getEncodedInvestigationCard({
      ...initialInvestigationCard,
      mainContextDataPoint,
    });
    const investigateURL = `${KsManagedModulePaths.Investigate}?${INVESTIGATION_URL_PARAM}=${encodedInvestigationCard}`;

    window.open(investigateURL);
    handleClose();
  };
}

//#endregion
