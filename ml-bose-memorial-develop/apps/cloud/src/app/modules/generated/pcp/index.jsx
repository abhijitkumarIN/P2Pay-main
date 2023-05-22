import { KUIConnect, AccessControl } from '@kleeen/core-react';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { WorkflowProvider, useFilterContext, useKleeenActions, useUrlQueryParams } from '@kleeen/react/hooks';
import {
  CollectionLayoutStyle,
  HeaderAndSubSections,
  ViewsManager,
  getRowsCountFromFirstTable,
} from '@kleeen/react/atomic-elements';
import { widgets } from './settings/widgets';
import { workflowAction } from './settings/workflow-action';

function Workflow({ translate, ...props }) {
  const taskName = `pcp`;
  const workflowData = {
    hasFilters: true,
    taskName: 'pcp',
    workflowId: 'fcc6b945-6224-4981-80af-8e6482d1f706',
    entity: 'PrimaryCareId',
  };
  const entity = `PrimaryCareId`;
  const classes = CollectionLayoutStyle();
  const workflowName = `PCP`;
  const params = { operationName: 'workflow_filters_fcc6b945_6224_4981_80af_8e6482d1f706' };

  const { data } =
    useFilterContext({
      taskName,
      widgetId: 'workflow_filters_fcc6b945_6224_4981_80af_8e6482d1f706',
      params,
    }) || {};

  const objectFocus = `primaryCareId`;
  const primaryCareIdActions = useKleeenActions(taskName);
  const { paramsBasedOnRoute } = useUrlQueryParams();
  const currentEntity = { id: paramsBasedOnRoute[entity], entity };

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
              parent: currentEntity,
              translate,
              taskName,
              title: workflowName,
              subTitle: `${getRowsCountFromFirstTable(widgets, taskName)} Count of ${entity}`,
              withFilterSection: true,
              filters: data?.filters,
              actionsProps: {
                entityName: entity,
                actions: workflowAction,
                entityActions: primaryCareIdActions,
                attributes: [],
              },
            }}
            containerClasses={`${classes.entityBrowserArea} browserArea`}
            pageIntroClasses={`${classes.gridPageIntro}`}
            contentClasses={`${classes.gridGridSection}`}
            entityName={entity}
            taskName={taskName}
          />
        </div>
      </WorkflowProvider>
    </AccessControl>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(Workflow);
