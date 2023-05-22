import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorBusiness extends RESTDataSource {
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

  // Add DonorBusiness
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorBusiness', entity);

    // Sample HTTP POST request.
    // return this.post('donorBusiness', entity);
  }

  // Delete DonorBusiness
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorBusiness', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorBusiness/${id}`);
  }

  // List DonorBusiness
  async listEntity(params: any) {
    return KapiCrud.list('donorBusiness', params);

    // Sample HTTP GET request.
    // return this.get('donorBusiness', params);
  }

  // Get DonorBusiness
  async getEntity(id: string) {
    return KapiCrud.get('donorBusiness', id);

    // Sample HTTP GET request.
    // return this.get(`donorBusiness/${id}`);
  }

  // Update DonorBusiness
  async updateEntity(entity) {
    return KapiCrud.update('donorBusiness', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorBusiness, entity);
  }

  // Auto complete for DonorBusiness
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorBusiness');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorBusiness }));
  }
}
