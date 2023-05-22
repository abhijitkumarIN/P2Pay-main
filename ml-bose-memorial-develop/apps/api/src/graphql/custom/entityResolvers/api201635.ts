import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTransactionMember extends RESTDataSource {
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

  // Add TransactionMember
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('transactionMember', entity);

    // Sample HTTP POST request.
    // return this.post('transactionMember', entity);
  }

  // Delete TransactionMember
  async deleteEntity(id: string) {
    return KapiCrud.delete('transactionMember', id);

    // Sample HTTP DELETE request.
    // return this.delete(`transactionMember/${id}`);
  }

  // List TransactionMember
  async listEntity(params: any) {
    return KapiCrud.list('transactionMember', params);

    // Sample HTTP GET request.
    // return this.get('transactionMember', params);
  }

  // Get TransactionMember
  async getEntity(id: string) {
    return KapiCrud.get('transactionMember', id);

    // Sample HTTP GET request.
    // return this.get(`transactionMember/${id}`);
  }

  // Update TransactionMember
  async updateEntity(entity) {
    return KapiCrud.update('transactionMember', entity);

    // Sample HTTP PATCH request.
    // return this.patch(transactionMember, entity);
  }

  // Auto complete for TransactionMember
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('transactionMember');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.transactionMember }));
  }

  // Dial Phone action for TransactionMember
  async customAction_dialPhone(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }

  // Send Invoice Copy action for TransactionMember
  async customAction_sendInvoiceCopy(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }
}
