import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMembersPcp extends RESTDataSource {
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

  // Add MembersPcp
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('membersPcp', entity);

    // Sample HTTP POST request.
    // return this.post('membersPcp', entity);
  }

  // Delete MembersPcp
  async deleteEntity(id: string) {
    return KapiCrud.delete('membersPcp', id);

    // Sample HTTP DELETE request.
    // return this.delete(`membersPcp/${id}`);
  }

  // List MembersPcp
  async listEntity(params: any) {
    return KapiCrud.list('membersPcp', params);

    // Sample HTTP GET request.
    // return this.get('membersPcp', params);
  }

  // Get MembersPcp
  async getEntity(id: string) {
    return KapiCrud.get('membersPcp', id);

    // Sample HTTP GET request.
    // return this.get(`membersPcp/${id}`);
  }

  // Update MembersPcp
  async updateEntity(entity) {
    return KapiCrud.update('membersPcp', entity);

    // Sample HTTP PATCH request.
    // return this.patch(membersPcp, entity);
  }

  // Auto complete for MembersPcp
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('membersPcp');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.membersPcp }));
  }
}
