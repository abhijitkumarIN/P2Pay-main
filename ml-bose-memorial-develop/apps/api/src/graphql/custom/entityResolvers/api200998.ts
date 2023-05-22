import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiMemberName extends RESTDataSource {
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

  // Add MemberName
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('memberName', entity);

    // Sample HTTP POST request.
    // return this.post('memberName', entity);
  }

  // Delete MemberName
  async deleteEntity(id: string) {
    return KapiCrud.delete('memberName', id);

    // Sample HTTP DELETE request.
    // return this.delete(`memberName/${id}`);
  }

  // List MemberName
  async listEntity(params: any) {
    return KapiCrud.list('memberName', params);

    // Sample HTTP GET request.
    // return this.get('memberName', params);
  }

  // Get MemberName
  async getEntity(id: string) {
    return KapiCrud.get('memberName', id);

    // Sample HTTP GET request.
    // return this.get(`memberName/${id}`);
  }

  // Update MemberName
  async updateEntity(entity) {
    return KapiCrud.update('memberName', entity);

    // Sample HTTP PATCH request.
    // return this.patch(memberName, entity);
  }

  // Auto complete for MemberName
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('memberName');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.memberName }));
  }

  // Dial Phone action for MemberName
  async customAction_dialPhone(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }

  // Send Invoice Copy action for MemberName
  async customAction_sendInvoiceCopy(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }
}
