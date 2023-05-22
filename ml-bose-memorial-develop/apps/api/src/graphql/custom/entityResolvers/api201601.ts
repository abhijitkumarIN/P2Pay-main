import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiBasicFee extends RESTDataSource {
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

  // Add BasicFee
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('basicFee', entity);

    // Sample HTTP POST request.
    // return this.post('basicFee', entity);
  }

  // Delete BasicFee
  async deleteEntity(id: string) {
    return KapiCrud.delete('basicFee', id);

    // Sample HTTP DELETE request.
    // return this.delete(`basicFee/${id}`);
  }

  // List BasicFee
  async listEntity(params: any) {
    return KapiCrud.list('basicFee', params);

    // Sample HTTP GET request.
    // return this.get('basicFee', params);
  }

  // Get BasicFee
  async getEntity(id: string) {
    return KapiCrud.get('basicFee', id);

    // Sample HTTP GET request.
    // return this.get(`basicFee/${id}`);
  }

  // Update BasicFee
  async updateEntity(entity) {
    return KapiCrud.update('basicFee', entity);

    // Sample HTTP PATCH request.
    // return this.patch(basicFee, entity);
  }

  // Auto complete for BasicFee
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('basicFee');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.basicFee }));
  }
}
