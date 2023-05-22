import { GroupByProps, ValuesProps, WidgetContextParams } from '@kleeen/types';
import { ajax, getErrorHandler } from './operations';
import {
  autoCompleteQuery,
  createEntityQuery,
  deleteEntityQuery,
  dispatchCustomActionQuery,
  formatCheckQuery,
  getChartDataQuery,
  getEntityQuery,
  getFilterQuery,
  getListingDataQuery,
  getMultiAggWidgetQuery,
  getOnboardingPreferencesQuery,
  getWorkflowFiltersQuery,
  listEntityQuery,
  setOnboardingPreferencesQuery,
  updateEntityQuery,
} from './grahpql-operations';
import { buildUrlQueryParams, entityMap, isNilOrEmpty, upperCamelCase } from '@kleeen/common/utils';

import { ENDPOINT_URL } from './constants';
import { dissoc } from 'ramda';
import { getFiltersInput } from './filters';
import querystring from 'querystring';
import { throwError } from 'rxjs';

/**
 * Uses rxjs to resolve each operation.
 */
export class BaseApiService {
  static get(url, responseType = 'json', params = {}, customUrl = false) {
    const queryParams = buildUrlQueryParams(params);
    return BaseApiService.ajax(
      'GET',
      `${url}${queryParams}`,
      responseType,
      undefined,
      {
        'X-Requested-With': 'XMLHttpRequest',
      },
      ENDPOINT_URL,
      customUrl,
    );
  }

  static delete(
    url,
    body,
    responseType = 'json',
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    stringify = true,
  ) {
    return BaseApiService.ajax(
      'DELETE',
      url,
      responseType,
      stringify ? querystring.stringify(body) : body,
      { ...headers },
      ENDPOINT_URL,
    );
  }

  static post(
    url,
    body,
    responseType = 'json',
    headers = {
      'Content-Type': 'application/json',
    },
    stringify = true,
  ) {
    return BaseApiService.ajax(
      'POST',
      url,
      responseType,
      stringify ? JSON.stringify(body) : body,
      {
        ...headers,
      },
      ENDPOINT_URL,
    );
  }

  static patch(
    url,
    body,
    responseType = 'json',
    headers = {
      'Content-Type': 'application/json',
    },
    stringify = true,
  ) {
    return BaseApiService.ajax(
      'PATCH',
      url,
      responseType,
      stringify ? JSON.stringify(body) : body,
      {
        ...headers,
      },
      ENDPOINT_URL,
    );
  }

  static ajax(method, url, responseType, body, headers, endpointUrl, customUrl?) {
    return ajax(method, url, responseType, body, headers, endpointUrl, customUrl);
  }

  static getErrorHandler(className, methodName) {
    return getErrorHandler(className, methodName);
  }

  static genericChartWidgetQuery = ({ payload }) => {
    const { baseModel, aggregatedByType, aggregatedBy, aggregation_attribute, aggregation, ...restParams } =
      payload.params;

    let aggregationQueries = {};
    if (aggregatedByType) {
      aggregationQueries = {
        [`_${aggregatedByType}`]: aggregatedBy,
        _aggregation_attribute: aggregation_attribute,
        _aggregation: aggregation,
      };
    }

    const queryObject = {
      ...restParams,
      ...aggregationQueries,
    };

    const queryParams = Object.entries(queryObject)
      .map(
        ([param, value]) =>
          `${param}${payload.type === 'FILTER' && !param.startsWith('_') ? '_like' : ''}=${value}`,
      )
      .join('&');

    return BaseApiService.get(`${baseModel}?${queryParams}`);
  };

  static genericDispatchCustomAction(params: WidgetContextParams) {
    const { baseModel, displayName, extraParams, operationName } = params;
    if (!baseModel) {
      console.warn('The base model for the custom action is empty', baseModel);
      return;
    }
    const filters = getFiltersInput(params?.filters);
    const parsedOperationName = operationName ? operationName : `${displayName}${entityMap[baseModel]}`;
    const variables = {
      input: {
        entity: baseModel,
        extraParams,
        filters,
        functionName: displayName,
      },
    };
    const query = dispatchCustomActionQuery(parsedOperationName);

    return BaseApiService.post(`graphql?operationName=${parsedOperationName}`, { query, variables });
  }

