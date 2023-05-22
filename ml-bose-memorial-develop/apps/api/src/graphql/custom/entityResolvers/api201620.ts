import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorPhoneNumber extends RESTDataSource {
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

  // Add DonorPhoneNumber
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('donorPhoneNumber', entity);

    // Sample HTTP POST request.
    // return this.post('donorPhoneNumber', entity);
  }

  // Delete DonorPhoneNumber
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorPhoneNumber', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorPhoneNumber/${id}`);
  }

  // List DonorPhoneNumber
  async listEntity(params: any) {
    return KapiCrud.list('donorPhoneNumber', params);

    // Sample HTTP GET request.
    // return this.get('donorPhoneNumber', params);
  }

  // Get DonorPhoneNumber
  async getEntity(id: string) {
    return KapiCrud.get('donorPhoneNumber', id);

    // Sample HTTP GET request.
    // return this.get(`donorPhoneNumber/${id}`);
  }

  // Update DonorPhoneNumber
  async updateEntity(entity) {
    return KapiCrud.update('donorPhoneNumber', entity);

    // Sample HTTP PATCH request.
    // return this.patch(donorPhoneNumber, entity);
  }

  // Auto complete for DonorPhoneNumber
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorPhoneNumber');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorPhoneNumber }));
  }
}
