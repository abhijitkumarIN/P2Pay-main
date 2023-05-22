import { GRAPHQL_ENDPOINT } from './constants';

interface QueryVariables {
  query: string;
  token: string;
  variables: Record<string, any>;
}

/**
 * Simple API service that uses fetch.
 */
export class ApiService {
  static get<T>(operationName: string, queryVariables: QueryVariables): Promise<T> {
    return client(operationName, queryVariables);
  }
}

function client(operationName: string, { query, token, variables }: QueryVariables) {
  return fetch(`${GRAPHQL_ENDPOINT}?operationName=${operationName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((data) => data[operationName] || data);
}
