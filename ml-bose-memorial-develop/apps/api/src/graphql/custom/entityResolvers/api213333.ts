import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiHcapScore extends RESTDataSource {
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

  // Add HcapScore
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('hcapScore', entity);

    // Sample HTTP POST request.
    // return this.post('hcapScore', entity);
  }

  // Delete HcapScore
  async deleteEntity(id: string) {
    return KapiCrud.delete('hcapScore', id);

    // Sample HTTP DELETE request.
    // return this.delete(`hcapScore/${id}`);
  }

  // List HcapScore
  async listEntity(params: any) {
    return KapiCrud.list('hcapScore', params);

    // Sample HTTP GET request.
    // return this.get('hcapScore', params);
  }

  // Get HcapScore
  async getEntity(id: string) {
    return KapiCrud.get('hcapScore', id);

    // Sample HTTP GET request.
    // return this.get(`hcapScore/${id}`);
  }

  // Update HcapScore
  async updateEntity(entity) {
    return KapiCrud.update('hcapScore', entity);

    // Sample HTTP PATCH request.
    // return this.patch(hcapScore, entity);
  }

  // Auto complete for HcapScore
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('hcapScore');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.hcapScore }));
  }
}
