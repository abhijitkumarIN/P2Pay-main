import { LayoutProps, SummaryLayoutProps } from './summary-layout.model';

import { ErrorBoundaryComponent } from '@kleeen/react/components';
import classNames from 'classnames';
import { useSummaryLayout } from './hooks';

const defaultLayoutProps: LayoutProps = {
  columnGap: 55,
  containerPadding: 68,
  keyValuePadding: 21,
  keyWidth: 144,
  valueWidth: 233,
};

export function SummaryLayout({
  children,
  isFromButtonSummary = false,
  layoutProps = defaultLayoutProps,
  totalElements,
}: SummaryLayoutProps): JSX.Element {
  const { containerRef, childrenRef, classes } = useSummaryLayout({ layoutProps, totalElements });

  return (
    <div
      className={classNames(
        'ks-summary-layout',
        isFromButtonSummary ? classes.summaryLayout : classes.summaryLayoutFromButtonSummary,
      )}
      ref={containerRef}
    >
      <ErrorBoundaryComponent>
        <div className={classNames('ks-summary-layout__content', classes.content)} ref={childrenRef}>
          {children}
        </div>
      </ErrorBoundaryComponent>
    </div>
  );
}
