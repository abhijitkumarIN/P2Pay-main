import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorFax extends RESTDataSource {
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

  // Add DonorFax
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorFax', entity);

    // Sample HTTP POST request.
    // return this.post('donorFax', entity);
  }

  // Delete DonorFax
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorFax', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorFax/${id}`);
  }

  // List DonorFax
  async listEntity(params: any) {
    return KapiCrud.list('donorFax', params);

    // Sample HTTP GET request.
    // return this.get('donorFax', params);
  }

  // Get DonorFax
  async getEntity(id: string) {
    return KapiCrud.get('donorFax', id);

    // Sample HTTP GET request.
    // return this.get(`donorFax/${id}`);
  }

  // Update DonorFax
  async updateEntity(entity) {
    return KapiCrud.update('donorFax', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorFax, entity);
  }

  // Auto complete for DonorFax
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorFax');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorFax }));
  }
}
