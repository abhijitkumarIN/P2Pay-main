import { makeStyles } from '@material-ui/core';

const closeButtonWidth = 'calc(var(--wh-2XL) + var(--wh-S))';
const actionsPadding = 'var(--pm-6XS)';
const dropDownRight = `calc(${closeButtonWidth} + ${actionsPadding})`;

export const useStyles = makeStyles({
  previewHeader: {
    alignItems: 'center',
    backgroundColor: 'hsla(var(--on-surface-color-hsl), 0.7)',
    borderRadius: 'var(--pm-3XS)',
    display: 'flex',
    height: 'var(--wh-3XS)',
    justifyContent: 'space-between',
    transition: 'height var(--speed-medium)',
    width: '100%',
    zIndex: 100,
    '&:hover': {
      height: 'var(--wh-S)',
      '& $previewHeaderActionsContainer': {
        '& $previewHeaderCloseButton': {
          transitionDelay: 'var(--speed-medium)',
          opacity: 1,
        },
        '& $previewHeaderDropdownContainer': {
          right: dropDownRight,
          '& $previewHeaderWidgetCategoryDropdownButton': {
            fontSize: 'var(--tx-M)',
            '& .MuiSvgIcon-root': {
              opacity: 1,
            },
            '& .ks-svg-icon.large': {
              height: 'var(--tx-1XL)',
              width: 'var(--tx-1XL)',
            },
          },
        },
      },
      '& $previewHeaderTitle': {
        fontSize: 'var(--tx-M)',
      },
    },
  },
  previewHeaderActionsContainer: {
    alignItems: 'center',
    display: 'flex',
    marginRight: 'var(--pm-1XS)',
    position: 'relative',
    width: '33%',
  },
  previewHeaderDropdownContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'end',
    position: 'absolute',
    right: 0,
    transition: 'right var(--speed-medium)',
    width: '50%',
  },
  previewHeaderCloseButton: {
    display: 'flex',
    height: 'var(--wh-2XS)',
    maxWidth: closeButtonWidth,
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
  previewHeaderHandler: {
    color: 'var(--on-secondary-color-variant)',
    display: 'inline-block',
    fontSize: 'var(--pm-L)',
    fontWeight: 'bold',
    left: '50%',
    letterSpacing: 'var(--pm-6XS)',
    marginBottom: 'var(--pm-6XS)',
    position: 'absolute',
    transform: 'translate(-50%,0%)',
    '&:hover ': {
      '& ~ $previewHeader': {
        height: 'var(--wh-S)',
        '& $previewHeaderActionsContainer': {
          opacity: 1,
        },
      },
    },
  },
  previewHeaderTitle: {
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
  previewHeaderWidgetCategoryDropdownButton: {
    color: 'var(--on-secondary-color-variant)',
    fontSize: 'var(--tx-S)',
    transition: 'font-size var(--speed-medium)',
    width: 'auto',
    '&:hover ': {
      color: 'var(--on-secondary-color-variant)',
    },
    '& .ks-svg-icon.large': {
      height: 'var(--tx-L)',
      width: 'var(--tx-L)',
    },
    '& .MuiSvgIcon-root': {
      opacity: 0,
      fontSize: 'var(--tx-1XL)',
      transition: 'opacity var(--speed-medium)',
    },
  },
});
