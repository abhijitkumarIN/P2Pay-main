import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorStreetAddress extends RESTDataSource {
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

  // Add DonorStreetAddress
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorStreetAddress', entity);

    // Sample HTTP POST request.
    // return this.post('donorStreetAddress', entity);
  }

  // Delete DonorStreetAddress
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorStreetAddress', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorStreetAddress/${id}`);
  }

  // List DonorStreetAddress
  async listEntity(params: any) {
    return KapiCrud.list('donorStreetAddress', params);

    // Sample HTTP GET request.
    // return this.get('donorStreetAddress', params);
  }

  // Get DonorStreetAddress
  async getEntity(id: string) {
    return KapiCrud.get('donorStreetAddress', id);

    // Sample HTTP GET request.
    // return this.get(`donorStreetAddress/${id}`);
  }

  // Update DonorStreetAddress
  async updateEntity(entity) {
    return KapiCrud.update('donorStreetAddress', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorStreetAddress, entity);
  }

  // Auto complete for DonorStreetAddress
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorStreetAddress');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorStreetAddress }));
  }
}
