import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  list: {
    borderRadius: 'var(--card-border-radius)',
    fontSize: 'var(--tx-M)',
    height: '100%',
    overflowY: 'auto',
  },
}));
