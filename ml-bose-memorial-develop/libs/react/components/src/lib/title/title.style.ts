import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  iconContainer: {
    display: 'flex',
  },
  infoContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    // FIXME: @marimba this hack should be removed once the KSE3-4787 is done
    minWidth: 0,
    paddingLeft: 'var(--pm-L)',
    width: '100%',
    '& h3': {
      paddingLeft: 'var(--pm-0)',
    },
  },
  titleContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 'var(--pm-S)',
  },
  marginLeft: {
    marginLeft: 'var(--pm-S)',
  },
  marginRight: {
    marginRight: 'var(--pm-S)',
  },
  withoutMargin: {
    margin: 'var(--pm-0)',
    fontSize: 'var(--tx-S)',
    color: 'var(--on-surface-color-variant)',
    opacity: '60%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  mainTitle: {
    textTransform: 'uppercase',
    margin: 'var(--pm-0)',
    fontSize: 'var(--tx-1XL)',
    width: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  commonTitle: {
    alignItems: 'center',
    color: 'var(--h3-title-color)',
    display: 'flex',
    fontSize: 'var(--tx-1XL)',
    fontWeight: 400,
    letterSpacing: 'var(--pm-0)',
    margin: 'var(--pm-0)',
    minHeight: 'var(--wh-2XS)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  largeTitleContainer: {
    maxWidth: 'var(--wh-9XL)',
  },
  mediumTitleContainer: {
    maxWidth: 'var(--wh-7XL)',
  },
  smallTitleContainer: {
    maxWidth: 'var(--wh-3XL)',
  },
  elipse: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
