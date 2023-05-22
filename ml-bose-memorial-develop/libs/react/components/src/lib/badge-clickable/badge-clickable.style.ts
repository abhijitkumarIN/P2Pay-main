import { makeStyles } from '@material-ui/core/styles';
const headerHeight = 'var(--wh-S)';

export const useStyles = makeStyles({
  badgeButton: {
    background: 'var(--secondary-color)',
    borderRadius: 'var(--pm-1XL)',
    boxShadow: 'var(--shadow-button)',
    color: 'var(--on-secondary-color)',
    fontSize: 'var(--tx-M)',
    left: 'calc(50% - var(--wh-M))',
    padding: 'var(--pm-4XS) var(--pm-M)',
    position: 'absolute',
    top: `calc(${headerHeight} + var(--wh-2XS))`,
    whiteSpace: 'nowrap',
    zIndex: 2,
  },
});
