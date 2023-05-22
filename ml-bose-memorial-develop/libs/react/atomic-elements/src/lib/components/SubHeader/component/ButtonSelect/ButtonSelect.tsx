import './ButtonSelect.scss';

import { ItemType, KsDropDown } from '@kleeen/react/components';
import React, { Ref, forwardRef } from 'react';
import { Translate, ViewShapeType } from '@kleeen/types';

import { ButtonSelectProps } from './ButtonSelect.model';
import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import classNames from 'classnames';
import { formatViewOptions } from '@kleeen/common/utils';

const defaultIconKey = 'Apps';
const InputElement = forwardRef(
  (
    props: {
      currentItem: ItemType<ViewShapeType>;
      translate: Translate;
      setOpen: (newOpen: boolean) => void;
      options: ItemType<ViewShapeType>[];
    },
    ref: Ref<HTMLButtonElement>,
  ) => {
    const currentView = props.currentItem.option;
    const selectListValue = currentView?.name || currentView?.title || '';
    const hasViewSwitch = props.options?.length > 1;
    const viewSwitchText = hasViewSwitch ? 'View switch' : undefined;

    if (!selectListValue) return null;

    return (
      <ButtonSubHeader
        className={classNames('element-button-select', { 'has-view-switch': hasViewSwitch })}
        icon={currentView?.viewId || defaultIconKey}
        isDisabled={!hasViewSwitch}
        name={selectListValue}
        onClick={() => props.setOpen(true)}
        ref={ref}
        subName={viewSwitchText}
        translate={props.translate}
      >
        {hasViewSwitch && (
          <div className="icon-outlined">
            <svg className="MuiSvgIcon-root element-select-arrow">
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          </div>
        )}
      </ButtonSubHeader>
    );
  },
);

export const ButtonSelect = ({
  viewOptions,
  currentView,
  setCurrentView,
}: ButtonSelectProps): React.ReactElement | null => {
  const options = formatViewOptions(viewOptions);

  const handleOnChange = (_, rawOption) => {
    setCurrentView(rawOption.option);
  };

  if (viewOptions.length < 2) return null;

  return (
    <KsDropDown
      accessKey={'views'}
      handleOnClick={handleOnChange}
      options={options}
      selectedItem={{ key: currentView.viewId, label: currentView.name, ...currentView }}
      shouldHighlightSelected
      syncWidth
      InputElement={InputElement}
    />
  );
};
