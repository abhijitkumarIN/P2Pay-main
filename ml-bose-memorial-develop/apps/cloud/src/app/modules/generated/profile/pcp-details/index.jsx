import { KUIConnect, AccessControl } from '@kleeen/core-react';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { WorkflowProvider, useFilterContext, useKleeenActions } from '@kleeen/react/hooks';
import { SimpleLayoutStyle, HeaderAndSubSections, ViewsManager } from '@kleeen/react/atomic-elements';
import { widgets } from './settings/widgets';
import { workflowAction } from './settings/workflow-action';
import { entityDetailsSectionEntityDetails } from './settings/entity-details-section-entity-details';

function Workflow({ translate, ...props }) {
  const taskName = `pcpDetails`;
  const workflowData = {
    hasFilters: false,
    taskName: 'pcpDetails',
    workflowId: '9315b5e6-35f5-4b34-b4b5-15ec66d7d696',
    entity: 'PrimaryCareId',
  };
  const entity = `PrimaryCareId`;
  const classes = SimpleLayoutStyle();
  const workflowName = `PCP Details`;
  const objectFocus = `primaryCareId`;
  const primaryCareIdActions = useKleeenActions(taskName);

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
                entityActions: primaryCareIdActions,
                attributes: [],
              },
              withSummarySection: {
                entityDetails: entityDetailsSectionEntityDetails,
                displayTaskName: workflowName,
                isEditable: true,
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
