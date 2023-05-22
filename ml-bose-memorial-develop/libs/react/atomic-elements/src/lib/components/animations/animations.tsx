import { AnimationWidgetProps } from './animations.model';
import { Grow } from '@material-ui/core';
import { KsPaper } from './animations.style';
import { isNilOrEmpty } from '@kleeen/common/utils';

export const KsAnimations = {
  AnimationGrow,
};

function AnimationGrow({ animation, children, disabled }: AnimationWidgetProps): JSX.Element {
  if (isNilOrEmpty(animation)) return children;
  const defaultProps = { in: true, timeout: 'auto' };
  const { AnimationComponent = Grow, onAnimationEnd, props = defaultProps } = animation;
  const Animation = AnimationComponent;

  if (onAnimationEnd) {
    onAnimationEnd();
  }

  if (disabled) {
    props.timeout = 0;
  }

  return (
    <Animation {...props}>
      <KsPaper>{children}</KsPaper>
    </Animation>
  );
}
