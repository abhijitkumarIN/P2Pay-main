import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiPaper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';

export const KsMenuItem = styled(MuiMenuItem)({
  fontSize: 'var(--tx-M)',
  height: 'var(--wh-1XS)',
  width: '100%',
  '&:hover': {
    background: 'var(--secondary-color-variant)',
    color: 'var(--on-secondary-color-variant)',
  },
});

export const KsMenuContainer = styled(MuiPaper)({
  backgroundColor: 'var(--menu-bg-color)',
  boxShadow: 'var(--card-shadow)',
  color: 'var(--on-surface-color)',
});

export const KsSnackbarContainer = styled(MuiPaper)({
  backgroundColor: 'var(--surface-color)',
  boxShadow: 'var(--shadow-elevation-mid-key)',
  color: 'var(--on-surface-color)',
});

export const KsMenu = styled(MuiMenu)({
  '& .MuiMenu-paper': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'var(--menu-bg-color)',
    color: 'var(--on-surface-color)',
  },
});

export const KsMenuItemHeader = styled(MuiMenuItem)({
  backgroundColor: 'hsla(var(--on-surface-color-hsl), 0.7)',
  color: 'var(--on-secondary-color-variant)',
  fontSize: 'var(--tx-M)',
  height: 'var(--wh-2XS)',
  pointerEvents: 'none',
});
