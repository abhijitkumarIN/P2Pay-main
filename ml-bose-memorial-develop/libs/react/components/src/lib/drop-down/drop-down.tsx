import { FormControl, Tooltip } from '@material-ui/core';
import { KsDropDownProps, KsMenuProps } from './drop-down.model';
import { KsMenuContainer, KsMenuItem, KsMenuItemHeader } from '../menu';
import { KsSvgIcon, KsSvgIconSize } from '../svg-icon';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { isNilOrEmpty, roleAccessKeyTag } from '@kleeen/common/utils';

import { AccessControl } from '@kleeen/core-react';
import Apps from '@material-ui/icons/Apps';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { KsButtonText } from '../button';
import MenuList from '@material-ui/core/MenuList';
import MuiPopper from '@material-ui/core/Popper';
import { Translate } from '@kleeen/core-react';
import classnames from 'classnames';
import { useStyles } from './drop-down.style';

export function KsFloatMenu({
  accessKey = 'menu-item-key',
  anchorEl,
  className,
  handleClose,
  handleOnClick,
  headerSectionLabel,
  headerTranslationId,
  open,
  options,
  placement,
  selectedItem,
  shouldHighlightSelected,
  styles,
  syncWidth = false,
}: KsMenuProps): ReactElement {
  const classes = useStyles();
  const style = syncWidth ? { width: anchorEl.offsetWidth } : {};
  const hasHeaderSection = Boolean(headerTranslationId || headerSectionLabel);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <MuiPopper
        anchorEl={anchorEl}
        className={classes.popper}
        disablePortal
        open={open}
        placement={placement}
        style={style}
        transition
      >
        {({ TransitionProps, placement: popperPlacement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: popperPlacement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <KsMenuContainer className={className} variant="outlined" square>
              {hasHeaderSection && (
                <KsMenuItemHeader>
                  <span className={classes.truncate}>
                    {headerSectionLabel || <Translate id={headerTranslationId} type="html" />}
                  </span>
                </KsMenuItemHeader>
              )}
              <MenuList className={styles?.dropDownMenu} data-testid="ks-dropdown-menu">
                {options?.map((item) => (
                  <AccessControl
                    id={roleAccessKeyTag(`${accessKey}.${item.key}`)}
                    key={roleAccessKeyTag(`${accessKey}.${item.key}`)}
                  >
                    <Tooltip title={item.label} placement="top">
                      <KsMenuItem
                        className={classnames({
                          [classes.selectedItem]: shouldHighlightSelected && item.key === selectedItem.key,
                        })}
                        disabled={item.disabled}
                        key={item.key || item.path}
                        onClick={(e) => {
                          if (item.handleOnClick) item.handleOnClick(e, item);
                          if (handleOnClick) handleOnClick(e, item);
                        }}
                      >
                        {item.icon && (
                          <KsSvgIcon
                            size={item.iconSize || KsSvgIconSize.Medium}
                            className={classes.menuItemIcon}
                            icon={item.icon}
                          />
                        )}
                        <span className={classes.truncate}>{item.label}</span>
                      </KsMenuItem>
                    </Tooltip>
                  </AccessControl>
                ))}
              </MenuList>
            </KsMenuContainer>
          </Grow>
        )}
      </MuiPopper>
    </ClickAwayListener>
  );
}

export function KsDropDown({
  accessKey,
  dataTestId = 'drop-down',
  handleOnClick,
  headerSectionLabel,
  headerTranslationId,
  hideIcon = false,
  options,
  placement = 'bottom',
  selectedItem,
  shouldHighlightSelected,
  styles,
  syncWidth,
  translate,
  InputElement,
}: KsDropDownProps) {
  const anchorRef = useRef();
  const [open, setOpen] = useState(false);
  const defaultItem = options[0] || { label: 'No Options', key: 'non-options' };
  const [item, setItem] = useState(selectedItem || defaultItem);
  const classes = useStyles();

  useEffect(() => {
    if (selectedItem) {
      const newItem = options.find((option) => option.key === selectedItem.key) || defaultItem;
      setItem(newItem);
    }
  }, [defaultItem, selectedItem?.key]);

  useEffect(() => {
    if (!isNilOrEmpty(options)) {
      const [firstItem] = options;
      setItem(firstItem);
    } else {
      setItem(defaultItem);
    }
  }, [options?.length]);

  const Icon = item.icon ? (
    <KsSvgIcon size={KsSvgIconSize.Large} className="menu-item-icon" icon={item.icon} />
  ) : (
    <Apps />
  );

  const DropDownButton = InputElement ? (
    <InputElement
      currentItem={item}
      options={options}
      ref={anchorRef}
      setOpen={setOpen}
      translate={translate}
    />
  ) : (
    <KsButtonText
      className={classnames(classes.dropDownSize, styles?.dropDownButton)}
      endIcon={<KeyboardArrowDownIcon />}
      onClick={() => setOpen(true)}
      ref={anchorRef}
      size={'large'}
      startIcon={hideIcon ? null : Icon}
    >
      <Tooltip title={item.label} placement="top">
        <span className={classes.truncate}>{item.label}</span>
      </Tooltip>
    </KsButtonText>
  );

  return (
    <FormControl className={classes.formControl} data-testid={dataTestId}>
      {DropDownButton}
      {open && (
        <KsFloatMenu
          accessKey={accessKey}
          anchorEl={anchorRef.current}
          handleOnClick={(e, newItem) => {
            if (handleOnClick) handleOnClick(e, newItem);

            setOpen(false);
            setItem(newItem);
          }}
          handleClose={() => {
            setOpen(false);
          }}
          headerSectionLabel={headerSectionLabel}
          headerTranslationId={headerTranslationId}
          open={open}
          options={options}
          placement={placement}
          selectedItem={item}
          shouldHighlightSelected={shouldHighlightSelected}
          styles={styles}
          syncWidth={syncWidth}
        />
      )}
    </FormControl>
  );
}

export { KsButtonText };
