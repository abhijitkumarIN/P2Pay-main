import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMemberAmountPaid extends RESTDataSource {
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

  // Add MemberAmountPaid
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('memberAmountPaid', entity);

    // Sample HTTP POST request.
    // return this.post('memberAmountPaid', entity);
  }

  // Delete MemberAmountPaid
  async deleteEntity(id: string) {
    return KapiCrud.delete('memberAmountPaid', id);

    // Sample HTTP DELETE request.
    // return this.delete(`memberAmountPaid/${id}`);
  }

  // List MemberAmountPaid
  async listEntity(params: any) {
    return KapiCrud.list('memberAmountPaid', params);

    // Sample HTTP GET request.
    // return this.get('memberAmountPaid', params);
  }

  // Get MemberAmountPaid
  async getEntity(id: string) {
    return KapiCrud.get('memberAmountPaid', id);

    // Sample HTTP GET request.
    // return this.get(`memberAmountPaid/${id}`);
  }

  // Update MemberAmountPaid
  async updateEntity(entity) {
    return KapiCrud.update('memberAmountPaid', entity);

    // Sample HTTP PATCH request.
    // return this.patch(memberAmountPaid, entity);
  }

  // Auto complete for MemberAmountPaid
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('memberAmountPaid');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.memberAmountPaid }));
  }
}
