import Switch from '@material-ui/core/Switch';

import { createStyles, makeStyles, styled } from '@material-ui/core';

export const SwitchHideColumn = styled(Switch)(() => ({
  padding: 'var(--pm-1XS)',
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      height: 'var(--wh-4XS)',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 'var(--wh-4XS)',
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    height: 'var(--wh-4XS)',
    margin: 'var(--pm-6XS)',
    width: 'var(--wh-4XS)',
  },
}));

export const useStyles = makeStyles(() =>
  createStyles({
    chip: {
      background: 'var(--secondary-color)',
      borderColor: 'var(--on-secondary-color);',
      color: 'var(--on-secondary-color)',
      height: 'var(--wh-3XS)',
      width: 'var(--wh-3XL)',
      '& .MuiSvgIcon-root': {
        color: 'var(--on-secondary-color);',
        height: 'var(--wh-2XS)',
        width: 'var(--wh-2XS)',
      },
      '&.MuiChip-clickable.MuiChip-outlined:hover': {
        background: 'var(--secondary-color-variant)',
      },
    },
    header: {
      alignItems: 'center',
      color: 'var(--on-surface-color)',
      display: 'flex',
      fontSize: 'var(--tx-L)',
      fontWeight: 'bold',
      height: '100%',
      justifyContent: 'center',
      lineHeight: 'var(--tx-3XL)',
      width: '100%',
    },
    label: {
      '& .MuiTypography-root': {
        '&.MuiFormControlLabel-label': {
          display: 'block',
          maxWidth: 'var(--wh-2XL)',
          overflow: 'hidden',
          textAlign: 'left',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    },
    paper: {
      backgroundColor: 'var(--surface-color)',
      boxShadow: 'var(--shadow-elevation-mid-key)',
      color: 'var(--on-surface-color)',
      margin: 'calc(var(--pm-M) * -1)',
      overflow: 'visible',
      padding: 'var(--pm-2XS)',
      position: 'relative',
      width: 'calc(var(--wh-3XL) + var(--wh-4XS))',
    },
    popover: {
      boxShadow: 'var(--shadow-elevation-mid-key)',
      marginLeft: 'calc(var(--pm-7XS) - var(--pm-1XL))',
    },
    hiddenFieldsHeader: {
      alignItems: 'center',
      backgroundColor: 'hsla(var(--on-surface-color-hsl), 0.7)',
      borderRadius: 'var(--pm-3XS)',
      display: 'flex',
      height: 'var(--wh-5XS)',
      justifyContent: 'space-between',
      transition: 'height var(--speed-medium)',
      width: '100%',
      zIndex: 100,
      '&:hover': {
        height: 'var(--wh-2XS)',
        '& $hiddenFieldsHeaderActionsContainer': {
          '& $hiddenFieldsHeaderChipButton': {
            opacity: 1,
            transitionDelay: 'var(--speed-medium)',
          },
        },
        '& $hiddenFieldsHeaderTitle': {
          fontSize: 'var(--tx-M)',
        },
      },
    },
    hiddenFieldsHeaderHandler: {
      color: 'var(--on-secondary-color-variant)',
      display: 'inline-block',
      fontSize: 'var(--pm-L)',
      fontWeight: 'bold',
      left: '50%',
      letterSpacing: 'var(--pm-6XS)',
      marginBottom: 'var(--pm-1XS)',
      position: 'absolute',
      transform: 'translate(-50%,0%)',
      '&:hover ': {
        '& ~ $hiddenFieldsHeader': {
          height: 'var(--wh-S)',
          '& $hiddenFieldsHeaderActionsContainer': {
            opacity: 1,
          },
        },
      },
    },
    hiddenFieldsHeaderActionsContainer: {
      alignItems: 'center',
      display: 'flex',
      marginRight: 'var(--pm-3XL)',
      position: 'relative',
      width: '33%',
    },
    hiddenFieldsHeaderChipButton: {
      display: 'flex',
      height: 'var(--wh-2XS)',
      marginTop: 'var(--pm-4XS)',
      opacity: 0,
      position: 'absolute',
      right: 0,
      transition: 'opacity var(--speed-medium)',
      width: '50%',
      '& span': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    hiddenFieldsHeaderTitle: {
      color: 'var(--on-secondary-color-variant)',
      fontSize: 'var(--tx-S)',
      marginLeft: 'var(--pm-L)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      transition: 'font-size var(--speed-medium)',
      whiteSpace: 'nowrap',
      width: '40%',
    },
  }),
);
