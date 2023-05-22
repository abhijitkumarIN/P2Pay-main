import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  onBoardingTask: {
    background: 'var(--application-background)',
    height: 'var(--size-pageHeight)',
  },
  onBoardingGridSection: {
    alignItems: 'center',
    backgroundColor: 'var(--surface-color)',
    boxShadow: 'var(--shadow-elevation-mid-key)',
    color: 'var(--on-surface-color)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    paddingBottom: 'var(--pm-L)',
    position: 'relative',
    transition: 'height var(--speed-medium)',
    justifyContent: 'center',
  },
  preview: {
    height: 'cal(var(--size-pageHeight) - var(--pm-8XL) - var(--pm-8XL) - var(--pm-4XL))',
    padding: 'var(--pm-1XL)',
  },
});
