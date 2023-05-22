import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  dataViewDisplaySection: {
    height: (props: { withoutSubHeader: boolean }) =>
      props.withoutSubHeader ? 'calc(100% + var(--wh-1XS))' : '100%',
    width: '100%',
    overflow: 'auto',
    '.nav-left &': {
      paddingBottom: 'var(--pm-L)',
    },
  },
});
