import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTransactionDate extends RESTDataSource {
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

  // Add TransactionDate
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('transactionDate', entity);

    // Sample HTTP POST request.
    // return this.post('transactionDate', entity);
  }

  // Delete TransactionDate
  async deleteEntity(id: string) {
    return KapiCrud.delete('transactionDate', id);

    // Sample HTTP DELETE request.
    // return this.delete(`transactionDate/${id}`);
  }

  // List TransactionDate
  async listEntity(params: any) {
    return KapiCrud.list('transactionDate', params);

    // Sample HTTP GET request.
    // return this.get('transactionDate', params);
  }

  // Get TransactionDate
  async getEntity(id: string) {
    return KapiCrud.get('transactionDate', id);

    // Sample HTTP GET request.
    // return this.get(`transactionDate/${id}`);
  }

  // Update TransactionDate
  async updateEntity(entity) {
    return KapiCrud.update('transactionDate', entity);

    // Sample HTTP PATCH request.
    // return this.patch(transactionDate, entity);
  }

  // Auto complete for TransactionDate
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('transactionDate');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.transactionDate }));
  }
}
