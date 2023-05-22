import { WorkflowFiltersResults, AuthContext } from '../../../types';
import { filterSectionFilters } from '../../../assets/filters/workflow_filters_4ac97d96_d45f_441a_aebd_85e886714d70';

//Transactions filters
export const workflow_filters_4ac97d96_d45f_441a_aebd_85e886714d70 = async (
  input: never,
  context: AuthContext,
): Promise<WorkflowFiltersResults> => {
  const filters: any = filterSectionFilters.map(async (filter) => {
    // KAPI - Integration

    // In order for you to connect your backend, you have to use the dataSource 'formatCheckApi' instead of 'formatCheckFakeApi'

    const accessResponse = await context.dataSources.formatCheckFakeApi.accessControlCheck({
      widgetId: workflow_filters_4ac97d96_d45f_441a_aebd_85e886714d70,
      section: filter.name,
    });

    return { ...filter, ...accessResponse };
  });

  return { filters };
};
