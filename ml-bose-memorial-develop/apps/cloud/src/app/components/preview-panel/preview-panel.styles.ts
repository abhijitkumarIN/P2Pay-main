import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  previewHandle: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
  },
  previewSplitter: {
    backgroundColor: 'transparent',
    borderBottom: 'var(--pm-0) !important',
    borderTop: 'var(--pm-0) !important',
    height: 'var(--pm-0) !important',
  },
});
