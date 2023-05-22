import './CardSection.scss';

import { useEffect, useRef, useState } from 'react';

import { CardWidgetProps } from './CardWidget.model';
import { MasonryProvider } from '@kleeen/react/hooks';
import classnames from 'classnames';

const bem = 'ks-card-widget';
const cardStyle = {
  gridAutoRows: 10,
  height: 42,
  imgOffset: 24,
  marginBottom: 16,
};

export function CardWidget({
  children,
  disabled,
  disableHeightCalculation,
  Header,
  hideTitle,
  icon,
  selectedViz,
  title,
  widgetSelector = null,
  ...rest
}: CardWidgetProps): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const [spans, setSpans] = useState(0);
  const cardSpan = {
    gridRowEnd: `span ${spans}`,
  };

  function updateLayout(contentHeight: number): void {
    const newSpansVal = Math.ceil(
      (contentHeight + cardStyle.height + cardStyle.marginBottom) / cardStyle.gridAutoRows,
    );
    setSpans(() => newSpansVal);
  }

  function handleImageLoad(event): void {
    updateLayout(event.target.clientHeight + cardStyle.imgOffset);
  }

  useEffect(() => {
    if (!disableHeightCalculation) {
      // TODO @cafe single column widgets do not require height calculation
      // Look for a masonry solution where we don't do this manually
      updateLayout(contentRef.current.clientHeight);
    }
  }, [disableHeightCalculation, selectedViz, spans, children]);

  return (
    <div
      {...rest}
      className={classnames(bem, 'card-widget', { disabled })}
      style={!disableHeightCalculation ? cardSpan : {}}
    >
      {!hideTitle && Header}
      <div
        className={classnames(`${bem}__content`, 'content')}
        ref={contentRef}
        onLoad={handleImageLoad}
        onLoadedData={handleImageLoad}
      >
        <MasonryProvider updateLayout={updateLayout}>{children}</MasonryProvider>
        {widgetSelector}
      </div>
    </div>
  );
}

export default CardWidget;
