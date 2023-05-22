import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorSpentYtd extends RESTDataSource {
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

  // Add DonorSpentYtd
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorSpentYtd', entity);

    // Sample HTTP POST request.
    // return this.post('donorSpentYtd', entity);
  }

  // Delete DonorSpentYtd
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorSpentYtd', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorSpentYtd/${id}`);
  }

  // List DonorSpentYtd
  async listEntity(params: any) {
    return KapiCrud.list('donorSpentYtd', params);

    // Sample HTTP GET request.
    // return this.get('donorSpentYtd', params);
  }

  // Get DonorSpentYtd
  async getEntity(id: string) {
    return KapiCrud.get('donorSpentYtd', id);

    // Sample HTTP GET request.
    // return this.get(`donorSpentYtd/${id}`);
  }

  // Update DonorSpentYtd
  async updateEntity(entity) {
    return KapiCrud.update('donorSpentYtd', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorSpentYtd, entity);
  }

  // Auto complete for DonorSpentYtd
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorSpentYtd');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorSpentYtd }));
  }
}
