import { ContextMenuSectionItem, ContextMenuSectionProps } from '../context-menu.model';
import { getCrossLinkingItems, useCrosslinking } from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import { ContextMenuItem } from '@kleeen/types';
import { ContextMenuItemView } from './context-menu-item';
import { ContextMenuSection } from './context-menu-section';
import { Translate } from '@kleeen/core-react';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function KsContextMenuCrossLinkSection({ dataPointsToShow, handleClose }: ContextMenuSectionProps) {
  const { crosslink } = useCrosslinking();
  const [crossLinkSections, setCrossLinkSections] = useState<ContextMenuSectionItem[]>([]);

  useEffect(() => {
    if (isNilOrEmpty(crosslink)) {
      return;
    }

    if (isNilOrEmpty(dataPointsToShow)) {
      return;
    }

    const tempCrossLinkSections = dataPointsToShow.reduce(
      (acc: ContextMenuSectionItem[], dataPoint, dataPointIndex) => {
        const crossLinkItems = getCrossLinkingItems({
          crosslink,
          dataPoint,
          handleClose,
        });

        if (isNilOrEmpty(crossLinkItems)) {
          return acc;
        }

        const crossLinkSection = {
          key: `crosslinking-${dataPointIndex}`,
          label: (
            <Translate
              id="app.contextMenu.goTo.value"
              type="html"
              values={{ value: dataPoint.formattedValue as string }}
            />
          ),
          menuItems: crossLinkItems as ContextMenuItem[],
        };
        acc.push(crossLinkSection);
        return acc;
      },
      [],
    );

    setCrossLinkSections(tempCrossLinkSections);
  }, [dataPointsToShow?.length]);

  return (
    <>
      {crossLinkSections.map((section) => {
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
