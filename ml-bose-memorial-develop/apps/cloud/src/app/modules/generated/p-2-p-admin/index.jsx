import { KUIConnect, AccessControl } from '@kleeen/core-react';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { WorkflowProvider, useFilterContext, useKleeenActions } from '@kleeen/react/hooks';
import {
  EntireProductDomainLayoutStyle,
  HeaderAndSubSections,
  ViewsManager,
} from '@kleeen/react/atomic-elements';
import { widgets } from './settings/widgets';

function Workflow({ translate, ...props }) {
  const taskName = `p2PAdmin`;
  const workflowData = {
    hasFilters: false,
    taskName: 'p2PAdmin',
    workflowId: 'd2aa467d-d4cb-4030-848a-30fcf164aed7',
  };
  const classes = EntireProductDomainLayoutStyle();
  const workflowName = `P2P Admin`;
  const p2PAdminActions = useKleeenActions(taskName);

  return (
    <AccessControl id={roleAccessKeyTag(`navigation.${taskName}`)}>
      <WorkflowProvider value={workflowData}>
        <div className={`${classes.entityBrowserTask} subhead-dynamic`}>
          <ViewsManager
            views={widgets}
            SubHeader={HeaderAndSubSections}
            subHeaderProps={{
              hideRefreshControl: true,
              translate,
              taskName,
              title: workflowName,
              actionsProps: {
                attributes: [],
              },
            }}
            containerClasses={`${classes.entityBrowserArea} browserArea`}
            pageIntroClasses={`${classes.gridPageIntro}`}
            contentClasses={`${classes.gridGridSection}`}
            entityActions={p2PAdminActions}
            taskName={taskName}
          />
        </div>
      </WorkflowProvider>
    </AccessControl>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(Workflow);
