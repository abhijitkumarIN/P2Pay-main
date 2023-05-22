import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiAptNo extends RESTDataSource {
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

  // Add AptNo
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('aptNo', entity);

    // Sample HTTP POST request.
    // return this.post('aptNo', entity);
  }

  // Delete AptNo
  async deleteEntity(id: string) {
    return KapiCrud.delete('aptNo', id);

    // Sample HTTP DELETE request.
    // return this.delete(`aptNo/${id}`);
  }

  // List AptNo
  async listEntity(params: any) {
    return KapiCrud.list('aptNo', params);

    // Sample HTTP GET request.
    // return this.get('aptNo', params);
  }

  // Get AptNo
  async getEntity(id: string) {
    return KapiCrud.get('aptNo', id);

    // Sample HTTP GET request.
    // return this.get(`aptNo/${id}`);
  }

  // Update AptNo
  async updateEntity(entity) {
    return KapiCrud.update('aptNo', entity);

    // Sample HTTP PATCH request.
    // return this.patch(aptNo, entity);
  }

  // Auto complete for AptNo
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('aptNo');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.aptNo }));
  }
}
