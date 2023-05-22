import { BadgeClickableProps } from './badge-clickable.model';
import { KsButton } from '@kleeen/react/components';
import { ReactElement } from 'react';
import { Slide } from '@material-ui/core';
import { useStyles } from './badge-clickable.style';

export function KsBadgeClickable({ children, isShowed, onClick }: BadgeClickableProps): ReactElement {
  const classes = useStyles();

  return (
    <Slide direction={'down'} in={isShowed} mountOnEnter unmountOnExit>
      <KsButton className={classes.badgeButton} onClick={onClick}>
        {children}
      </KsButton>
    </Slide>
  );
}
