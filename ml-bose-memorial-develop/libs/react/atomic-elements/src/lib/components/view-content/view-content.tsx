import { KsViewContainer } from './view-container';
import { KsViewContentProps } from './view-content.model';
import { ViewSwitcher } from './view-switcher';
import { useGetWidgetsAmount } from '@kleeen/react/hooks';

export const KsViewContent = (props: KsViewContentProps) => {
  const { view, taskName, entityActions } = props;

  useGetWidgetsAmount(props.setCardsNumber);

  return (
    <KsViewContainer>
      <ViewSwitcher entityActions={entityActions} taskName={taskName} view={view} />
    </KsViewContainer>
  );
};
