import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorSuite extends RESTDataSource {
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

  // Add DonorSuite
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorSuite', entity);

    // Sample HTTP POST request.
    // return this.post('donorSuite', entity);
  }

  // Delete DonorSuite
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorSuite', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorSuite/${id}`);
  }

  // List DonorSuite
  async listEntity(params: any) {
    return KapiCrud.list('donorSuite', params);

    // Sample HTTP GET request.
    // return this.get('donorSuite', params);
  }

  // Get DonorSuite
  async getEntity(id: string) {
    return KapiCrud.get('donorSuite', id);

    // Sample HTTP GET request.
    // return this.get(`donorSuite/${id}`);
  }

  // Update DonorSuite
  async updateEntity(entity) {
    return KapiCrud.update('donorSuite', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorSuite, entity);
  }

  // Auto complete for DonorSuite
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorSuite');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorSuite }));
  }
}
