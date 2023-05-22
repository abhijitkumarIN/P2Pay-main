import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorZip extends RESTDataSource {
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

  // Add DonorZip
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorZip', entity);

    // Sample HTTP POST request.
    // return this.post('donorZip', entity);
  }

  // Delete DonorZip
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorZip', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorZip/${id}`);
  }

  // List DonorZip
  async listEntity(params: any) {
    return KapiCrud.list('donorZip', params);

    // Sample HTTP GET request.
    // return this.get('donorZip', params);
  }

  // Get DonorZip
  async getEntity(id: string) {
    return KapiCrud.get('donorZip', id);

    // Sample HTTP GET request.
    // return this.get(`donorZip/${id}`);
  }

  // Update DonorZip
  async updateEntity(entity) {
    return KapiCrud.update('donorZip', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorZip, entity);
  }

  // Auto complete for DonorZip
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorZip');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorZip }));
  }
}
