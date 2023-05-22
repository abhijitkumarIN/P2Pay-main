import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { ClassNameMap } from '@material-ui/styles';
import { LayoutProps } from '../summary-layout.model';
import { useStyles } from '../summary-layout.styles';

interface UseSummaryLayoutParams {
  layoutProps: LayoutProps;
  totalElements: number;
}

interface SummaryLayoutOutput {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  childrenRef: MutableRefObject<HTMLDivElement | null>;
  classes: ClassNameMap;
}

export function useSummaryLayout({
  layoutProps,
  totalElements,
}: UseSummaryLayoutParams): SummaryLayoutOutput {
  const containerRef = useRef(null);
  const childrenRef = useRef(null);
  const [columnWidth, setColumnWidth] = useState(0);
  const [width, setWidth] = useState(columnWidth);
  const [columnCount, setColumnCount] = useState(1);
  const [rowCount, setRowCount] = useState(totalElements || 1);
  const [rowHeight, setRowHeight] = useState(0);

  const classes = useStyles({ ...layoutProps, columnCount, rowCount, rowHeight });

  const handleResize = useCallback(() => {
    const widthAvailableForContent = containerRef.current.offsetWidth - layoutProps.containerPadding;
    setWidth(containerRef.current ? widthAvailableForContent : columnWidth);
  }, [layoutProps]);

  useEffect(() => {
    setColumnWidth(layoutProps.keyWidth + layoutProps.valueWidth + layoutProps.columnGap / 2);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef.current]);

  useEffect(() => {
    const columns = Math.floor(width / columnWidth) || 1;
    const rows = Math.ceil(totalElements / columns) || totalElements;
    const childrenHeight = childrenRef.current.clientHeight;
    setRowHeight(childrenHeight);
    setColumnCount(columns);
    setRowCount(rows);
  }, [totalElements, width]);

  return { containerRef, childrenRef, classes };
}
