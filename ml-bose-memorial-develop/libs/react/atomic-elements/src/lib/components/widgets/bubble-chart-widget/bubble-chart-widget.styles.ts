import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  widgetContent: {
    display: ({ bigWidget }: { bigWidget: boolean }) => (bigWidget ? 'flex' : 'block'),
    height: '100%',
  },
});
