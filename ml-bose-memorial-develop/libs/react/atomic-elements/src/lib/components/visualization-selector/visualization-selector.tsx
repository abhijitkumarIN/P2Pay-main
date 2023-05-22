import './visualization-selector.scss';

import { Translate, WidgetTypes } from '@kleeen/types';

import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { Tooltip } from '@material-ui/core';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface VisualizationSelectorItemProps extends Pick<VisualizationSelectorProps, 'onClick' | 'translate'> {
  isLast: boolean;
  isSelected: boolean;
  value: WidgetTypes;
}

function VisualizationSelectorItem({
  isLast,
  isSelected,
  onClick,
  translate,
  value,
}: VisualizationSelectorItemProps) {
  function handleOnClick() {
    if (typeof onClick == 'function') {
      onClick(value);
    }
  }

  return (
    <Tooltip title={translate(`app.visualizationType.${value}`)}>
      <div
        className={`visualization-selector-item${isSelected ? '-selected' : ''}`}
        onClick={handleOnClick}
        style={{
          marginRight: isLast ? '0' : '6px',
        }}
      />
    </Tooltip>
  );
}

interface VisualizationSelectorProps {
  items?: WidgetTypes[];
  onClick: React.Dispatch<React.SetStateAction<WidgetTypes>>;
  selectedVisualization: WidgetTypes | null;
  translate: Translate;
}

function VisualizationSelectorComponent({
  items,
  onClick,
  selectedVisualization,
  translate,
}: VisualizationSelectorProps) {
  if (isNilOrEmpty(items)) return null;

  return (
    <div className="visualization-selector-container">
      {items.map((item, itemIndex) => {
        return (
          <VisualizationSelectorItem
            isLast={itemIndex === items.length - 1}
            isSelected={item === selectedVisualization}
            key={`visualization-selector-item-${itemIndex}`}
            onClick={onClick}
            translate={translate}
            value={item}
          />
        );
      })}
    </div>
  );
}

export const VisualizationSelector = KUIConnect(({ translate }) => ({ translate }))(
  VisualizationSelectorComponent,
);
