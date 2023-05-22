import MuiTypography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';

export const Typography = styled(MuiTypography)({
  color: 'var(--on-nav-top-bg-color)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}) as typeof MuiTypography;

export const useStyles = makeStyles({
  branding: {
    gap: 'var(--wh-6XS)',
    display: 'flex',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 'var(--tx-S)',
    lineHeight: 1.2,
    textTransform: 'capitalize',
  },
  productName: {
    fontSize: 'var(--tx-L)',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
