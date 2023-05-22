import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiPaidMembers extends RESTDataSource {
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

  // Add PaidMembers
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('paidMembers', entity);

    // Sample HTTP POST request.
    // return this.post('paidMembers', entity);
  }

  // Delete PaidMembers
  async deleteEntity(id: string) {
    return KapiCrud.delete('paidMembers', id);

    // Sample HTTP DELETE request.
    // return this.delete(`paidMembers/${id}`);
  }

  // List PaidMembers
  async listEntity(params: any) {
    return KapiCrud.list('paidMembers', params);

    // Sample HTTP GET request.
    // return this.get('paidMembers', params);
  }

  // Get PaidMembers
  async getEntity(id: string) {
    return KapiCrud.get('paidMembers', id);

    // Sample HTTP GET request.
    // return this.get(`paidMembers/${id}`);
  }

  // Update PaidMembers
  async updateEntity(entity) {
    return KapiCrud.update('paidMembers', entity);

    // Sample HTTP PATCH request.
    // return this.patch(paidMembers, entity);
  }

  // Auto complete for PaidMembers
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('paidMembers');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.paidMembers }));
  }

  // Dial Phone action for PaidMembers
  async customAction_dialPhone(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }

  // Send Invoice Copy action for PaidMembers
  async customAction_sendInvoiceCopy(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }
}
