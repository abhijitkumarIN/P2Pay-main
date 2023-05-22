import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMedicare extends RESTDataSource {
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

  // Add Medicare
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('medicare', entity);

    // Sample HTTP POST request.
    // return this.post('medicare', entity);
  }

  // Delete Medicare
  async deleteEntity(id: string) {
    return KapiCrud.delete('medicare', id);

    // Sample HTTP DELETE request.
    // return this.delete(`medicare/${id}`);
  }

  // List Medicare
  async listEntity(params: any) {
    return KapiCrud.list('medicare', params);

    // Sample HTTP GET request.
    // return this.get('medicare', params);
  }

  // Get Medicare
  async getEntity(id: string) {
    return KapiCrud.get('medicare', id);

    // Sample HTTP GET request.
    // return this.get(`medicare/${id}`);
  }

  // Update Medicare
  async updateEntity(entity) {
    return KapiCrud.update('medicare', entity);

    // Sample HTTP PATCH request.
    // return this.patch(medicare, entity);
  }

  // Auto complete for Medicare
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('medicare');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.medicare }));
  }
}
