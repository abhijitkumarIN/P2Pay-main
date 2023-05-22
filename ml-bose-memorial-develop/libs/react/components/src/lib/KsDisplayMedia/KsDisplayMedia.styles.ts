import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  text: {
    '& .UserAvatar--inner': {
      color: 'var(--on-secondary-color)',
      fontSize: 'var(--tx-S)',
      fontWeight: 600,
    },
  },
  flagContainer: {
    alignItems: 'center',
    display: 'flex',
    marginRight: 'var(--pm-3XS)',
    '& img': {
      height: 'var(--wh-4XS)',
    },
  },
});
