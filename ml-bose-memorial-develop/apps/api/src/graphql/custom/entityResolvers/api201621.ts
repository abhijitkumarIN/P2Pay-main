import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMaxPerTransaction extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://put.your.api.here/';
    // You can access the token, data sources,
    // and the current user through 'this.context'.
  }

  willSendRequest(request: RequestOptions) {
    // Uncomment the following line to set a header token.
    // request.headers.set('Authorization', this.context.token);
    // Uncomment the following line to set params token.
    // request.params.set('api_key', this.context.token);
  }

  // Add MaxPerTransaction
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('maxPerTransaction', entity);

    // Sample HTTP POST request.
    // return this.post('maxPerTransaction', entity);
  }

  // Delete MaxPerTransaction
  async deleteEntity(id: string) {
    return KapiCrud.delete('maxPerTransaction', id);

    // Sample HTTP DELETE request.
    // return this.delete(`maxPerTransaction/${id}`);
  }

  // List MaxPerTransaction
  async listEntity(params: any) {
    return KapiCrud.list('maxPerTransaction', params);

    // Sample HTTP GET request.
    // return this.get('maxPerTransaction', params);
  }

  // Get MaxPerTransaction
  async getEntity(id: string) {
    return KapiCrud.get('maxPerTransaction', id);

    // Sample HTTP GET request.
    // return this.get(`maxPerTransaction/${id}`);
  }

  // Update MaxPerTransaction
  async updateEntity(entity) {
    return KapiCrud.update('maxPerTransaction', entity);

    // Sample HTTP PATCH request.
    // return this.patch(maxPerTransaction, entity);
  }

  // Auto complete for MaxPerTransaction
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('maxPerTransaction');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.maxPerTransaction }));
  }
}
