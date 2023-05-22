import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMinPerTransaction extends RESTDataSource {
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

  // Add MinPerTransaction
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('minPerTransaction', entity);

    // Sample HTTP POST request.
    // return this.post('minPerTransaction', entity);
  }

  // Delete MinPerTransaction
  async deleteEntity(id: string) {
    return KapiCrud.delete('minPerTransaction', id);

    // Sample HTTP DELETE request.
    // return this.delete(`minPerTransaction/${id}`);
  }

  // List MinPerTransaction
  async listEntity(params: any) {
    return KapiCrud.list('minPerTransaction', params);

    // Sample HTTP GET request.
    // return this.get('minPerTransaction', params);
  }

  // Get MinPerTransaction
  async getEntity(id: string) {
    return KapiCrud.get('minPerTransaction', id);

    // Sample HTTP GET request.
    // return this.get(`minPerTransaction/${id}`);
  }

  // Update MinPerTransaction
  async updateEntity(entity) {
    return KapiCrud.update('minPerTransaction', entity);

    // Sample HTTP PATCH request.
    // return this.patch(minPerTransaction, entity);
  }

  // Auto complete for MinPerTransaction
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('minPerTransaction');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.minPerTransaction }));
  }
}
