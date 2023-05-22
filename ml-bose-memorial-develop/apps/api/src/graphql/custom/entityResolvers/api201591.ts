import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDob extends RESTDataSource {
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

  // Add Dob
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('dob', entity);

    // Sample HTTP POST request.
    // return this.post('dob', entity);
  }

  // Delete Dob
  async deleteEntity(id: string) {
    return KapiCrud.delete('dob', id);

    // Sample HTTP DELETE request.
    // return this.delete(`dob/${id}`);
  }

  // List Dob
  async listEntity(params: any) {
    return KapiCrud.list('dob', params);

    // Sample HTTP GET request.
    // return this.get('dob', params);
  }

  // Get Dob
  async getEntity(id: string) {
    return KapiCrud.get('dob', id);

    // Sample HTTP GET request.
    // return this.get(`dob/${id}`);
  }

  // Update Dob
  async updateEntity(entity) {
    return KapiCrud.update('dob', entity);

    // Sample HTTP PATCH request.
    // return this.patch(dob, entity);
  }

  // Auto complete for Dob
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('dob');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.dob }));
  }
}
