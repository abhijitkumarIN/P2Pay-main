import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiNpi extends RESTDataSource {
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

  // Add Npi
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('npi', entity);

    // Sample HTTP POST request.
    // return this.post('npi', entity);
  }

  // Delete Npi
  async deleteEntity(id: string) {
    return KapiCrud.delete('npi', id);

    // Sample HTTP DELETE request.
    // return this.delete(`npi/${id}`);
  }

  // List Npi
  async listEntity(params: any) {
    return KapiCrud.list('npi', params);

    // Sample HTTP GET request.
    // return this.get('npi', params);
  }

  // Get Npi
  async getEntity(id: string) {
    return KapiCrud.get('npi', id);

    // Sample HTTP GET request.
    // return this.get(`npi/${id}`);
  }

  // Update Npi
  async updateEntity(entity) {
    return KapiCrud.update('npi', entity);

    // Sample HTTP PATCH request.
    // return this.patch(npi, entity);
  }

  // Auto complete for Npi
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('npi');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.npi }));
  }
}
