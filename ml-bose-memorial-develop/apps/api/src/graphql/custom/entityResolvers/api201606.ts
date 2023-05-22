import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiP2P extends RESTDataSource {
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

  // Add P2P
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('p2P', entity);

    // Sample HTTP POST request.
    // return this.post('p2P', entity);
  }

  // Delete P2P
  async deleteEntity(id: string) {
    return KapiCrud.delete('p2P', id);

    // Sample HTTP DELETE request.
    // return this.delete(`p2P/${id}`);
  }

  // List P2P
  async listEntity(params: any) {
    return KapiCrud.list('p2P', params);

    // Sample HTTP GET request.
    // return this.get('p2P', params);
  }

  // Get P2P
  async getEntity(id: string) {
    return KapiCrud.get('p2P', id);

    // Sample HTTP GET request.
    // return this.get(`p2P/${id}`);
  }

  // Update P2P
  async updateEntity(entity) {
    return KapiCrud.update('p2P', entity);

    // Sample HTTP PATCH request.
    // return this.patch(p2P, entity);
  }

  // Auto complete for P2P
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('p2P');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.p2P }));
  }
}