  static graphqlChartWidgetQuery(params: WidgetContextParams, latestRequestTimestamp?: number) {
    const { operationName } = params;
    let query: string, variables;

    if (isNilOrEmpty(operationName)) {
      return throwError(new TypeError(`operationName has an invalid value`));
    }

    const filters = getFiltersInput(params?.filters);
    const isListingOperation = ['widget_config', 'entity_detail', 'summary_slot', 'object_listing'].some(
      (item) => operationName.includes(item),
    );

    if (isListingOperation) {
      variables = {
        input: {
          attributes: params.attributes,
          entity: params.baseModel,
          filters,
          latestRequestTimestamp,
          pagination: params.pagination,
          sorting: params.sorting,
        },
      };
      query = getListingDataQuery(operationName);
    } else if (operationName === 'filters') {
      variables = {
        input: {
          attributes: params.attributes ? (params.attributes as string).split(',') : [],
        },
      };
      query = getFilterQuery(operationName);
    } else if (operationName.includes('widget_statistics')) {
      variables = {
        input: {
          attributes: (params.value as ValuesProps)?.attributes?.map(({ name }) => name),
          entity: params.value?.name,
          filters,
          transformations: (params.value as ValuesProps).transformations.map(
            ({ transformation }) => transformation,
          ),
        },
      };
      query = getMultiAggWidgetQuery(operationName);
    } else if (operationName.includes('workflow_filters')) {
      query = getWorkflowFiltersQuery(operationName);
    } else {
      const { groupBy, value } = params;
      const groupByWithoutFormatType = dissoc<GroupByProps, 'formatType'>(
        'formatType',
        groupBy as GroupByProps,
      );
      const groupByToUse = isNilOrEmpty(groupByWithoutFormatType) ? null : groupByWithoutFormatType;
      variables = {
        input: {
          cardinality: params.cardinality,
          filters,
          groupBy: groupByToUse,
          value: dissoc<NonNullable<typeof value>, 'formatType'>(
            'formatType',
            value as NonNullable<typeof value>,
          ),
        },
      };
      query = getChartDataQuery(operationName);
    }

    return BaseApiService.post(`graphql?operationName=${operationName}`, { query, variables });
  }

  static commonQueryFactory = (entityName, queryToApply, operationName) => {
    return (params) => {
      const variables = { input: params };
      const parsedNamed = upperCamelCase(entityName);
      const query = queryToApply(entityMap[parsedNamed] || entityMap[entityName] || entityName);

      return BaseApiService.post(`graphql?operationName=${operationName}`, { query, variables });
    };
  };

  static graphqlEntityCRUD = (entityName) => ({
    create: BaseApiService.commonQueryFactory(entityName, createEntityQuery, `create${entityName}`),
    read: (params) => {
      return BaseApiService.commonQueryFactory(entityName, getEntityQuery, `read${entityName}`)(params.id);
    },
    update: BaseApiService.commonQueryFactory(entityName, updateEntityQuery, `update${entityName}`),
    delete: (params) => {
      return BaseApiService.commonQueryFactory(
        entityName,
        deleteEntityQuery,
        `delete${entityName}`,
      )(params.id);
    },
    list: BaseApiService.commonQueryFactory(entityName, listEntityQuery, `list${entityName}`),
  });

  static graphqlEntityAutoComplete = (entityName) => {
    return BaseApiService.commonQueryFactory(
      entityName,
      autoCompleteQuery,
      `autocomplete${entityName}`,
    )({ entity: entityName });
  };

  static graphqlFormatCheck = ({ taskName, widgetId, formField, formValue }) => {
    return BaseApiService.commonQueryFactory(
      null,
      formatCheckQuery,
      'formatCheck',
    )({ taskName, widgetId, formField, formValue });
  };

  static graphqlPreferencesQueries = {
    getOnboardingPreferences: (params) => {
      const variables = { input: params };
      return BaseApiService.post(`graphql?operationName=getOnboardingPreferences`, {
        query: getOnboardingPreferencesQuery,
        variables,
      });
    },
    setOnBoardingPreferences: (params) => {
      const variables = { input: { params } };
      return BaseApiService.post(`graphql?operationName=setOnboardingPreferencesQuery`, {
        query: setOnboardingPreferencesQuery,
        variables,
      });
    },
  };
}
