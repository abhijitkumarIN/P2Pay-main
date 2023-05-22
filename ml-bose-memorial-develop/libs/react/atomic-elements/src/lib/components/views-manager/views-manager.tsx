import { AccessControlPermission, ViewShapeType, ViewType } from '@kleeen/types';
import { roleAccessKeyTag, sortByKeys } from '@kleeen/common/utils';
import { useEffect, useState } from 'react';

import { KsViewContent } from '../view-content';
import { KsViewsManagerProps } from './views-manager.model';
import { useAccessControlChecker } from '@kleeen/core-react';

export const ViewsManager = <T,>({
  containerClasses = '',
  contentClasses,
  entityActions,
  pageIntroClasses = '',
  SubHeader,
  subHeaderProps,
  taskName,
  views,
}: KsViewsManagerProps<T>) => {
  function accessControlFilterViews(view: ViewShapeType): boolean {
    const viewTag = roleAccessKeyTag(`${taskName}.views.${view.name || view.params?.baseModel}`);
    const { permission: viewPermission } = useAccessControlChecker(viewTag);

    return viewPermission === AccessControlPermission.SHOW;
  }
  const orderedViews = sortByKeys(views, ['viewOrder', 'viewId']).filter(accessControlFilterViews);

  const [currentView, setCurrentView] = useState<ViewShapeType | null>(orderedViews[0] || null);
  const [cardsNumber, setCardsNumber] = useState(0);
  const viewNeedsDynamicHeader = ![
    ViewType.config,
    ViewType.custom,
    ViewType.report,
    ViewType.table,
  ].includes(currentView.type);

  const classForHeaderBaseOnWidgetsAmount =
    cardsNumber > 0 && viewNeedsDynamicHeader ? `max-card-${cardsNumber}` : '';

  useEffect(() => {
    if (orderedViews.length) setCurrentView(orderedViews[0]);
  }, [orderedViews?.length]);

  return (
    <div className={containerClasses}>
      <div className={`${pageIntroClasses} ${classForHeaderBaseOnWidgetsAmount}`} data-testid="page-intro">
        <SubHeader
          {...subHeaderProps}
          currentView={currentView}
          setCurrentView={setCurrentView}
          viewOptions={orderedViews}
        />
      </div>
      <div className={contentClasses} data-testid="content-section">
        <KsViewContent
          view={currentView}
          setCardsNumber={setCardsNumber}
          taskName={taskName}
          entityActions={entityActions}
        />
      </div>
    </div>
  );
};
