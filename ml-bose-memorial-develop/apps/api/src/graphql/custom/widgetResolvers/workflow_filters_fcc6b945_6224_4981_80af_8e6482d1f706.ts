import { WorkflowFiltersResults, AuthContext } from '../../../types';
import { filterSectionFilters } from '../../../assets/filters/workflow_filters_fcc6b945_6224_4981_80af_8e6482d1f706';

//PCP filters
export const workflow_filters_fcc6b945_6224_4981_80af_8e6482d1f706 = async (
  input: never,
  context: AuthContext,
): Promise<WorkflowFiltersResults> => {
  const filters: any = filterSectionFilters.map(async (filter) => {
    // KAPI - Integration

    // In order for you to connect your backend, you have to use the dataSource 'formatCheckApi' instead of 'formatCheckFakeApi'

    const accessResponse = await context.dataSources.formatCheckFakeApi.accessControlCheck({
      widgetId: workflow_filters_fcc6b945_6224_4981_80af_8e6482d1f706,
      section: filter.name,
    });

    return { ...filter, ...accessResponse };
  });

  return { filters };
};
