import { NavPosition } from '@kleeen/types';
import { app } from '@kleeen/settings';

export const contentSectionHeight = (): string => {
  const navToptHeight = 'calc(100% - var(--wh-M) - var(--pm-L))';
  const navLeftHeight = 'calc(100% - var(--wh-M) - var(--wh-1XS) - var(--sub-header-margin-size))';

  switch (app.layout.position) {
    case NavPosition.top:
      return navToptHeight;
    case NavPosition.left:
      return navLeftHeight;
    default:
      return navToptHeight;
  }
};
