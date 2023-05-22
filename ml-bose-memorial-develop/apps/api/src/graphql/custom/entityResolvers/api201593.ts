import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiPrimaryCareName extends RESTDataSource {
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

  // Add PrimaryCareName
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('primaryCareName', entity);

    // Sample HTTP POST request.
    // return this.post('primaryCareName', entity);
  }

  // Delete PrimaryCareName
  async deleteEntity(id: string) {
    return KapiCrud.delete('primaryCareName', id);

    // Sample HTTP DELETE request.
    // return this.delete(`primaryCareName/${id}`);
  }

  // List PrimaryCareName
  async listEntity(params: any) {
    return KapiCrud.list('primaryCareName', params);

    // Sample HTTP GET request.
    // return this.get('primaryCareName', params);
  }

  // Get PrimaryCareName
  async getEntity(id: string) {
    return KapiCrud.get('primaryCareName', id);

    // Sample HTTP GET request.
    // return this.get(`primaryCareName/${id}`);
  }

  // Update PrimaryCareName
  async updateEntity(entity) {
    return KapiCrud.update('primaryCareName', entity);

    // Sample HTTP PATCH request.
    // return this.patch(primaryCareName, entity);
  }

  // Auto complete for PrimaryCareName
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('primaryCareName');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.primaryCareName }));
  }
}
