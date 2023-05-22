import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTitle extends RESTDataSource {
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

  // Add Title
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('title', entity);

    // Sample HTTP POST request.
    // return this.post('title', entity);
  }

  // Delete Title
  async deleteEntity(id: string) {
    return KapiCrud.delete('title', id);

    // Sample HTTP DELETE request.
    // return this.delete(`title/${id}`);
  }

  // List Title
  async listEntity(params: any) {
    return KapiCrud.list('title', params);

    // Sample HTTP GET request.
    // return this.get('title', params);
  }

  // Get Title
  async getEntity(id: string) {
    return KapiCrud.get('title', id);

    // Sample HTTP GET request.
    // return this.get(`title/${id}`);
  }

  // Update Title
  async updateEntity(entity) {
    return KapiCrud.update('title', entity);

    // Sample HTTP PATCH request.
    // return this.patch(title, entity);
  }

  // Auto complete for Title
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('title');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.title }));
  }
}
