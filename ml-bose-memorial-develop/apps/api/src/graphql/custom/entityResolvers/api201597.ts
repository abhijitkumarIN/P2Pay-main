import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiPcpStreetAddress extends RESTDataSource {
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

  // Add PcpStreetAddress
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('pcpStreetAddress', entity);

    // Sample HTTP POST request.
    // return this.post('pcpStreetAddress', entity);
  }

  // Delete PcpStreetAddress
  async deleteEntity(id: string) {
    return KapiCrud.delete('pcpStreetAddress', id);

    // Sample HTTP DELETE request.
    // return this.delete(`pcpStreetAddress/${id}`);
  }

  // List PcpStreetAddress
  async listEntity(params: any) {
    return KapiCrud.list('pcpStreetAddress', params);

    // Sample HTTP GET request.
    // return this.get('pcpStreetAddress', params);
  }

  // Get PcpStreetAddress
  async getEntity(id: string) {
    return KapiCrud.get('pcpStreetAddress', id);

    // Sample HTTP GET request.
    // return this.get(`pcpStreetAddress/${id}`);
  }

  // Update PcpStreetAddress
  async updateEntity(entity) {
    return KapiCrud.update('pcpStreetAddress', entity);

    // Sample HTTP PATCH request.
    // return this.patch(pcpStreetAddress, entity);
  }

  // Auto complete for PcpStreetAddress
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('pcpStreetAddress');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.pcpStreetAddress }));
  }
}
