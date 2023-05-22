import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  granularityIcon: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    width: '100%',
    height: '100%',
  },
  granularityIconContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  selectedGranularityText: {
    fontWeight: 'bolder',
    position: 'absolute',
    bottom: 16,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
});
