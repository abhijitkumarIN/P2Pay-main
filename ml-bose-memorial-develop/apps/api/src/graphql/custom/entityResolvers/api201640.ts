import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTransactionPcp extends RESTDataSource {
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

  // Add TransactionPcp
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('transactionPcp', entity);

    // Sample HTTP POST request.
    // return this.post('transactionPcp', entity);
  }

  // Delete TransactionPcp
  async deleteEntity(id: string) {
    return KapiCrud.delete('transactionPcp', id);

    // Sample HTTP DELETE request.
    // return this.delete(`transactionPcp/${id}`);
  }

  // List TransactionPcp
  async listEntity(params: any) {
    return KapiCrud.list('transactionPcp', params);

    // Sample HTTP GET request.
    // return this.get('transactionPcp', params);
  }

  // Get TransactionPcp
  async getEntity(id: string) {
    return KapiCrud.get('transactionPcp', id);

    // Sample HTTP GET request.
    // return this.get(`transactionPcp/${id}`);
  }

  // Update TransactionPcp
  async updateEntity(entity) {
    return KapiCrud.update('transactionPcp', entity);

    // Sample HTTP PATCH request.
    // return this.patch(transactionPcp, entity);
  }

  // Auto complete for TransactionPcp
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('transactionPcp');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.transactionPcp }));
  }
}
