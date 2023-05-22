import { DisplayMedia, ReactElement } from '@kleeen/types';

export enum KsTitleMaxWidthEnum {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface KsTitleProps {
  className?: string;
  displayMedia?: DisplayMedia;
  hasTooltip?: boolean;
  icon?: string;
  isMainTitle?: boolean;
  subTitle?: string | ReactElement;
  title: string | ReactElement;
  titleMaxWidth?: KsTitleMaxWidthEnum;
  upText?: string | ReactElement;
}
