import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTotalDonorPayments extends RESTDataSource {
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

  // Add TotalDonorPayments
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('totalDonorPayments', entity);

    // Sample HTTP POST request.
    // return this.post('totalDonorPayments', entity);
  }

  // Delete TotalDonorPayments
  async deleteEntity(id: string) {
    return KapiCrud.delete('totalDonorPayments', id);

    // Sample HTTP DELETE request.
    // return this.delete(`totalDonorPayments/${id}`);
  }

  // List TotalDonorPayments
  async listEntity(params: any) {
    return KapiCrud.list('totalDonorPayments', params);

    // Sample HTTP GET request.
    // return this.get('totalDonorPayments', params);
  }

  // Get TotalDonorPayments
  async getEntity(id: string) {
    return KapiCrud.get('totalDonorPayments', id);

    // Sample HTTP GET request.
    // return this.get(`totalDonorPayments/${id}`);
  }

  // Update TotalDonorPayments
  async updateEntity(entity) {
    return KapiCrud.update('totalDonorPayments', entity);

    // Sample HTTP PATCH request.
    // return this.patch(totalDonorPayments, entity);
  }

  // Auto complete for TotalDonorPayments
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('totalDonorPayments');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.totalDonorPayments }));
  }
}
