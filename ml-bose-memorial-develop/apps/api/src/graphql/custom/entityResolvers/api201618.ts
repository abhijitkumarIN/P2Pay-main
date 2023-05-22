import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiPreferredMember extends RESTDataSource {
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

  // Add PreferredMember
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('preferredMember', entity);

    // Sample HTTP POST request.
    // return this.post('preferredMember', entity);
  }

  // Delete PreferredMember
  async deleteEntity(id: string) {
    return KapiCrud.delete('preferredMember', id);

    // Sample HTTP DELETE request.
    // return this.delete(`preferredMember/${id}`);
  }

  // List PreferredMember
  async listEntity(params: any) {
    return KapiCrud.list('preferredMember', params);

    // Sample HTTP GET request.
    // return this.get('preferredMember', params);
  }

  // Get PreferredMember
  async getEntity(id: string) {
    return KapiCrud.get('preferredMember', id);

    // Sample HTTP GET request.
    // return this.get(`preferredMember/${id}`);
  }

  // Update PreferredMember
  async updateEntity(entity) {
    return KapiCrud.update('preferredMember', entity);

    // Sample HTTP PATCH request.
    // return this.patch(preferredMember, entity);
  }

  // Auto complete for PreferredMember
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('preferredMember');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.preferredMember }));
  }

  // Dial Phone action for PreferredMember
  async customAction_dialPhone(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }

  // Send Invoice Copy action for PreferredMember
  async customAction_sendInvoiceCopy(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }
}
