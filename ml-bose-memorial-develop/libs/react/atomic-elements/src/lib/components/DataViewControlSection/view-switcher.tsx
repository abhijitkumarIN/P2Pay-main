import { KsDropDown, KsSvgIcon, KsSvgIconSize } from '@kleeen/react/components';
import { SHOW_DROPDOWN_THRESHOLD, formatViewOptions } from '@kleeen/common/utils';
import { Tab, Tabs, useStyles } from './DataViewControlSection.styles';
import { TabSwitcherProps, ViewDropdownProps } from './DataViewControlSection.model';

import { ReactElement } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { ViewSwitcherProps } from './view-switcher.model';
import classnames from 'classnames';

const bem = 'ks-view-switcher';

export function ViewSwitcher({
  currentView,
  setCurrentView,
  viewOptions,
}: ViewSwitcherProps): JSX.Element | null {
  if (!Array.isArray(viewOptions)) return null;

  const showDropDown = viewOptions.length >= SHOW_DROPDOWN_THRESHOLD;

  return showDropDown ? (
    <ViewDropdown setCurrentView={setCurrentView} viewOptions={viewOptions} />
  ) : (
    <TabSwitcher currentView={currentView} setCurrentView={setCurrentView} viewOptions={viewOptions} />
  );
}

function TabSwitcher({ viewOptions, setCurrentView, currentView }: TabSwitcherProps): ReactElement {
  const value = viewOptions.findIndex(({ viewId }) => currentView?.viewId === viewId);

  return (
    <Tabs value={value} scrollButtons="off" aria-label="tabs" data-testid="tab-switcher">
      {viewOptions.map((option, index) => {
        const { name = 'List', viewId } = option;
        const props = getViewOptionPropsBasedOnId({ name, viewId });

        return (
          <Tab
            key={index}
            {...props}
            onClick={(e) => {
              setCurrentView(option);
            }}
          />
        );
      })}
    </Tabs>
  );
}

function ViewDropdown({ setCurrentView, viewOptions }: ViewDropdownProps): JSX.Element {
  const options = formatViewOptions(viewOptions);
  const classes = useStyles();

  return (
    <KsDropDown
      accessKey={'views'}
      handleOnClick={(e, option) => {
        setCurrentView(option.option);
      }}
      options={options}
      shouldHighlightSelected
      styles={{
        dropDownButton: classes.dropDownButton,
      }}
      syncWidth
    />
  );
}

function getViewOptionPropsBasedOnId({ name, viewId }: { name: string; viewId: string }): {
  id: string;
  icon: JSX.Element;
  'aria-label': string;
} {
  const classes = useStyles();

  return {
    id: viewId,
    icon: (
      <Tooltip title={name} placement="top">
        <div className={classnames(bem, classes.iconContainer)}>
          <KsSvgIcon size={KsSvgIconSize.ExtraLarge} icon={viewId} />
        </div>
      </Tooltip>
    ),
    ['aria-label']: name,
  };
}
