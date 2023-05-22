export interface AnimationProps {
  onAnimationEnd?: () => void;
  AnimationComponent?: AnimationComponentProps;
  props?: PropsAnimationProps;
}

export type AnimationComponentProps = (props?: PropsAnimationProps) => JSX.Element;

export interface AnimationWidgetProps {
  animation: AnimationProps;
  children: JSX.Element;
  disabled: boolean;
}

type PropsAnimationProps = { [key: string]: any };
