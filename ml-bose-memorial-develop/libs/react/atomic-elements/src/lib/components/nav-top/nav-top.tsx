import { AccessControl, Translate } from '@kleeen/core-react';
import { AppBar, Button, Toolbar, useStyles } from './nav-top.style';
import { ConfirmationActionDialog } from '@kleeen/react/components';
import { MainNavigationMenu } from './navigation-menus/main-navigation-menu';
import { MouseEvent, useState, useMemo, useCallback } from 'react';
import { NavProps } from '../../../types/types';
import { optionNavigation } from './nav-top.models';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { useHistory, useLocation } from 'react-router-dom';
import { useNavigation } from '@kleeen/react/hooks';
import { UserPreferencesNavigationMenu } from './navigation-menus/user-preferences-navigation-menu';
import { validateOpenInNewTab } from '../../utils/navigationUtils';

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';

import Branding from '../Branding/';
import { useResponsive } from '@kleeen/react/hooks';
const bem = 'ks-top-navigation';

export const NavTop = (props: NavProps): JSX.Element => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const navigate = useNavigation();

  const { isMobile, isTablet } = useResponsive();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentNavigation, setCurrentNavigation] = useState<optionNavigation>();

  const menuOptions = props.menuList || [];
  const MAX_MENU_ITEMS = 4;

  const onClose = (): void => setIsConfirmationOpen(false);

  const openAnNewTab = (path: string, openInNewTab: boolean, type: string, e?: MouseEvent): void =>
    validateOpenInNewTab(navigate, path, e, type, history, openInNewTab);

  const mobileMenu = useMemo(
    () => (
      <>
        <MainNavigationMenu menuList={menuOptions} navigate={navigate} productName={props.productName} />
      </>
    ),
    [menuOptions, navigate, props.productName],
  );

  const desktopMenu = useMemo(
    () => (
      <>
        {menuOptions.map(({ title, path, type, areYouSure, openInNewTab }) => {
          const navigationTitle = roleAccessKeyTag(`navigation.${title}`);
          return (
            <AccessControl key={navigationTitle} id={navigationTitle}>
              <Button
                key={path}
                color="inherit"
                className={`menu-nav-button ${pathname === path ? 'active' : ''}`}
                onClick={(e) => {
                  if (areYouSure) {
                    setIsConfirmationOpen(true);
                    setCurrentNavigation({ title, path, openInNewTab, type });
                  } else {
                    openAnNewTab(path, openInNewTab, type, e);
                  }
                }}
              >
                <>
                  <Tooltip title={title} placement="top">
                    <span className="nav-button-text">{title}</span>
                  </Tooltip>
                  <div className="nav-circle"></div>
                </>
              </Button>
            </AccessControl>
          );
        })}
        {currentNavigation && (
          <ConfirmationActionDialog
            description={
              <Translate
                id="app.navigation.modal.description"
                type="html"
                values={{ productName: props.productName }}
              />
            }
            key={`go-out-confirmation`}
            open={isConfirmationOpen}
            onAction={() => {
              openAnNewTab(currentNavigation.path, currentNavigation.openInNewTab, currentNavigation.type);
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
    ),
    [menuOptions, currentNavigation, isConfirmationOpen, props.productName],
  );

  const handleHelpClick = useCallback(
    () =>
      (e: MouseEvent): void => {
        e.preventDefault();
        window.open(props.helpUrl, '_blank');
      },
    [props.helpUrl],
  );

  return (
    <AppBar position="static" data-testid="global-nav-menu">
      <Toolbar>
        <section className={classNames(`${bem}__navigation`, classes.navigation)}>
          {menuOptions.length > MAX_MENU_ITEMS || isMobile || isTablet ? mobileMenu : desktopMenu}
        </section>
        <section className={classNames(`${bem}__branding`, classes.branding)}>
          <Branding logo={props.logo} accountName={props.accountName} productName={props.productName} />
        </section>
        <section className={classNames(`${bem}__company`, classes.settings)}>
          {Boolean(props.helpUrl) && (
            <Button
              aria-controls="simple-menu"
              color="inherit"
              className="menu-button"
              onClick={(e) => handleHelpClick()}
            >
              <HelpOutlineOutlinedIcon className="nav-icons" />
            </Button>
          )}
          <UserPreferencesNavigationMenu
            menuList={props.accountMenuList}
            navigate={navigate}
            productName={props.productName}
          />
        </section>
      </Toolbar>
    </AppBar>
  );
};

export default NavTop;
