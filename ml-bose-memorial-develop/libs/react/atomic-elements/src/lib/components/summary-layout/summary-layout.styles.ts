import { SummaryLayoutStyleProps } from './summary-layout.model';
import { makeStyles } from '@material-ui/core/styles';

const summaryLayoutPadding = ({ containerPadding }: SummaryLayoutStyleProps) =>
  `var(--pm-M) ${containerPadding / 3}px`;

export const useStyles = makeStyles({
  content: {
    columnGap: (props: SummaryLayoutStyleProps) => props.columnGap,
    display: 'grid',
    gridTemplateColumns: ({ keyValuePadding, keyWidth, valueWidth }: SummaryLayoutStyleProps) =>
      `repeat(auto-fit, ${keyWidth + valueWidth + keyValuePadding}px)`,
    rowGap: 'var(--pm-1XS)',
  },
  header: {
    alignItems: 'center',
    color: 'var(--on-surface-color)',
    display: 'flex',
    fontSize: 'var(--tx-1XL)',
    '& .ks-summary-panel__display-media': {
      marginRight: 'var(--pm-S)',
    },
  },
  summaryLayout: {
    padding: summaryLayoutPadding,
    width: '100%',
  },
  summaryLayoutFromButtonSummary: {
    padding: summaryLayoutPadding,
    height: 'calc(100% - var(--wh-M))',

    '& .error-widget': {
      display: 'contents',
      height: '100%',
      maxWidth: 'calc(var(--wh-6XL) - var(--wh-M))',
      width: 'auto',

      '& #robot': {
        width: '100%',
        margin: 'auto',
      },
      '& .container-robot': {
        height: 'auto',
      },
    },
  },
});
