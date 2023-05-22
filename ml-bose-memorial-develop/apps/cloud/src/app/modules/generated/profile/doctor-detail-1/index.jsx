import { KUIConnect, AccessControl } from '@kleeen/core-react';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { WorkflowProvider, useFilterContext, useKleeenActions } from '@kleeen/react/hooks';
import { SimpleLayoutStyle, HeaderAndSubSections, ViewsManager } from '@kleeen/react/atomic-elements';
import { widgets } from './settings/widgets';
import { workflowAction } from './settings/workflow-action';
import { entityDetailsSectionEntityDetails } from './settings/entity-details-section-entity-details';

function Workflow({ translate, ...props }) {
  const taskName = `doctorDetail1`;
  const workflowData = {
    hasFilters: false,
    taskName: 'doctorDetail1',
    workflowId: 'b76efdbf-ed8c-48f5-8069-bd006e6825e7',
    entity: 'EligiblePcp',
  };
  const entity = `EligiblePcp`;
  const classes = SimpleLayoutStyle();
  const workflowName = `Doctor Detail 1`;
  const objectFocus = `eligiblePcp`;
  const eligiblePcpActions = useKleeenActions(taskName);

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
                entityActions: eligiblePcpActions,
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
