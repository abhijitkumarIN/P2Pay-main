import { CardSectionLayout, OnInputChangeEvent, RegisterEvents, Widget, WidgetTypes } from '@kleeen/types';

import { AnimationProps } from '../animations/animations.model';
import { ReactNode } from 'react';
import { WidgetHeaderProps } from './components/widget-header/widget-header.model';

interface CardWidgetProps {
  children: ReactNode;
  disabled?: boolean;
  disableHeightCalculation?: boolean;
  hasTooltip?: boolean;
  Header?: JSX.Element;
  hideTitle?: boolean;
  icon: boolean;
  selectedViz?: WidgetTypes;
  title: string | JSX.Element;
  widgetSelector?: null | JSX.Element;
}

type GridJustification =
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

interface CardSectionProps {
  animation?: AnimationProps;
  cardSectionLayout?: CardSectionLayout;
  children?: ReactNode;
  containerId?: string;
  fullWidth?: boolean;
  hideSaveAndClose?: boolean;
  hideTOC?: boolean;
  justifyContent?: GridJustification;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  skipAccessControlCheck?: boolean;
  taskName?: string;
  widgets?: Widget[];
  WidgetHeader?: WidgetHeaderType;
}

interface RenderChildrenProps {
  animation?: AnimationProps;
  cardSectionLayout?: CardSectionLayout;
  children?: ReactNode;
  hideSaveAndClose?: boolean;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  taskName: string;
  widgets?: Widget[];
  widgetsRefs?: any;
  WidgetHeader?: WidgetHeaderType;
}

interface RenderWidgetProps {
  disableHeightCalculation?: boolean;
  hideSaveAndClose?: boolean;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  selectedWidgetType: WidgetTypes;
  taskName: string;
  widget: Widget;
  WidgetHeader?: WidgetHeaderType;
}

type WidgetHeaderType = (props: WidgetHeaderProps) => JSX.Element;

export {
  CardSectionLayout,
  CardSectionProps,
  CardWidgetProps,
  RenderChildrenProps,
  RenderWidgetProps,
  WidgetHeaderType,
};
