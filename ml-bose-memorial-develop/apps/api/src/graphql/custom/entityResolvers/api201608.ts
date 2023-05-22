import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorId extends RESTDataSource {
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

  // Add DonorId
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorId', entity);

    // Sample HTTP POST request.
    // return this.post('donorId', entity);
  }

  // Delete DonorId
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorId', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorId/${id}`);
  }

  // List DonorId
  async listEntity(params: any) {
    return KapiCrud.list('donorId', params);

    // Sample HTTP GET request.
    // return this.get('donorId', params);
  }

  // Get DonorId
  async getEntity(id: string) {
    return KapiCrud.get('donorId', id);

    // Sample HTTP GET request.
    // return this.get(`donorId/${id}`);
  }

  // Update DonorId
  async updateEntity(entity) {
    return KapiCrud.update('donorId', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorId, entity);
  }

  // Auto complete for DonorId
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorId');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorId }));
  }
}
