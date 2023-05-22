import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMemberPaidAmount extends RESTDataSource {
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

  // Add MemberPaidAmount
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('memberPaidAmount', entity);

    // Sample HTTP POST request.
    // return this.post('memberPaidAmount', entity);
  }

  // Delete MemberPaidAmount
  async deleteEntity(id: string) {
    return KapiCrud.delete('memberPaidAmount', id);

    // Sample HTTP DELETE request.
    // return this.delete(`memberPaidAmount/${id}`);
  }

  // List MemberPaidAmount
  async listEntity(params: any) {
    return KapiCrud.list('memberPaidAmount', params);

    // Sample HTTP GET request.
    // return this.get('memberPaidAmount', params);
  }

  // Get MemberPaidAmount
  async getEntity(id: string) {
    return KapiCrud.get('memberPaidAmount', id);

    // Sample HTTP GET request.
    // return this.get(`memberPaidAmount/${id}`);
  }

  // Update MemberPaidAmount
  async updateEntity(entity) {
    return KapiCrud.update('memberPaidAmount', entity);

    // Sample HTTP PATCH request.
    // return this.patch(memberPaidAmount, entity);
  }

  // Auto complete for MemberPaidAmount
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('memberPaidAmount');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.memberPaidAmount }));
  }
}
