import MuiMenu from '@material-ui/core/Menu';
import { styled } from '@material-ui/core';

export const Menu = styled(MuiMenu)({
  '& .MuiMenu-paper': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'var(--menu-bg-color)',
    color: 'var(--on-surface-color)',
    width: 'var(--wh-4XL)',
  },
  '& .MuiMenu-list': {
    paddingBottom: 0,
    paddingTop: 0,
  },
  '& .menu-items-container': {
    backgroundColor: 'var(--menu-bg-color)',
    paddingBottom: 'var(--pm-1XS)',
    paddingTop: 'var(--pm-1XS)',
  },
  '& .truncate': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
