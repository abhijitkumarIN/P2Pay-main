import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { KsSvgIconSize } from '../svg-icon/svg-icon.model';
import { PopperPlacementType } from '@material-ui/core';
import { Translate } from '@kleeen/types';

export interface InputElementProps {
  currentItem: ItemType;
  options: ItemType[];
  setOpen: (open: boolean) => void;
  translate: Translate;
}

export interface ItemType<T = any> {
  disabled?: boolean;
  handleOnClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: ItemType) => void;
  icon?: string;
  iconSize?: KsSvgIconSize;
  key: string;
  label: string | JSX.Element;
  option?: T;
  order?: number;
  path?: string;
}

export interface KsDropDownProps {
  accessKey?: string;
  dataTestId?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: ItemType) => void;
  headerSectionLabel?: string;
  headerTranslationId?: string;
  hideIcon?: boolean;
  options: ItemType[];
  placement?: PopperPlacementType;
  selectedItem?: ItemType | null;
  shouldHighlightSelected?: boolean;
  styles?: {
    dropDownButton?: string;
    dropDownMenu?: string;
  };
  syncWidth?: boolean;
  translate?: Translate;
  InputElement?: ForwardRefExoticComponent<InputElementProps & RefAttributes<HTMLElement>>;
}

export interface KsMenuProps
  extends Pick<
    KsDropDownProps,
    | 'accessKey'
    | 'handleOnClick'
    | 'headerSectionLabel'
    | 'headerTranslationId'
    | 'options'
    | 'placement'
    | 'selectedItem'
    | 'shouldHighlightSelected'
    | 'styles'
    | 'syncWidth'
  > {
  anchorEl: null | HTMLElement;
  className?: string;
  handleClose: (e: React.MouseEvent<Document, MouseEvent>) => void;
  open: boolean;
}
