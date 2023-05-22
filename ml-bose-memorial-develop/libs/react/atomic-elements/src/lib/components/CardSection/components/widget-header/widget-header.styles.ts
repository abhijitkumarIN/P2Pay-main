import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  widgetHeader: {
    border: 'var(--card-header-border)',
    borderWidth: 'var(--card-header-border-width)',
    color: 'var(--h3-title-color)',
  },
  widgetHeaderTitle: {
    marginLeft: 0,
    marginRight: 'var(--pm-3XS)',
    // FIXME: @marimba this hack should be removed once the KSE3-4787 is done
    minWidth: 0,
  },
}));
