import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMembersTransactions extends RESTDataSource {
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

  // Add MembersTransactions
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('membersTransactions', entity);

    // Sample HTTP POST request.
    // return this.post('membersTransactions', entity);
  }

  // Delete MembersTransactions
  async deleteEntity(id: string) {
    return KapiCrud.delete('membersTransactions', id);

    // Sample HTTP DELETE request.
    // return this.delete(`membersTransactions/${id}`);
  }

  // List MembersTransactions
  async listEntity(params: any) {
    return KapiCrud.list('membersTransactions', params);

    // Sample HTTP GET request.
    // return this.get('membersTransactions', params);
  }

  // Get MembersTransactions
  async getEntity(id: string) {
    return KapiCrud.get('membersTransactions', id);

    // Sample HTTP GET request.
    // return this.get(`membersTransactions/${id}`);
  }

  // Update MembersTransactions
  async updateEntity(entity) {
    return KapiCrud.update('membersTransactions', entity);

    // Sample HTTP PATCH request.
    // return this.patch(membersTransactions, entity);
  }

  // Auto complete for MembersTransactions
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('membersTransactions');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.membersTransactions }));
  }
}
