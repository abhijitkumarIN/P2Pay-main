import { KUIConnect, AccessControl } from '@kleeen/core-react';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { WorkflowProvider, useFilterContext, useKleeenActions } from '@kleeen/react/hooks';
import { SimpleLayoutStyle, HeaderAndSubSections, ViewsManager } from '@kleeen/react/atomic-elements';
import { widgets } from './settings/widgets';
import { workflowAction } from './settings/workflow-action';
import { entityDetailsSectionEntityDetails } from './settings/entity-details-section-entity-details';

function Workflow({ translate, ...props }) {
  const taskName = `doctorDetails`;
  const workflowData = {
    hasFilters: false,
    taskName: 'doctorDetails',
    workflowId: 'ec8af742-49d1-4e0c-bef1-3308436b6f4c',
    entity: 'PrimaryCareName',
  };
  const entity = `PrimaryCareName`;
  const classes = SimpleLayoutStyle();
  const workflowName = `Doctor Details`;
  const objectFocus = `primaryCareName`;
  const primaryCareNameActions = useKleeenActions(taskName);

  return (
    <AccessControl id={roleAccessKeyTag(`navigation.${taskName}`)}>
      <WorkflowProvider value={workflowData}>
        <div className={`${classes.entityBrowserTask} subhead-dynamic`}>
          <ViewsManager
            views={widgets}
            SubHeader={HeaderAndSubSections}
            subHeaderProps={{
              hideRefreshControl: true,
              objectValue: objectFocus,
              translate,
              upText: workflowName,
              title: entity,
              taskName,
              actionsProps: {
                entityName: entity,
                actions: workflowAction,
                entityActions: primaryCareNameActions,
                attributes: [],
              },
              withSummarySection: {
                entityDetails: entityDetailsSectionEntityDetails,
                displayTaskName: workflowName,
                entityName: entity,
                taskName: taskName,
              },
            }}
            containerClasses={`${classes.entityBrowserAreaWithDetailsSection} openDetailsSection`}
            pageIntroClasses={`${classes.gridPageIntro}`}
            contentClasses={`${classes.dataViewDisplaySection}`}
            entityName={entity}
            taskName={taskName}
          />
        </div>
      </WorkflowProvider>
    </AccessControl>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(Workflow);
