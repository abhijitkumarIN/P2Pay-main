import { useEffect, useState } from 'react';

import { WidgetSection } from '@kleeen/types';
import { useWidgetCardContext } from './use-widget-card-provider';

export function useIsPreview() {
  const [isPreview, setisPreview] = useState(false);
  const widgetCardContext = useWidgetCardContext();

  useEffect(() => {
    setisPreview(widgetCardContext?.section === WidgetSection.Preview);
  }, [widgetCardContext]);

  return isPreview;
}
