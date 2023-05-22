import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiPcpMail extends RESTDataSource {
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

  // Add PcpMail
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('pcpMail', entity);

    // Sample HTTP POST request.
    // return this.post('pcpMail', entity);
  }

  // Delete PcpMail
  async deleteEntity(id: string) {
    return KapiCrud.delete('pcpMail', id);

    // Sample HTTP DELETE request.
    // return this.delete(`pcpMail/${id}`);
  }

  // List PcpMail
  async listEntity(params: any) {
    return KapiCrud.list('pcpMail', params);

    // Sample HTTP GET request.
    // return this.get('pcpMail', params);
  }

  // Get PcpMail
  async getEntity(id: string) {
    return KapiCrud.get('pcpMail', id);

    // Sample HTTP GET request.
    // return this.get(`pcpMail/${id}`);
  }

  // Update PcpMail
  async updateEntity(entity) {
    return KapiCrud.update('pcpMail', entity);

    // Sample HTTP PATCH request.
    // return this.patch(pcpMail, entity);
  }

  // Auto complete for PcpMail
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('pcpMail');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.pcpMail }));
  }
}
