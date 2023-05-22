export interface SummaryLayoutStyleProps {
  columnCount: number;
  columnGap: number;
  containerPadding: number;
  keyValuePadding: number;
  keyWidth: number;
  rowCount: number;
  rowHeight: number;
  valueWidth: number;
}

export interface LayoutProps {
  columnGap: number;
  containerPadding: number;
  keyValuePadding: number;
  keyWidth: number;
  valueWidth: number;
}

export interface SummaryLayoutProps {
  children: React.ReactNode;
  isFromButtonSummary?: boolean;
  layoutProps: LayoutProps;
  totalElements?: number;
}
