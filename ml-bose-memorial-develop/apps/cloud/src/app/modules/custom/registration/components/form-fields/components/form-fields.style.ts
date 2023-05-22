import MuiAppBar from '@material-ui/core/AppBar';
import MuiTypography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';

export const AppBar = styled(MuiAppBar)({
  background: 'var(--nav-top-bg-color)',
  borderBottom: 'var(--nav-top-border-bottom-width) solid var(--nav-top-border-bottom-color)',
  boxShadow: 'var(--nav-top-shadow)',
  height: 'var(--wh-M)',
});

export const Typography = styled(MuiTypography)({
  color: 'var(--on-nav-top-bg-color)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}) as typeof MuiTypography;

export const useStyles = makeStyles({
  radioButtonError: {
    color: 'red',
    '& .MuiFormControlLabel-root': {
      color: 'red',
      '& .MuiRadio-root ': {
        color: 'red',
      },
    },
  },
  branding: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textFieldContainer: {
    paddingBottom: 'var(--pm-M)',
    paddingTop: 'var(--pm-M)',
  },
});
