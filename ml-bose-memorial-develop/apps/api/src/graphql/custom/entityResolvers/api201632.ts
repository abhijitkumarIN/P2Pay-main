import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorCommitment extends RESTDataSource {
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

  // Add DonorCommitment
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorCommitment', entity);

    // Sample HTTP POST request.
    // return this.post('donorCommitment', entity);
  }

  // Delete DonorCommitment
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorCommitment', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorCommitment/${id}`);
  }

  // List DonorCommitment
  async listEntity(params: any) {
    return KapiCrud.list('donorCommitment', params);

    // Sample HTTP GET request.
    // return this.get('donorCommitment', params);
  }

  // Get DonorCommitment
  async getEntity(id: string) {
    return KapiCrud.get('donorCommitment', id);

    // Sample HTTP GET request.
    // return this.get(`donorCommitment/${id}`);
  }

  // Update DonorCommitment
  async updateEntity(entity) {
    return KapiCrud.update('donorCommitment', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorCommitment, entity);
  }

  // Auto complete for DonorCommitment
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorCommitment');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorCommitment }));
  }
}
