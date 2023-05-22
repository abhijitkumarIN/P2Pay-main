import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiUploadedBy extends RESTDataSource {
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

  // Add UploadedBy
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('uploadedBy', entity);

    // Sample HTTP POST request.
    // return this.post('uploadedBy', entity);
  }

  // Delete UploadedBy
  async deleteEntity(id: string) {
    return KapiCrud.delete('uploadedBy', id);

    // Sample HTTP DELETE request.
    // return this.delete(`uploadedBy/${id}`);
  }

  // List UploadedBy
  async listEntity(params: any) {
    return KapiCrud.list('uploadedBy', params);

    // Sample HTTP GET request.
    // return this.get('uploadedBy', params);
  }

  // Get UploadedBy
  async getEntity(id: string) {
    return KapiCrud.get('uploadedBy', id);

    // Sample HTTP GET request.
    // return this.get(`uploadedBy/${id}`);
  }

  // Update UploadedBy
  async updateEntity(entity) {
    return KapiCrud.update('uploadedBy', entity);

    // Sample HTTP PATCH request.
    // return this.patch(uploadedBy, entity);
  }

  // Auto complete for UploadedBy
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('uploadedBy');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.uploadedBy }));
  }
}
