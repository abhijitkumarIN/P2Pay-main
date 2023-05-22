import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTransactionAmount extends RESTDataSource {
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

  // Add TransactionAmount
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('transactionAmount', entity);

    // Sample HTTP POST request.
    // return this.post('transactionAmount', entity);
  }

  // Delete TransactionAmount
  async deleteEntity(id: string) {
    return KapiCrud.delete('transactionAmount', id);

    // Sample HTTP DELETE request.
    // return this.delete(`transactionAmount/${id}`);
  }

  // List TransactionAmount
  async listEntity(params: any) {
    return KapiCrud.list('transactionAmount', params);

    // Sample HTTP GET request.
    // return this.get('transactionAmount', params);
  }

  // Get TransactionAmount
  async getEntity(id: string) {
    return KapiCrud.get('transactionAmount', id);

    // Sample HTTP GET request.
    // return this.get(`transactionAmount/${id}`);
  }

  // Update TransactionAmount
  async updateEntity(entity) {
    return KapiCrud.update('transactionAmount', entity);

    // Sample HTTP PATCH request.
    // return this.patch(transactionAmount, entity);
  }

  // Auto complete for TransactionAmount
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('transactionAmount');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.transactionAmount }));
  }
}
