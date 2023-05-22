import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiPcpzipCode extends RESTDataSource {
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

  // Add PcpzipCode
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('pcpzipCode', entity);

    // Sample HTTP POST request.
    // return this.post('pcpzipCode', entity);
  }

  // Delete PcpzipCode
  async deleteEntity(id: string) {
    return KapiCrud.delete('pcpzipCode', id);

    // Sample HTTP DELETE request.
    // return this.delete(`pcpzipCode/${id}`);
  }

  // List PcpzipCode
  async listEntity(params: any) {
    return KapiCrud.list('pcpzipCode', params);

    // Sample HTTP GET request.
    // return this.get('pcpzipCode', params);
  }

  // Get PcpzipCode
  async getEntity(id: string) {
    return KapiCrud.get('pcpzipCode', id);

    // Sample HTTP GET request.
    // return this.get(`pcpzipCode/${id}`);
  }

  // Update PcpzipCode
  async updateEntity(entity) {
    return KapiCrud.update('pcpzipCode', entity);

    // Sample HTTP PATCH request.
    // return this.patch(pcpzipCode, entity);
  }

  // Auto complete for PcpzipCode
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('pcpzipCode');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.pcpzipCode }));
  }
}
