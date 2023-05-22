import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiBalanceDue extends RESTDataSource {
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

  // Add BalanceDue
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('balanceDue', entity);

    // Sample HTTP POST request.
    // return this.post('balanceDue', entity);
  }

  // Delete BalanceDue
  async deleteEntity(id: string) {
    return KapiCrud.delete('balanceDue', id);

    // Sample HTTP DELETE request.
    // return this.delete(`balanceDue/${id}`);
  }

  // List BalanceDue
  async listEntity(params: any) {
    return KapiCrud.list('balanceDue', params);

    // Sample HTTP GET request.
    // return this.get('balanceDue', params);
  }

  // Get BalanceDue
  async getEntity(id: string) {
    return KapiCrud.get('balanceDue', id);

    // Sample HTTP GET request.
    // return this.get(`balanceDue/${id}`);
  }

  // Update BalanceDue
  async updateEntity(entity) {
    return KapiCrud.update('balanceDue', entity);

    // Sample HTTP PATCH request.
    // return this.patch(balanceDue, entity);
  }

  // Auto complete for BalanceDue
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('balanceDue');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.balanceDue }));
  }
}
