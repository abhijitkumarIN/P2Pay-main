import { ConfirmationActionDialog, ItemType, KsDropDown } from '@kleeen/react/components';
import { NavigationMenuProps, optionNavigation } from './menus.model';
import React, { ReactElement, useState } from 'react';
import { executeFunc, validateOpenInNewTab } from '../../../utils/navigationUtils';

import { MenuListProps } from '../../../../types';
import { Translate } from '@kleeen/core-react';
import { useHistory } from 'react-router-dom';

export const NavigationMenu = ({
  AnchorButton,
  dataTestId,
  menuList,
  navigate,
  productName,
}: NavigationMenuProps): ReactElement => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentNavigation, setCurrentNavigation] = useState<optionNavigation>();
  const history = useHistory();

  function onClose(): void {
    setIsConfirmationOpen(false);
  }

  function openAnNewTab(func: any, path: string, openInNewTab: boolean, type: string, e?: any): void {
    executeFunc(func);
    validateOpenInNewTab(navigate, path, e, type, history, openInNewTab);
  }

  const listItemsParsedAsOptions = menuList.map(({ title, ...menuItemRest }) => ({
    key: title,
    label: title,
    ...menuItemRest,
  }));

  function onNavigate(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    selectedItem: ItemType & MenuListProps,
  ) {
    const { label, path, func, type, areYouSure, openInNewTab } = selectedItem;
    if (areYouSure) {
      setCurrentNavigation({ title: label, path, func, type, openInNewTab });

      setIsConfirmationOpen(true);
    } else {
      openAnNewTab(func, path, openInNewTab, type, e);
    }
  }

  return (
    <>
      <KsDropDown
        accessKey={'navigation'}
        dataTestId={dataTestId}
        handleOnClick={onNavigate}
        options={listItemsParsedAsOptions}
        InputElement={AnchorButton}
      />
      {currentNavigation && (
        <ConfirmationActionDialog
          description={
            <Translate id="app.navigation.modal.description" type="html" values={{ productName }} />
          }
          key={`go-out-confirmation`}
          open={isConfirmationOpen}
          onAction={() => {
            openAnNewTab(
              currentNavigation.func,
              currentNavigation.path,
              currentNavigation.openInNewTab,
              currentNavigation.type,
            );
          }}
          onClose={onClose}
          title={
            <Translate
              id="app.navigation.modal.title"
              type="html"
              values={{ title: currentNavigation.title }}
            />
          }
        />
      )}
    </>
  );
};
