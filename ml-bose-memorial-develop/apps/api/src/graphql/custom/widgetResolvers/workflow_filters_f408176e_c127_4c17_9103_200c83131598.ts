import { WorkflowFiltersResults, AuthContext } from '../../../types';
import { filterSectionFilters } from '../../../assets/filters/workflow_filters_f408176e_c127_4c17_9103_200c83131598';

//Donors filters
export const workflow_filters_f408176e_c127_4c17_9103_200c83131598 = async (
  input: never,
  context: AuthContext,
): Promise<WorkflowFiltersResults> => {
  const filters: any = filterSectionFilters.map(async (filter) => {
    // KAPI - Integration

    // In order for you to connect your backend, you have to use the dataSource 'formatCheckApi' instead of 'formatCheckFakeApi'

    const accessResponse = await context.dataSources.formatCheckFakeApi.accessControlCheck({
      widgetId: workflow_filters_f408176e_c127_4c17_9103_200c83131598,
      section: filter.name,
    });

    return { ...filter, ...accessResponse };
  });

  return { filters };
};
