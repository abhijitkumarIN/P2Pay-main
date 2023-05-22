import {
  AddInvestigationWidgetProperties,
  useAddInvestigateWidgetProperties,
  useIsInvestigation,
  useKleeenActions,
  useUrlQueryParams,
} from '@kleeen/react/hooks';
import {
  ContextMenuClickHandler,
  ContextMenuSectionItem,
  ContextMenuSectionProps,
} from '../../../context-menu.model';
import {
  getInvestigationCardByDataPoint,
  getWidgetWithFilters,
  resolveInvestigationCardWidget,
} from '@kleeen/investigations';
import { useEffect, useState } from 'react';

import { ContextMenuItemView } from '../../context-menu-item';
import { ContextMenuSection } from './../../context-menu-section';
import { InvestigationItem } from '../investigation-item.model';
import { Translate } from '@kleeen/core-react';
import { Widget } from '@kleeen/types';
import { getAddInvestigationCardItems } from './add-investigation-card-items';
import { getInvestigationSectionLabel } from '../utils';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function KsContextMenuAddInvestigationCardSection({
  dataPoints,
  dataPointsToShow,
  handleClose,
  widgetContextParams,
}: ContextMenuSectionProps) {
  const isInvestigationPage = useIsInvestigation();
  const [investigationSections, setInvestigationSections] = useState<ContextMenuSectionItem[]>([]);
  const { addWidget } = useKleeenActions('ksInvestigation');
  const addInvestigationWidgetProperties = useAddInvestigateWidgetProperties();
  const { paramsBasedOnRoute } = useUrlQueryParams({
    useNestedObjects: true,
  });

  useEffect(() => {
    if (isNilOrEmpty(dataPointsToShow)) {
      return;
    }

    const tempInvestigationSections = dataPointsToShow.reduce(
      (acc: ContextMenuSectionItem[], dataPoint, dataPointIndex) => {
        const investigationItems = getAddInvestigationCardItems({
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
          key: `investigation-inside-label-${dataPointIndex}`,
          label: <Translate id={stringTranslationKey} type="html" values={values} />,
          menuItems: investigationItems.map((item, itemIndex) => {
            return {
              handleClick: getAddInvestigationCardClickHandler({
                addWidget,
                addInvestigationWidgetProperties,
                handleClose,
                item,
              }),
              key: `investigation-inside-${itemIndex}`,
              label: item.label,
              roleAccessKey: `investigation.inside`,
            };
          }),
        };

        acc.push(investigationSection);

        return acc;
      },
      [],
    );

    setInvestigationSections(tempInvestigationSections);

    return;
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

//#region Private Members
interface AddInvestigationCardItemClickHandler extends ContextMenuClickHandler<InvestigationItem> {
  addWidget: (widget: Widget) => void;
  addInvestigationWidgetProperties: AddInvestigationWidgetProperties;
}

function getAddInvestigationCardClickHandler({
  addWidget,
  addInvestigationWidgetProperties,
  handleClose,
  item,
}: AddInvestigationCardItemClickHandler) {
  return () => () => {
    const { investigationDataPoint, investigationFilters } = item;
    const investigationCard = getInvestigationCardByDataPoint({
      dataPoint: investigationDataPoint,
      inheritedFilters: investigationFilters,
    });
    const resolvedWidget = resolveInvestigationCardWidget(investigationCard);

    if (!isNilOrEmpty(resolvedWidget)) {
      const filters = { ...investigationCard.filters };
      const widget = addInvestigationWidgetProperties(resolvedWidget);
      const resolvedWidgetWithFilters = getWidgetWithFilters({ filters, widget });

      addWidget(resolvedWidgetWithFilters);
    }

    handleClose();
  };
}
//#endregion
