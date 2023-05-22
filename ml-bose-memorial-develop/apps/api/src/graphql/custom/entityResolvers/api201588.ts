import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMemberId extends RESTDataSource {
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

  // Add MemberId
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('memberId', entity);

    // Sample HTTP POST request.
    // return this.post('memberId', entity);
  }

  // Delete MemberId
  async deleteEntity(id: string) {
    return KapiCrud.delete('memberId', id);

    // Sample HTTP DELETE request.
    // return this.delete(`memberId/${id}`);
  }

  // List MemberId
  async listEntity(params: any) {
    return KapiCrud.list('memberId', params);

    // Sample HTTP GET request.
    // return this.get('memberId', params);
  }

  // Get MemberId
  async getEntity(id: string) {
    return KapiCrud.get('memberId', id);

    // Sample HTTP GET request.
    // return this.get(`memberId/${id}`);
  }

  // Update MemberId
  async updateEntity(entity) {
    return KapiCrud.update('memberId', entity);

    // Sample HTTP PATCH request.
    // return this.patch(memberId, entity);
  }

  // Auto complete for MemberId
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('memberId');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.memberId }));
  }
}
