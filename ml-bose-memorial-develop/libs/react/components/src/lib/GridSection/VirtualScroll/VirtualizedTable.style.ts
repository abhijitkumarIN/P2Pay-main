import { makeStyles } from '@material-ui/core/styles';
import { calcVariables } from './utils';

export const useStyles = makeStyles({
  'dragging-column-helper-styles': {
    alignItems: 'center',
    boxShadow: '2px 2px 9px 0px rgba(0, 0, 0, 0.5)',
    cursor: 'grabbing',
    display: 'flex',
    left: calcVariables.draggableAreaLeftCal,
    paddingLeft: 'var(--pm-0)',
    pointerEvents: 'auto !important' as 'auto', //drag and drop library sets pointer-events as none
    position: 'relative',

    '& .draggableArea': {
      display: 'contents',
      '& .MuiSvgIcon-root': {
        width: '0.9em',
        fill: 'var(--table-header-text)',
        color: 'var(--table-header-text)',
        marginLeft: 'calc(var(--pm-4XS) * -1)',
        marginRight: 'var(--pm-4XS)',
      },
    },
  },
  virtualTable: {
    backgroundColor: 'var(--row-even)',
    borderRadius: 'var(--card-border-radius)',
    boxShadow: 'var(--card-shadow)',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'relative',
    width: '100%',
  },
});
