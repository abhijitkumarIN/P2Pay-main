import { CardSectionLayout, ViewType, Widget } from '@kleeen/types';

import CardSection from '../CardSection/CardSection';
import ConfigView from '../ConfigView/ConfigView';
import CustomView from '../custom-view/custom-view';
import { DisplaySectionViewsProps } from '@kleeen/react/atomic-elements';
import { GridAreaSection } from '../grid-area-section';
import { isNilOrEmpty } from '@kleeen/common/utils';

export const componentByViewType = {
  [ViewType.custom]: ({ view }) => (
    <CustomView key={`data-view-display-section-full-view-viz-${view.id}`} widget={view} />
  ),
  [ViewType.dashboard]: ({ taskName, view }) => (
    <CardSection
      justifyContent="center"
      key={`data-view-display-section-card-section-${view.viewId}`}
      taskName={taskName}
      widgets={view.widgets}
    />
  ),
  [ViewType.report]: ({ taskName, view }) => (
    <CardSection
      cardSectionLayout={CardSectionLayout.SingleWideColumn}
      justifyContent="center"
      key={`data-view-display-section-card-section-${view.viewId}`}
      taskName={taskName}
      widgets={view.widgets}
    />
  ),
  [ViewType.config]: ({ taskName, view, entityActions }) => (
    <ConfigView widgets={view.widgets} entityActions={entityActions} taskName={taskName} />
  ),
  [ViewType.table]: ({ taskName, view }) => (
    <GridAreaSection
      entityId={view.attributes[0]?.id} // TODO possible bug, this is the base for the custom actions on table, is this ok?
      entityName={view.params.baseModel}
      key={`data-view-display-section-grid-area-section-${view.id}`}
      sortableColumns={true}
      taskName={taskName}
      widget={view as Widget}
    />
  ),
};

export function ViewSwitcher({ entityActions, taskName, view }: DisplaySectionViewsProps) {
  if (!view.type || isNilOrEmpty(componentByViewType[view.type])) {
    console.error(`There is no valid component for view type ${view.type}.`);
    return null;
  }

  const View = componentByViewType[view.type];

  return <View entityActions={entityActions} taskName={taskName} view={view} />;
}
