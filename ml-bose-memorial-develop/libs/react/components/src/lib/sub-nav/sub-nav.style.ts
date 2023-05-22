import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  endSeparator: {
    borderRight: 'var(--table-cell-border-right)',
    // FIXME: @marimba this hack should be removed once the KSE3-4787 is done
    minWidth: 0,
  },
  headerSection: {
    display: 'flex',
    // FIXME: @marimba this hack should be removed once the KSE3-4787 is done
    '&:first-of-type': {
      minWidth: 0,
    },
  },
  widgetHeader: {
    display: 'flex',
    minHeight: 'var(--wh-S)',
  },
  headerSub: {
    width: '100%',
  },
});
