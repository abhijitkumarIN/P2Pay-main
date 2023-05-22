import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  avatar: {
    height: 'var(--wh-3XL)',
    width: 'var(--wh-3XL)',
  },
  avatarContainer: {
    height: 'var(--wh-3XL)',
    margin: 'var(--pm-S)',
    minHeight: 'initial',
    width: 'var(--wh-3XL)',
  },
  leftPanel: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  summaryLayoutContainer: {
    flexGrow: 1,
  },
  summaryPanelContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
