import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiZipCode extends RESTDataSource {
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

  // Add ZipCode
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('zipCode', entity);

    // Sample HTTP POST request.
    // return this.post('zipCode', entity);
  }

  // Delete ZipCode
  async deleteEntity(id: string) {
    return KapiCrud.delete('zipCode', id);

    // Sample HTTP DELETE request.
    // return this.delete(`zipCode/${id}`);
  }

  // List ZipCode
  async listEntity(params: any) {
    return KapiCrud.list('zipCode', params);

    // Sample HTTP GET request.
    // return this.get('zipCode', params);
  }

  // Get ZipCode
  async getEntity(id: string) {
    return KapiCrud.get('zipCode', id);

    // Sample HTTP GET request.
    // return this.get(`zipCode/${id}`);
  }

  // Update ZipCode
  async updateEntity(entity) {
    return KapiCrud.update('zipCode', entity);

    // Sample HTTP PATCH request.
    // return this.patch(zipCode, entity);
  }

  // Auto complete for ZipCode
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('zipCode');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.zipCode }));
  }
}
