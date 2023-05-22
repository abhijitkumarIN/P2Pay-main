import { LinkProps } from './link.model';
import classNames from 'classnames';
import { useStyles } from './link.style';

const bem = 'ks-link';
const defaultTestId = 'table-cell';

export const KsLink = (props: LinkProps) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(bem, classes.content, {
        [classes.highlight]: props.highlight,
        [classes.underline]: props.underline,
      })}
      data-testid={props.testId || defaultTestId}
      onClick={props.onClick}
      onContextMenu={props?.onContextMenu}
      ref={props.anchorEl}
    >
      {props.children}
    </div>
  );
};
