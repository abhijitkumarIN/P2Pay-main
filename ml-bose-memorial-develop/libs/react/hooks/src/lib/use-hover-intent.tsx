import { useEffect, useImperativeHandle, useRef, useState } from 'react';

interface UseHoverIntentProps<GenericParam> {
  delayOnEnter?: number;
  delayOnLeave?: number;
  onMouseEnterFn?: (
    event: MouseEvent | React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    contextParams?: GenericParam,
  ) => void;
  onMouseEnterFnParams?: GenericParam;
  onMouseLeaveFn?: (event: MouseEvent | React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  outerRef?: React.Ref<HTMLElement | null>;
  hasCrossLink?: boolean;
  hasInvestigations?: boolean;
}

interface HoverIntentObject<T> {
  ref: React.MutableRefObject<HTMLElement & T>;
  isHovering: boolean;
}

export function useHoverIntent<T = HTMLElement, GenericParam = null>(
  props?: UseHoverIntentProps<GenericParam>,
): HoverIntentObject<T> {
  const {
    delayOnEnter = 300,
    delayOnLeave = 600,
    onMouseEnterFn,
    onMouseLeaveFn,
    outerRef,
    hasCrossLink,
    hasInvestigations,
  } = props || {};
  const ref = useRef<HTMLElement & T>(null);
  const [isHovering, setIsHovering] = useState(false);
  let timerOnEnter: ReturnType<typeof setTimeout>;
  let timerOnLeave: ReturnType<typeof setTimeout>;

  const onMouseEnter = (event: MouseEvent) => {
    event.preventDefault();
    if (timerOnLeave) {
      clearTimeout(timerOnLeave);
    }
    timerOnEnter = setTimeout(function () {
      setIsHovering(true);
      // hasCrossLink could be undefined, that´s why we only control false value.
      if (onMouseEnterFn && (hasCrossLink !== false || hasInvestigations)) {
        onMouseEnterFn({ ...event, currentTarget: ref.current }, props?.onMouseEnterFnParams);
      }
    }, delayOnEnter);
  };

  const onMouseLeave = (event: MouseEvent) => {
    event.preventDefault();
    if (timerOnEnter) {
      clearTimeout(timerOnEnter);
    }
    timerOnLeave = setTimeout(() => {
      if (onMouseLeaveFn) {
        onMouseLeaveFn({ ...event, currentTarget: ref.current });
      }
      setIsHovering(false);
    }, delayOnLeave);
  };

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      currentRef.addEventListener('mouseover', onMouseEnter, false);
      currentRef.addEventListener('mouseout', onMouseLeave, false);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mouseover', onMouseEnter, false);
        currentRef.removeEventListener('mouseout', onMouseLeave, false);
      }
    };
  }, [ref.current, hasCrossLink]);

  useImperativeHandle(outerRef, () => ref.current, [ref]);

  return { ref, isHovering };
}
