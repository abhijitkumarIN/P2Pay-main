import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  actionButton: {
    fontSize: 'var(--tx-M)',
    fontWeight: 600,
    marginTop: 'var(--pm-1XS)',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  comparator: {
    '& .MuiFormControl-root': {
      width: '100% !important',
      '& .MuiButtonBase-root.MuiButton-root': {
        width: '100% !important',
      },
    },
  },
  filterSelectionContainer: {
    padding: 'var(--pm-S)',
  },
  noFilters: {
    fontSize: 'var(--tx-L)',
    marginLeft: 'var(--pm-1XS)',
    marginTop: 'var(--pm-M)',
  },
  option: {
    border: 'none',
    minWidth: 'var(--wh-L)',
  },
  row: {
    alignItems: 'center',
    color: 'var(--on-surface-color)',
    display: 'grid',
    gap: 10,
    gridTemplateColumns: '16% 1fr auto 1fr var(--wh-3XS)',
    height: 'var(--wh-1XS)',
    marginBottom: '1rem',
    transition: 'all 2s ease-in-out',
    width: '100%',
  },
  removeButton: {
    height: 'var(--wh-3XS)',
    width: 'var(--wh-3XS)',
  },
  where: {
    fontStyle: 'italic',
  },
});
