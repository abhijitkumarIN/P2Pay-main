import { KsMenu } from '@kleeen/react/components';
import { styled } from '@material-ui/core';

export const Menu = styled(KsMenu)({
  '& .MuiMenu-paper': {
    backgroundColor: 'var(--menu-bg-color)',
    border: 'var(--card-border)',
    borderRadius: 'var(--card-border-radius)',
    boxShadow: 'var(--card-shadow)',
    color: 'var(--on-surface-color)',
    height: 'max-content',
    maxHeight: 'var(--wh-8XL)',
    minWidth: 'calc(var(--wh-8XL) - var(--wh-M))',
    width: 'var(--wh-9XL)',
    '& > ul': {
      padding: '0',
    },
  },
  '& .empty': {
    pointerEvents: 'none',
  },
});
