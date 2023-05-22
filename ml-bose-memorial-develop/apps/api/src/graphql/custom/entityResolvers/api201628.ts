import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorCurrentBalance extends RESTDataSource {
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

  // Add DonorCurrentBalance
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorCurrentBalance', entity);

    // Sample HTTP POST request.
    // return this.post('donorCurrentBalance', entity);
  }

  // Delete DonorCurrentBalance
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorCurrentBalance', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorCurrentBalance/${id}`);
  }

  // List DonorCurrentBalance
  async listEntity(params: any) {
    return KapiCrud.list('donorCurrentBalance', params);

    // Sample HTTP GET request.
    // return this.get('donorCurrentBalance', params);
  }

  // Get DonorCurrentBalance
  async getEntity(id: string) {
    return KapiCrud.get('donorCurrentBalance', id);

    // Sample HTTP GET request.
    // return this.get(`donorCurrentBalance/${id}`);
  }

  // Update DonorCurrentBalance
  async updateEntity(entity) {
    return KapiCrud.update('donorCurrentBalance', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorCurrentBalance, entity);
  }

  // Auto complete for DonorCurrentBalance
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorCurrentBalance');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorCurrentBalance }));
  }
}
