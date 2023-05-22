import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { MenuListProps } from '../../../../types';
import { PopperProps } from '@material-ui/core/Popper';

export interface MenuListSectionProps extends Partial<PopperProps> {
  menuList: MenuListProps[];
  productName: string;
  navigate: (path: string, preserveQueryParams?: boolean) => void;
}

export interface NavigationMenuProps extends MenuListSectionProps {
  AnchorButton: ForwardRefExoticComponent<
    { setOpen: (open: boolean) => void } & RefAttributes<HTMLButtonElement | HTMLElement>
  >;
  dataTestId?: string;
}
export interface optionNavigation {
  func: any;
  openInNewTab: boolean;
  path: string;
  title: string | JSX.Element;
  type: string;
}
