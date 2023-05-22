import MuiBadge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core';

export const KsBadge = withStyles({
  root: {
    textTransform: 'none',
    '& .iconFilter': {
      position: 'relative',
    },
    '& .MuiBadge-colorPrimary': {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--on-primary-color)',
    },
    '& .MuiBadge-colorSecondary': {
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--on-secondary-color)',
    },
    '&:hover': {
      background: 'var(--transparent)',
      color: 'var(--secondary-color-variant)',
    },
  },
})(MuiBadge);
